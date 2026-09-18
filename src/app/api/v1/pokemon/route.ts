// src/app/api/v1/pokemon/route.ts
import { NextResponse } from 'next/server'
import { getAllPokemon, PokemonListFilters } from '@/services/pokemonService'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = Object.fromEntries(searchParams.entries())

        const {
            page, name, type, types, ability, generation,
            isLegendary, isMythical, isBaby, sortBy, sortOrder
        } = query

        // Validazione della pagina
        const parsedPage = page ? Number(page) : 1
        if (!Number.isInteger(parsedPage) || parsedPage < 1) {
            return NextResponse.json({ status: "fail", message: "Il parametro page deve essere un intero positivo" }, { status: 400 })
        }

        const parsedSortBy = typeof sortBy === "string" ? sortBy : "id"
        const parsedSortOrder = typeof sortOrder === "string" ? sortOrder : "asc"

        if (!["order", "name"].includes(parsedSortBy) || !["asc", "desc"].includes(parsedSortOrder)) {
            return NextResponse.json({ status: "fail", message: "sortBy deve essere order o name e sortOrder asc/desc" }, { status: 400 })
        }

        const parseBoolean = (val: string) => val === 'true' ? true : val === 'false' ? false : undefined

        // Creo l'oggetto filters pulito
        const filters: PokemonListFilters = {
            page: parsedPage,
            name: typeof name === "string" ? name : undefined,
            type: typeof type === "string" ? type : undefined,
            types: Array.isArray(types) ? types : typeof types === "string" ? [types] : undefined,
            ability: typeof ability === "string" ? ability : undefined,
            generation: Array.isArray(generation) ? generation : typeof generation === "string" ? [generation] : undefined,
            isLegendary: parseBoolean(isLegendary),
            isMythical: parseBoolean(isMythical),
            isBaby: parseBoolean(isBaby),
            sortBy: parsedSortBy as "id" | "name",
            sortOrder: parsedSortOrder as "asc" | "desc",
        }

        const result = await getAllPokemon(filters)

        return NextResponse.json({
            status: "success",
            ...result
        }, { status: 200 })

    } catch (error: unknown) {
        if (error instanceof Error)
            return NextResponse.json({ status: "error", message: error.message }, { status: 500 })
    }
}