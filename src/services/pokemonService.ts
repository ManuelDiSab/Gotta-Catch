// src/services/pokemonService.ts
import connectDB from '@/lib/db'
import Pokemon from '@/models/pokemon.model'

const PAGE_SIZE = 20;

export interface PokemonListFilters {
    page?: number;
    name?: string;
    type?: string;
    types?: string[];
    ability?: string;
    generation?: string[];
    isLegendary?: boolean;
    isMythical?: boolean;
    isBaby?: boolean;
    sortBy?: "id" | "name";
    sortOrder?: "asc" | "desc";
}
export async function getAllPokemon(filters: PokemonListFilters = {}) {
    await connectDB();

    const page = Math.max(1, Math.floor(filters.page || 1));
    const query: Record<string, unknown> = {};

    query.is_default = true; // Salta forme alternative/mega

    if (filters.name?.trim()) {
        query.name = { $regex: filters.name.trim(), $options: "i" };
    }

    const types = (filters.types || (filters.type ? [filters.type] : []))
        .flatMap((type: string) => type.split(","))
        .map((type: string) => type.trim().toLowerCase())
        .filter(Boolean);

    if (types.length > 0) {
        query.types = { $all: [...new Set(types)] };
    }

    if (filters.ability?.trim()) {
        query.abilities = filters.ability.trim().toLowerCase();
    }

    const generations = (filters.generation || [])
        .map((generation: string) => generation.trim().toLowerCase())
        .filter(Boolean);

    if (generations.length > 0) {
        query.generation = { $in: [...new Set(generations)] };
    }

    if (filters.isLegendary !== undefined) {
        query.is_legendary = filters.isLegendary;
    }

    if (filters.isMythical !== undefined) {
        query.is_mythical = filters.isMythical;
    }

    if (filters.isBaby !== undefined) {
        query.is_baby = filters.isBaby;
    }

    const sortField = filters.sortBy === "name" ? "name" : "id";
    const sortDirection = filters.sortOrder === "desc" ? -1 : 1;

    const [data, totalResults] = await Promise.all([
        Pokemon.find(query)
            .select("id name types sprites genera")
            .sort({ [sortField]: sortDirection })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .lean(),
        Pokemon.countDocuments(query),
    ]);

    return {
        page,
        pageSize: PAGE_SIZE,
        totalResults,
        totalPages: Math.ceil(totalResults / PAGE_SIZE),
        data
    };
}

export async function getPokemonDetail(name: string) {
    const numericId = Number(name)

    if (Number.isInteger(numericId) && numericId > 0) {
        return await Pokemon.findOne({ id: numericId })
    }
    return await Pokemon.findOne({ name })
}

