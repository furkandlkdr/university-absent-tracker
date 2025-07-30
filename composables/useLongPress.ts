import { ref } from 'vue'

export const useLongPress = (
  callback: Function,
  ms: number = 600
) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  const isLongPressing = ref(false)

  // Handle start of press
  const start = (event: Event) => {
    // Clear any existing timer
    if (timer) {
      clearTimeout(timer)
    }
    
    // Set a new timer
    isLongPressing.value = false
    timer = setTimeout(() => {
      isLongPressing.value = true
      callback(event)
    }, ms)
  }

  // Handle end of press
  const end = () => {
    // Clear timer if press ends before timeout
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isLongPressing.value = false
  }
  
  // Cancel if user moves too much
  const cancel = () => {
    end()
  }

  return {
    isLongPressing,
    onLongPressStart: start,
    onLongPressEnd: end,
    onLongPressCancel: cancel
  }
}
