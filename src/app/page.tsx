'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { IPokemon } from '@/interfaces/IPokemon.interface'
import { getRandomPokemon } from '@/lib/api/pokemon'
import { getTypeColor } from '@/lib/utils/format'
import { pickLocalizedText } from '@/lib/i18n/pickLocalizedTExt'
import { useTranslation } from '../lib/i18n/useTranslation'
import CallToAction from './_components/CallToAction'
import PokemonCard from './pokedex/_components/PokemonCard'

export default function Home () {
  const { t, locale } = useTranslation()
  const [pokemon, setPokemon] = useState<IPokemon>()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const hasLoadedInitialPokemon = useRef(false)

  const loadFeaturedPokemon = async () => {
    try {
      setIsLoading(true)
      setHasError(false)
      const response = await getRandomPokemon()
      setPokemon(response.data)
    } catch {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (hasLoadedInitialPokemon.current) return
    hasLoadedInitialPokemon.current = true
    async function loadInitialFeaturedPokemon () {
      try {
        const response = await getRandomPokemon()
        setPokemon(response.data)
      } catch {
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void loadInitialFeaturedPokemon()
  }, [])

  const accent = getTypeColor(pokemon?.types[0])
  const description = pokemon
    ? pickLocalizedText(pokemon.flavorText, locale)
    : ''

  return (
    <main className='min-h-screen overflow-hidden bg-(--ink) text-(--paper)'>
      <section className='relative isolate overflow-hidden border-b border-(--line) bg-(--panel) bg-[linear-gradient(rgba(61,220,151,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(61,220,151,.045)_1px,transparent_1px),radial-gradient(circle_at_80%_35%,rgba(61,220,151,.1),transparent_28%)] bg-size-[28px_28px,28px_28px,auto]'>
        <div className='relative mx-auto grid min-h-[calc(100dvh-78px)] w-full max-w-350 items-center gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,.82fr)] lg:gap-20 lg:px-12 lg:py-16'>
          <div className='max-w-155'>
            <div className='mt-5 border-b border-(--line) pb-6'>
              <h1 className='max-w-130 text-4xl font-semibold uppercase leading-[.98] tracking-wide sm:text-5xl lg:text-6xl'>
                {t('home.featuredTitle')}
              </h1>
            </div>

            <div className='mt-7 min-h-60'>
              {isLoading && (
                <div className='space-y-4 py-4' aria-live='polite'>
                  <div className='h-10 w-48 animate-pulse bg-(--line)' />
                  <div className='h-4 w-full animate-pulse bg-(--line)' />
                  <div className='h-4 w-4/5 animate-pulse bg-(--line)' />
                </div>
              )}
              {hasError && !isLoading && (
                <div className='border-l-2 border-(--coral) py-2 pl-4'>
                  <p className='text-sm text-(--muted)'>
                    {t('home.featuredError')}
                  </p>
                  <button
                    className='mt-4 border border-(--line) px-3 py-2 font-hud text-[10px] uppercase text-(--paper) transition hover:border-(--lime) hover:text-(--lime)'
                    type='button'
                    onClick={loadFeaturedPokemon}
                  >
                    {t('home.retry')}
                  </button>
                </div>
              )}
              {pokemon && !isLoading && (
                <>
                  <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
                    <span className='border border-(--line) px-2 py-1 font-hud text-[10px] text-(--muted)'>
                      N. {String(pokemon.id).padStart(4, '0')}
                    </span>
                    {pokemon.types.map(type => (
                      <span
                        key={type}
                        className='inline-flex items-center gap-2 font-hud text-[10px] uppercase text-(--paper)'
                      >
                        <span
                          className='size-2 rounded-full'
                          style={{ backgroundColor: getTypeColor(type) }}
                        />
                        {t(`types.${type}`)}
                      </span>
                    ))}
                  </div>
                  <h2 className='mt-4 wrap-break-words text-5xl font-semibold uppercase leading-none tracking-wide sm:text-6xl'>
                    {pokemon.name}
                  </h2>
                  <p className='mt-5 max-w-130 text-[15px] leading-7 text-(--muted)'>
                    {description}
                  </p>
                  <div className='mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-(--line) pt-4 font-hud text-[10px] uppercase text-(--muted)'>
                    <span>
                      {t('home.height')} {pokemon.height / 10} m
                    </span>
                    <span>
                      {t('home.weight')} {pokemon.weight / 10} kg
                    </span>
                    <span>
                      {t('home.generation')}{' '}
                      {pokemon.generation
                        .replace('generation-', '')
                        .toUpperCase()}
                    </span>
                  </div>
                  <Link
                    href={`/pokemon/${pokemon.name}`}
                    className='mt-7 inline-flex items-center gap-3 border border-(--lime) bg-(--lime) px-4 py-3 font-hud text-[11px] font-semibold uppercase text-(--ink) transition hover:bg-transparent hover:text-(--lime)'
                  >
                    {t('home.openProfile')}{' '}
                    <span aria-hidden='true'>&rarr;</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div
            className='group relative mx-auto flex aspect-square w-100 max-w-[80vw] items-center justify-center bg-(--ink)/80 p-8  sm:p-12 lg:max-w-135'
            style={{ borderColor: pokemon ? `${accent}66` : undefined }}
          >
            <div
              className='pointer-events-none absolute inset-4 border border-(--line) sm:inset-6'
              aria-hidden='true'
            />
            <div
              className='pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_49.8%,rgba(61,220,151,.08)_50%,transparent_50.2%)] bg-size-[100%_8px] opacity-40'
              aria-hidden='true'
            />

            {pokemon && !isLoading ? (
              <PokemonCard item={pokemon} />
            ) : (
              /* skeleton loader */
              <div className='size-32 animate-pulse rounded-full border border-(--line) bg-(--panel)' />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
