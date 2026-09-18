// Helper per tradurre alcuni campi (genera, falvourText)
export function pickLocalizedText(
    entries: Array<{ language: string; text: string }>,
    locale: 'it' | 'en'
) {
    return entries.find(e => e.language === locale)?.text
        ?? entries.find(e => e.language === 'en')?.text
        ?? ''
}