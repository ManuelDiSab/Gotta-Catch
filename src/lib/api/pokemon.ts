import { IPokemon } from "../../../src/interfaces/IPokemon.interface";
import { apiClient } from "../apiClient";
// Interfaccia di esempio per un Pokémon


// src/lib/api/pokemon.ts
export async function getPokemonList(params: Record<string, string>) {
    // Converto l'oggetto dei parametri in una query string pulita (es. ?page=1&type=fire)
    const queryString = new URLSearchParams(params).toString()

    // Chiamata alla tua nuova API Route interna di Next.js
    const res = await fetch(`/api/v1/pokemon?${queryString}`)

    const data = await res.json()

    if (!res.ok || data.status !== 'success') {
        throw new Error(data.message || 'Errore nel recupero dei Pokémon')
    }

    // Restituisce la struttura che il tuo componente si aspetta
    return {
        data: data.data,
        totalPages: data.totalPages,
        totalResults: data.totalResults
    }
}

export async function getPokemonDetail(name: string) {
    const res = await fetch(`/api/v1/pokemon/${name}`)
    const data = await res.json()
    if (!res.ok || data.status !== 'success') {
        throw new Error(data.message || 'Errore nel recupero del Pokémon')
    }
    return {
        data: data.data
    }
}

export async function getRandomPokemon() {
    const res = await fetch('/api/v1/pokemon/random')
    const data = await res.json()
    if (!res.ok || data.status !== 'success') {
        throw new Error(data.message || 'Errore nel recupero del Pokémon')
    }
    return {
        data: data.data
    }
}


