import { useLocale } from '../lib/i18n/LocaleContext'

export default function LanguageToggle () {
  const { locale, setLocale } = useLocale()
  return (
    <button
      className='cursor-pointer'
      type='button'
      onClick={() => setLocale(locale === 'it' ? 'en' : 'it')}
      aria-label='Cambia lingua'
    >
      {locale.toUpperCase()}
    </button>
  )
}
