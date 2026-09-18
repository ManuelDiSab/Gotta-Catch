// useTranslation.ts
import { useLocale } from './LocaleContext'
import { it } from './dictionaries/it'
import { en } from './dictionaries/en'

const dictionaries = { it, en }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPath(obj: any, path: string) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function useTranslation() {
    const { locale } = useLocale()
    const dict = dictionaries[locale]
    const t = (key: string, params?: Record<string, string | number>) => {
        const raw = getPath(dict, key) ?? key
        if (typeof raw !== 'string' || !params) return raw
        return Object.entries(params).reduce(
            (acc, [paramKey, paramValue]) => acc.replaceAll(`{${paramKey}}`, String(paramValue)),
            raw
        )
    }
    return { t, locale }
}