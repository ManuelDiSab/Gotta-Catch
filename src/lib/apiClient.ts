// 1. Definiamo l'interfaccia dell'ApiResponse
export interface ApiResponse<T> {
    data: T
    status: string | number
    message?: string
    [key: string]: unknown
}

/**
 * Helper centralizzato per effettuare richieste HTTP al backend.
 * @template T - Il tipo di dati contenuto dentro "data"
 * @param endpoint - L'endpoint da chiamare (es. "pokemon" oppure "pokemon/25").
 * @param options - Opzioni aggiuntive per la fetch (headers, body, method, ecc.).
 */
export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    // Preparo gli headers per la richiesta
    const headers = new Headers(options.headers)

    // In caso inviassi un body e non è specificato il content-type lo metto in application/json
    if (!headers.has('Content-Type') && options.body) {
        headers.set('Content-Type', 'application/json')
    }

    // Chiamata HTTP
    const response = await fetch(`${apiUrl}/${endpoint}`, {
        ...options,
        headers,
        credentials: 'include' // Fondamentale se il backend utilizza cookie di sessione/autenticazione
    })

    // Gestione specifica dell'errore 401 (Utente non autenticato o sessione scaduta)
    if (response.status === 401) {
        await fetch('/api/auth/session', { method: 'DELETE' })

        if (typeof window !== 'undefined') {
            window.open('/login', '_self')
        }
        throw new Error('Sessione scaduta')
    }

    // Gestione degli altri errori HTTP
    if (!response.ok) {
        let message = `Errore API: ${response.status}`
        try {
            const body = (await response.json()) as { message?: string }
            if (body.message) message = body.message
        } catch {
            // Se la risposta non è in formato JSON, ignora il blocco
        }
        throw new Error(message)
    }

    // Converto la risposta in Json e la restituisco tipizzata come ApiResponse<T>
    return response.json() as Promise<ApiResponse<T>>
}