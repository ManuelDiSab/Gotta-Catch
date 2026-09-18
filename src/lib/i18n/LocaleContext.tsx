// frontend/src/lib/i18n/LocaleContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type Locale = 'it' | 'en'
type LocaleContextValue = { locale: Locale; setLocale: (l: Locale) => void }

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider ({
  children,
  initialLocale
}: {
  children: ReactNode
  initialLocale: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
    document.cookie = `locale=${l}; path=/; max-age=31536000`
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale () {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale deve essere usato dentro LocaleProvider')
  return ctx
}
