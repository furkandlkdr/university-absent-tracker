import en from '~/i18n/locales/en.json'
import tr from '~/i18n/locales/tr.json'

export type Locale = 'en' | 'tr'
export type Translations = typeof en

const STORAGE_KEY = 'univtrack-locale'

const dictionaries: Record<Locale, Translations> = {
  en,
  tr,
}

/**
 * Detect the user's preferred language.
 * Order of precedence:
 *  1. localStorage value (user-set preference)
 *  2. navigator.language (browser language)
 *  3. Default: 'en'
 *
 * If the browser language is Turkish (any tr-* variant), returns 'tr'.
 * Otherwise returns 'en'.
 */
export const detectLocale = (): Locale => {
  if (process.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
      if (stored === 'en' || stored === 'tr') {
        return stored
      }
    } catch {
      // localStorage may be unavailable (e.g. private mode)
    }

    const browserLang =
      (typeof navigator !== 'undefined' && (navigator.language || (navigator as any).userLanguage)) ||
      ''

    if (browserLang.toLowerCase().startsWith('tr')) {
      return 'tr'
    }
  }

  return 'en'
}

/**
 * Flatten a nested object into a list of dot-paths.
 * e.g. { a: { b: 'x' } } -> ['a.b']
 */
const flattenKeys = (obj: any, prefix = ''): string[] => {
  const keys: string[] = []
  for (const key in obj) {
    const value = obj[key]
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, path))
    } else {
      keys.push(path)
    }
  }
  return keys
}

/**
 * Resolve a dot-path key against a translations dictionary.
 * Returns the key itself if not found, so missing translations are
 * still readable during development.
 */
const resolveKey = (dict: Translations, key: string): any => {
  const parts = key.split('.')
  let current: any = dict
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part]
    } else {
      return undefined
    }
  }
  return current
}

/**
 * Interpolate {placeholder} tokens inside a string.
 * e.g. "Hello {name}" with { name: "Furkan" } -> "Hello Furkan"
 */
const interpolate = (template: string, params?: Record<string, string | number>): string => {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return key in params ? String(params[key]) : `{${key}}`
  })
}

export const useI18n = () => {
  // useState gives us a SSR-safe shared state across the app.
  // IMPORTANT: the initial value MUST be the same on the server and on the
  // first client render, otherwise Vue will throw a hydration mismatch.
  // We default to 'en' and only switch to the detected locale AFTER mount
  // (see the onMounted hook below).
  const locale = useState<Locale>('univtrack-locale', () => 'en')

  // After hydration, run client-only detection exactly once. Doing this
  // inside onMounted (instead of inline at composable-call time) guarantees
  // the very first client render matches the server-rendered HTML, and the
  // language switch is applied on the next reactive tick.
  if (process.client) {
    onMounted(() => {
      if (locale.value === 'en' && locale.value !== detectLocale()) {
        const detected = detectLocale()
        if (detected !== locale.value) {
          locale.value = detected
          try {
            document.documentElement.setAttribute('lang', detected)
          } catch {
            /* no-op */
          }
        }
      }
    })
  }

  const setLocale = (newLocale: Locale) => {
    if (newLocale !== 'en' && newLocale !== 'tr') return
    locale.value = newLocale
    if (process.client) {
      try {
        localStorage.setItem(STORAGE_KEY, newLocale)
        // Reflect the change in <html lang="..."> for accessibility & SEO.
        document.documentElement.setAttribute('lang', newLocale)
      } catch {
        // localStorage may be unavailable
      }
    }
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = dictionaries[locale.value] || dictionaries.en
    const value = resolveKey(dict, key)

    if (value === undefined) {
      // Fallback: return the key itself in development for visibility
      if (process.dev) {
        console.warn(`[i18n] Missing translation for key: "${key}" in locale "${locale.value}"`)
      }
      return key
    }

    if (typeof value === 'string') {
      return interpolate(value, params)
    }

    return String(value)
  }

  /**
   * Pluralization helper for countable nouns.
   * Use a translation value that contains " | " separators to provide
   * singular | plural forms. e.g. "1 course | 2 courses"
   */
  const tc = (key: string, count: number, params?: Record<string, string | number>): string => {
    const dict = dictionaries[locale.value] || dictionaries.en
    const value = resolveKey(dict, key)
    if (typeof value !== 'string') {
      return String(value ?? key)
    }
    const parts = value.split('|').map(p => p.trim())
    const form = count === 1 ? parts[0] : parts[parts.length - 1]
    return interpolate(form, { ...(params || {}), count })
  }

  /**
   * Return the localized label for a canonical attendance status key.
   * e.g. statusLabel('attended') -> "Attended" | "Gittim"
   */
  const statusLabel = (key: AttendanceStatus): string => {
    return t(`term.status.${key}`)
  }

  return {
    locale,
    setLocale,
    t,
    tc,
    statusLabel,
    availableLocales: Object.keys(dictionaries) as Locale[],
    isReady: ref(true),
  }
}

/**
 * Helper for the language switcher.
 * Returns the human-readable label for a given locale.
 */
export const localeLabel = (loc: Locale): string => {
  return loc === 'tr' ? 'Türkçe' : 'English'
}

/**
 * Helper to expose all flatten keys (useful for debugging missing translations).
 */
export const listAllKeys = (): string[] => {
  return flattenKeys(dictionaries.en)
}

/* ============================================================================
 *  Canonical attendance status enum
 * ----------------------------------------------------------------------------
 *  The status that lives in Firestore, in the UI state, and in comparisons
 *  MUST be one of these locale-agnostic keys. Display labels are obtained
 *  via the `t('term.status.<key>')` translation. This decouples persistence
 *  from i18n, so changing the active locale never breaks an existing record.
 * ========================================================================== */
export type AttendanceStatus = 'attended' | 'absent' | 'holiday'

export const ATTENDANCE_STATUSES: AttendanceStatus[] = ['attended', 'absent', 'holiday']

/**
 * Legacy Turkish status strings that may still exist in older Firestore
 * records. The canonical key is what we use going forward; this map lets
 * us transparently read old data.
 */
const LEGACY_STATUS_MAP: Record<string, AttendanceStatus> = {
  'Gittim': 'attended',
  'Gitmedim': 'absent',
  'Tatil / Ders Yok': 'holiday',
  'Tatil': 'holiday',
  // English fallbacks (in case a record was already written in EN)
  'Attended': 'attended',
  'Absent': 'absent',
  'Holiday / No Class': 'holiday',
  'Holiday': 'holiday',
}

/**
 * Normalize any status string (legacy or canonical) to the canonical key.
 * Unknown values are returned as-is so the UI can still render them.
 */
export const toCanonicalStatus = (raw: string | null | undefined): AttendanceStatus | string => {
  if (!raw) return ''
  return LEGACY_STATUS_MAP[raw] ?? raw
}
