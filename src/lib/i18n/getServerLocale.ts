import { cookies } from 'next/headers'
import { it } from './dictionaries/it'
import { en } from './dictionaries/en'

const dictionaries = { it, en }
type Locale = 'it' | 'en'

// Legge la lingua salvata nel cookie per usarla nelle Server Component
export async function getServerLocale(): Promise<Locale> {
    const saved = (await cookies()).get('locale')?.value
    return saved === 'en' ? 'en' : 'it'
}

export function getDictionary(locale: Locale) {
    return dictionaries[locale]
}
