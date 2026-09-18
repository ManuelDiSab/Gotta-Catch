'use client'

import { CSSProperties, useEffect, useState } from 'react'
import { IPokemon } from '@/interfaces/IPokemon.interface'
import { getPokemonDetail } from '@/lib/api/pokemon'
import { useParams } from 'next/navigation'
import LoadingIndicator from '@/components/LoadingIndicator'
import ErrorComponent from '@/components/ErrorComponent'
import PageHeader from './_components/PageHeader'
import { getTypeColor } from '@/lib/utils/format'
import PokemonInfo from './_components/PokemonInfo'
import PokemonStats from './_components/PokemonStats'
import PokemonTypesResistance from './_components/PokemonTypesResistance'
import PokemonEvolutionChain from './_components/PokemonEvolutionChain/PokemonEvolutionChain'
// Limite massimo noto del pokedex gestito dal backend (vedi getRandomPokemon)
const MAX_POKEMON_ID = 1351

export interface NeighborInfo {
  id: number
  name: string
  sprite: string
}

export default function PokemonDetail () {
  const { name } = useParams<{ name: string }>()
  const [pokemon, setPokemon] = useState<IPokemon>()
  const [neighbors, setNeighbors] = useState<{
    prev?: NeighborInfo
    next?: NeighborInfo
  }>({})
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!name) return

    async function loadPokemonData () {
      try {
        setIsFetching(true)
        setError(false)
        setNeighbors({})
        const response = await getPokemonDetail(name)
        setPokemon(response.data)
      } catch {
        setError(true)
      } finally {
        setIsFetching(false)
      }
    }
    loadPokemonData()
  }, [name])

  useEffect(() => {
    if (!pokemon) return
    const currentId = pokemon.id

    async function loadNeighbor (id: number): Promise<NeighborInfo | undefined> {
      if (id < 1 || id > MAX_POKEMON_ID) return undefined
      try {
        const response = await getPokemonDetail(String(id))
        return {
          id: response.data.id,
          name: response.data.name,
          sprite: response.data.sprites[0]
        }
      } catch {
        return undefined
      }
    }
    async function loadNeighbors () {
      const [prev, next] = await Promise.all([
        loadNeighbor(currentId - 1),
        loadNeighbor(currentId + 1)
      ])
      setNeighbors({ prev, next })
    }
    loadNeighbors()
  }, [pokemon])

  if (isFetching)
    return (
      <div className=' flex justify-center min-h-dvh items-center'>
        <LoadingIndicator label='Caricamento Pokémon...' />
      </div>
    )

  if (error || !pokemon) return <ErrorComponent />

  const accent = getTypeColor(pokemon.types[0])

  return (
    <main className='min-h-screen bg-(--ink) text-(--paper)'>
      <div
        className='mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14'
        style={{ '--accent': accent } as CSSProperties}
      >
        <PageHeader
          name={pokemon.name}
          id={pokemon.id}
          neighbors={neighbors}
        ></PageHeader>

        {/* SEZIONE SULLE INFO */}

        <PokemonInfo pokemon={pokemon} />

        {/* sSEZIONE STATISTICHE */}

        <PokemonStats pokemonStats={pokemon.stats} />

        {/* Sezione debolezze/resistenze */}
        <PokemonTypesResistance pokemonTypes={pokemon.types} />

        {/* 4. CATENA EVOLUTIVA */}

        <PokemonEvolutionChain pokemon={pokemon} />
      </div>
    </main>
  )
}
