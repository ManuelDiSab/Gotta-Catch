'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Button from '../../components/Button'
import ErrorComponent from '../../components/ErrorComponent'
import LoadingIndicator from '../../components/LoadingIndicator'
import PokemonCard from './_components/PokemonCard'
import { getPokemonList } from '../../lib/api/pokemon'
import { IPokemonCard } from '../../interfaces/IPokemon.interface'
import SearchBar from '@/components/searchBar/SearchBar'
import { useTranslation } from '@/lib/i18n/useTranslation'
import {
  PokemonFilters,
  PokemonFilterValue
} from '../../components/filter/PokemonFilters'

function getListParams (
  requestedPage: number,
  search: string,
  filters: PokemonFilterValue
) {
  const [sortBy, sortOrder] = filters.sort.split('-')
  const params: Record<string, string> = {
    page: String(requestedPage),
    sortBy: sortBy === 'name' ? 'name' : 'order',
    sortOrder
  }

  if (search) params.name = search
  if (filters.types.length) params.type = filters.types.join(',')
  if (filters.generations.length)
    params.generation = filters.generations.join(',')
  if (filters.rarity === 'legendary') params.isLegendary = 'true'
  if (filters.rarity === 'mythical') params.isMythical = 'true'

  return params
}

export default function PokedexPage () {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [pokemon, setPokemon] = useState<IPokemonCard[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [isFetching, setIsFetching] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [error, setError] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [filters, setFilters] = useState<PokemonFilterValue>({
    types: [],
    generations: [],
    rarity: 'all',
    sort: 'order-asc'
  })

  const search = searchParams.get('search')?.trim() ?? ''
  useEffect(() => {
    async function loadPokemonData () {
      try {
        setIsFetching(true)
        setError(false)
        const response = await getPokemonList(getListParams(1, search, filters))
        setPokemon(response.data)
        setPage(1)
        setTotalPages(Number(response.totalPages) || 1)
        setTotalResults(Number(response.totalResults) || response.data.length)
      } catch (loadError) {
        setError(true)
      } finally {
        setIsFetching(false)
      }
    }
    loadPokemonData()
  }, [search, filters])

  async function loadMorePokemon () {
    if (isFetchingMore || page >= totalPages) return
    const nextPage = page + 1
    try {
      setIsFetchingMore(true)
      const response = await getPokemonList(
        getListParams(nextPage, search, filters)
      )
      setPokemon(current => [...current, ...response.data])
      setPage(nextPage)
      setTotalPages(Number(response.totalPages) || totalPages)
    } catch (loadError) {
      setError(true)
    } finally {
      setIsFetchingMore(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className='min-h-screen bg-(--ink) text-(--paper)'>
      <section
        className='bg-(--panel) px-[max(40px,calc((100vw-1320px)/2))] pb-10 pt-23.25 max-[800px]:px-5 max-[800px]:py-17.5'
        id='collection'
      >
        <div className='mb-8 flex items-end justify-between gap-5 border-b border-(--line) pb-5 max-[800px]:mb-6 max-[800px]:items-stretch max-[800px]:flex-col'>
          <div>
            <div className='mt-2 flex items-baseline gap-3'>
              <h1 className='text-3xl font-semibold uppercase tracking-wide'>
                Pokédex
              </h1>
              {!isFetching && (
                <span className='font-hud text-[10px] text-(--muted)'>
                  {totalResults} {t('pokedex.species')}
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-row-reverse items-center gap-2 md:flex-row max-[800px]:justify-between '>
            <SearchBar />
            <PokemonFilters value={filters} onChange={setFilters} />
          </div>
        </div>
        {!error && isFetching && (
          <div className='flex justify-center py-16'>
            <LoadingIndicator label={t('home.loading')} />
          </div>
        )}
        {error && <ErrorComponent />}
        {!isFetching && !error && (
          <div
            className='grid grid-cols-4 gap-3 max-[1100px]:grid-cols-3 max-[768px]:grid-cols-2 max-[420px]:grid-cols-1'
            role='list'
            aria-live='polite'
          >
            {pokemon.map(item => (
              <PokemonCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {!isFetching && !error && !pokemon.length && (
          <div className='flex flex-col gap-3 py-16 text-center text-(--muted)'>
            <strong className='text-(--paper)'>{t('home.noResults')}</strong>
          </div>
        )}
        {!isFetching && !error && page < totalPages && (
          <div className='my-[10vh] text-center'>
            <Button
              buttonProps={{
                label: isFetching ? t('home.loadingMore') : t('home.loadMore'),
                category: 'primary',
                onClick: loadMorePokemon
              }}
              disabled={isFetchingMore}
              loading={isFetchingMore}
            />
          </div>
        )}
      </section>

      {showScrollTop && (
        <button
          className='fixed bottom-6 right-6 z-10 flex size-11 items-center justify-center rounded-full bg-(--lime) text-xl text-(--ink) shadow-lg transition hover:bg-(--paper)'
          type='button'
          aria-label={t('home.backToTopAriaLabel')}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
    </main>
  )
}
