import { 
  collection, doc, addDoc, updateDoc, deleteDoc, 
  getDocs, getDoc, query, where, orderBy, Timestamp,
  type Firestore
} from 'firebase/firestore'
import { format, addWeeks, parseISO, differenceInWeeks, isBefore } from 'date-fns'

// Define interfaces for our data types
interface Course {
  name: string;
  dayOfWeek: number; // 0-4 for Monday-Friday
  timeSlot: string; // Dinamik slot adlarını kabul etmek için string olarak değiştirildi
}

export interface Term {
  id?: string;
  userId: string;
  name: string;
  startDate: string; // ISO format date string
  isReadOnly: boolean;
  weekCount: number; // Kullanıcının belirlediği toplam dönem uzunluğu (hafta)
  schedule: Course[];
}

export interface AttendanceRecord {
  id?: string;
  termId: string;
  userId: string;
  courseName: string;
  date: string; // ISO format date string
  status: 'Gittim' | 'Gitmedim' | 'Tatil / Ders Yok';
  weekNumber: number;
}

export const useDatabase = () => {
  // Sadece istemci tarafında çalıştığımızdan emin olalım
  if (process.server) {
    return {
      getTerms: async () => [] as Term[],
      getTerm: async () => null as Term | null,
      addTerm: async () => ({ success: false, id: null, error: 'Server-side rendering' }),
      updateTerm: async () => ({ success: false, error: 'Server-side rendering' }),
      deleteTerm: async () => ({ success: false, error: 'Server-side rendering' }),
      getAttendanceRecords: async () => [] as AttendanceRecord[],
      updateAttendanceStatus: async () => ({ success: false, error: 'Server-side rendering' }),
      getTermStatistics: () => [],
      generateTermCalendar: () => []
    }
  }

  // İstemci tarafı kodu
  const { $firebase } = useNuxtApp()
  const db = $firebase?.firestore as Firestore
  const { user } = useAuth()
  
  // Helper function to safely get user ID
  const getUserId = (): string | null => {
    if (!user.value) return null;
    return user.value.uid;
  }
  
  // Check if Firestore is available
  if (!db) {
    console.error('Firestore is not initialized')
    return {
      getTerms: async () => [] as Term[],
      getTerm: async () => null as Term | null,
      addTerm: async () => ({ success: false, id: null, error: 'Firestore not initialized' }),
      updateTerm: async () => ({ success: false, error: 'Firestore not initialized' }),
      deleteTerm: async () => ({ success: false, error: 'Firestore not initialized' }),
      getAttendanceRecords: async () => [] as AttendanceRecord[],
      updateAttendanceStatus: async () => ({ success: false, error: 'Firestore not initialized' }),
      getTermStatistics: () => [],
      generateTermCalendar: () => []
    }
  }

  // Terms Collection
  const termsRef = collection(db, 'terms')
  
  // Get all terms for current user
  const getTerms = async (retryCount = 0, maxRetries = 3) => {
    const userId = getUserId();
    if (!userId) {
      console.log('No user is logged in')
      return []
    }
    
    try {
      console.log('Fetching terms for user ID:', userId)
      const q = query(
        termsRef,
        where('userId', '==', userId),
        orderBy('startDate', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      console.log(`Found ${querySnapshot.docs.length} terms`)
      return querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as Term
      })
    } catch (error) {
      console.error('Error getting terms:', error)
      
      // Check if we should retry
      if (retryCount < maxRetries) {
        console.log(`Retrying getTerms (attempt ${retryCount + 1} of ${maxRetries})...`)
        // Wait for a short time before retrying
        await new Promise(resolve => setTimeout(resolve, 1000))
        return getTerms(retryCount + 1, maxRetries)
      }
      
      return []
    }
  }
  
  // Get a specific term by ID
  const getTerm = async (termId: string) => {
    try {
      const termDoc = await getDoc(doc(db, 'terms', termId))
      if (termDoc.exists()) {
        return { id: termDoc.id, ...termDoc.data() } as Term
      }
      return null
    } catch (error) {
      console.error('Error getting term:', error)
      return null
    }
  }
  
  // Add a new term
  const addTerm = async (term: Omit<Term, 'id' | 'userId' | 'isReadOnly'>) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: 'User not authenticated' }
    
    try {
      const startDate = parseISO(term.startDate)
      const currentDate = new Date()
      const weekCount = term.weekCount || 14 // Varsayılan olarak 14 hafta, yoksa kullanıcının seçtiği değeri kullan
      const endDate = addWeeks(startDate, weekCount)
      
      // Check if term is read-only (total weeks completed)
      const isReadOnly = isBefore(endDate, currentDate)
      
      const newTerm = {
        ...term,
        userId,
        isReadOnly,
        weekCount: weekCount, // Haftayı ekleyelim
      }
      
      const docRef = await addDoc(termsRef, newTerm)
      return { success: true, id: docRef.id, error: null }
    } catch (error: any) {
      return { success: false, id: null, error: error.message }
    }
  }
  
  // Update an existing term
  const updateTerm = async (termId: string, updates: Partial<Term>) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: 'User not authenticated' }
    
    try {
      // Check if the term is read-only
      const termData = await getTerm(termId)
      if (termData?.isReadOnly) {
        const weekCount = termData.weekCount || 14;
        return { success: false, error: `Bu dönem düzenlenemez (${weekCount} hafta dolmuş)` }
      }
      
      await updateDoc(doc(db, 'terms', termId), updates)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  // Delete a term
  const deleteTerm = async (termId: string) => {
    try {
      await deleteDoc(doc(db, 'terms', termId))
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  // Attendance Records Collection
  const recordsRef = collection(db, 'attendanceRecords')
  
  // Get attendance records for a specific term
  const getAttendanceRecords = async (termId: string, retryCount = 0, maxRetries = 3) => {
    const userId = getUserId();
    if (!userId) return []
    
    try {
      const q = query(
        recordsRef,
        where('userId', '==', userId),
        where('termId', '==', termId),
        orderBy('date', 'asc')
      )
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as AttendanceRecord
      })
    } catch (error) {
      console.error('Error getting attendance records:', error)
      
      // Check if we should retry
      if (retryCount < maxRetries) {
        console.log(`Retrying getAttendanceRecords (attempt ${retryCount + 1} of ${maxRetries})...`)
        // Wait for a short time before retrying
        await new Promise(resolve => setTimeout(resolve, 1000))
        return getAttendanceRecords(termId, retryCount + 1, maxRetries)
      }
      
      return []
    }
  }
  
  // Add or update attendance record
  const updateAttendanceStatus = async (record: Omit<AttendanceRecord, 'id' | 'userId'>) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: 'User not authenticated' }
    
    try {
      // Check if record exists
      const q = query(
        recordsRef,
        where('userId', '==', userId),
        where('termId', '==', record.termId),
        where('courseName', '==', record.courseName),
        where('date', '==', record.date)
      )
      
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        // Update existing record
        const docRef = doc(db, 'attendanceRecords', querySnapshot.docs[0].id)
        await updateDoc(docRef, { status: record.status })
      } else {
        // Add new record
        await addDoc(recordsRef, {
          ...record,
          userId
        })
      }
      
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  // Calculate attendance statistics for a term
  const getTermStatistics = (term: Term, records: AttendanceRecord[]) => {
    const today = new Date()
    const startDate = parseISO(term.startDate)
    const weekCount = term.weekCount || 14 // Varsayılan olarak 14 hafta
    
    // Calculate current week number (max = weekCount)
    let currentWeek = differenceInWeeks(today, startDate) + 1
    if (currentWeek > weekCount) currentWeek = weekCount
    if (currentWeek < 1) currentWeek = 1
    
    // Get unique course names from the schedule
    const courseNames = [...new Set(term.schedule.map(course => course.name))]
    
    // Initialize statistics for each course
    const statistics = courseNames.map(name => {
      // Get all records for this course
      const courseRecords = records.filter(r => r.courseName === name)
      
      // Count absences (Gitmedim)
      const absences = courseRecords.filter(r => r.status === 'Gitmedim').length
      
      // Count available weeks (excluding holidays marked as "Tatil / Ders Yok")
      const holidays = courseRecords.filter(r => r.status === 'Tatil / Ders Yok').length
      const availableWeeks = Math.min(currentWeek, weekCount) - holidays
      
      // Calculate if course is at risk (3 or 4 absences)
      const isAtRisk = absences >= 3
      
      return {
        name,
        absences,
        availableWeeks,
        isAtRisk
      }
    })
    
    return statistics
  }
  
  // Generate a calendar for a term based on its start date, schedule, and week count
  const generateTermCalendar = (term: Term) => {
    const startDate = parseISO(term.startDate)
    const weekCount = term.weekCount || 14 // Varsayılan olarak 14 hafta
    const calendar: { date: string; courseName: string; weekNumber: number; timeSlot: string; isPast: boolean; }[] = []
    
    // Generate weeks of classes based on the term's weekCount
    for (let week = 0; week < weekCount; week++) {
      // Hafta başlangıcını hesapla (haftanın ilk günü)
      const weekStartDate = addWeeks(startDate, week)
      
      // For each day of the week (Monday-Friday)
      for (let day = 0; day < 5; day++) {
        // Haftanın her günü için yeni bir tarih hesapla
        const currentDate = new Date(weekStartDate)
        currentDate.setDate(weekStartDate.getDate() + day)
        
        // Find courses for this day
        const dayCourses = term.schedule.filter(course => course.dayOfWeek === day)
        
        // Create calendar entries for each course on this day
        dayCourses.forEach(course => {
          calendar.push({
            date: format(currentDate, 'yyyy-MM-dd'),
            courseName: course.name,
            weekNumber: week + 1,
            timeSlot: course.timeSlot,
            isPast: isBefore(currentDate, new Date()) || format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
          })
        })
      }
    }
    
    return calendar.sort((a, b) => a.date.localeCompare(b.date))
  }
  
  return {
    getTerms,
    getTerm,
    addTerm,
    updateTerm,
    deleteTerm,
    getAttendanceRecords,
    updateAttendanceStatus,
    getTermStatistics,
    generateTermCalendar
  }
}