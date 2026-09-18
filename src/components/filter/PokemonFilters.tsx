'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'
import { useEffect, useState } from 'react'
import { Generation } from '@/interfaces/IPokemon.interface'
import { toRomanNumeral } from '@/lib/utils/format'

export type SortOption = 'order-asc' | 'order-desc' | 'name-asc' | 'name-desc'

export type PokemonFilterValue = {
  types: string[]
  generations: Generation[]
  rarity: 'all' | 'legendary' | 'mythical'
  sort: SortOption
}

type PokemonFiltersProps = {
  value: PokemonFilterValue
  onChange: (value: PokemonFilterValue) => void
}

const typeOptions = [
  'fire',
  'water',
  'grass',
  'psychic',
  'ghost',
  'normal',
  'dragon',
  'poison',
  'flying',
  'fairy',
  'electric',
  'ice',
  'dark',
  'rock',
  'ground'
]

const generationOptions: Generation[] = [
  'generation-i',
  'generation-ii',
  'generation-iii',
  'generation-iv',
  'generation-v',
  'generation-vi',
  'generation-vii',
  'generation-viii',
  'generation-ix'
]

export function PokemonFilters ({ value, onChange }: PokemonFiltersProps) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const toggleType = (type: string) => {
    const types = value.types.includes(type)
      ? value.types.filter(item => item !== type)
      : value.types.length < 2
      ? [...value.types, type]
      : value.types
    onChange({ ...value, types })
  }

  const toggleGeneration = (generation: Generation) => {
    const generations = value.generations.includes(generation)
      ? value.generations.filter(item => item !== generation)
      : [...value.generations, generation]
    onChange({ ...value, generations })
  }

  const reset = () =>
    onChange({ types: [], generations: [], rarity: 'all', sort: 'order-asc' })

  const active =
    value.types.length > 0 ||
    value.generations.length > 0 ||
    value.rarity !== 'all' ||
    value.sort !== 'order-asc'

  return (
    <div className='flex border-l border-(--line) pl-4.5 max-[800px]:border-l-0 max-[800px]:px-0 max-[800px]:py-3.75'>
      <button
        className={`flex w-full items-center justify-center gap-2 border px-3.5 py-2.5 text-[11px] cursor-pointer transition-all duration-200 uppercase tracking-widest ${
          active
            ? 'border-(--lime) text-(--lime)'
            : 'border-(--line) text-(--paper)'
        }`}
        type='button'
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        <span aria-hidden='true'>☷</span> {t('filters.title')}
        {value.types.length > 0 && (
          <b className='flex size-4.25 items-center justify-center rounded-full bg-(--lime) text-[9px] text-(--ink)'>
            {value.types.length}
          </b>
        )}
      </button>

      {/* Contenitore con transizione di dissolvenza dello sfondo */}
      <div
        className={`fixed inset-0 z-1200 flex justify-end transition-all duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <button
          className='absolute inset-0 border-0 bg-[rgba(5,9,10,.72)] cursor-pointer'
          type='button'
          aria-label='Chiudi filtri'
          onClick={() => setOpen(false)}
        />

        {/* Aside con transizione di scorrimento laterale */}
        <aside
          className={`relative z-10 flex w-[88vw] max-w-97.5 flex-col border-r border-(--line) bg-(--panel) p-7 transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          } max-[800px]:absolute max-[800px]:bottom-0 max-[800px]:left-0 max-[800px]:top-auto max-[800px]:w-full max-[800px]:max-w-none max-[800px]:rounded-t-[18px] max-[800px]:border-r-0 max-[800px]:p-6 max-[800px]:translate-x-0 ${
            open ? 'max-[800px]:translate-y-0' : 'max-[800px]:translate-y-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className='flex items-start justify-between border-b border-(--line) pb-6'>
            <div>
              <span className='text-[10px] font-semibold uppercase tracking-[.18em] text-(--lime)'>
                Refine the archive
              </span>
              <h3 className='mt-3 text-4xl font-medium tracking-[-.07em]'>
                Filters
              </h3>
            </div>
            <button
              className='cursor-pointer transition-all duration-200 size-8.5 border border-(--line) bg-transparent text-2xl text-(--paper) hover:border-(--lime) hover:text-(--lime) flex items-center justify-center'
              type='button'
              aria-label='Chiudi filtri'
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Area scrollabile SENZA SCROLLBAR */}
          <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none max-[800px]:max-h-[54vh]'>
            <section className='border-b border-(--line) py-6'>
              <div className='mb-4 flex items-baseline justify-between'>
                <span className='text-xs uppercase tracking-[.11em] '>
                  {t('filters.types')}
                </span>
                <small className='font-serif italic text-(--muted)'>
                  {t('filters.chooseUp')}{' '}
                </small>
              </div>
              <div className='grid grid-cols-3 gap-2'>
                {typeOptions.map(type => (
                  <button
                    key={type}
                    type='button'
                    className={`cursor-pointer transition-all duration-200 border bg-transparent px-1 py-2.5 text-[10px] uppercase ${
                      value.types.includes(type)
                        ? 'border-(--lime) text-(--paper) shadow-[inset_0_-2px_var(--lime)]'
                        : 'border-(--line) text-(--muted) hover:border-(--lime)'
                    }`}
                    onClick={() => toggleType(type)}
                    aria-pressed={value.types.includes(type)}
                  >
                    {t(`types.${type}`)}
                  </button>
                ))}
              </div>
            </section>

            <section className='border-b border-(--line) py-6'>
              <div className='mb-4 flex items-baseline justify-between'>
                <span className='text-xs uppercase tracking-[.11em] '>
                  {t('filters.generations')}
                </span>
              </div>
              <div className='grid grid-cols-3 gap-2'>
                {generationOptions.map(generation => (
                  <button
                    key={generation}
                    type='button'
                    className={`cursor-pointer transition-all duration-200 border bg-transparent px-1 py-2.5 text-[10px] uppercase ${
                      value.generations.includes(generation)
                        ? 'border-(--lime) text-(--paper) shadow-[inset_0_-2px_var(--lime)]'
                        : 'border-(--line) text-(--muted) hover:border-(--lime)'
                    }`}
                    onClick={() => toggleGeneration(generation)}
                    aria-pressed={value.generations.includes(generation)}
                  >
                    {toRomanNumeral(generation)}
                  </button>
                ))}
              </div>
            </section>

            <section className='border-b border-(--line) py-6'>
              <div className='mb-4 flex items-baseline justify-between'>
                <span className='text-xs uppercase tracking-[.11em]'>
                  {t('filters.rarity')}
                </span>
                <small className='font-serif italic text-(--muted)'>
                  Species class
                </small>
              </div>
              <div className='flex flex-col gap-3'>
                {[
                  ['all', t('filters.all')],
                  ['legendary', t('filters.legendary')],
                  ['mythical', t('filters.mythical')]
                ].map(([key, label]) => (
                  <label
                    className='flex items-center gap-2.5 text-[13px] text-(--muted) cursor-pointer'
                    key={key}
                  >
                    <input
                      className='accent-(--lime)'
                      type='radio'
                      name='rarity'
                      checked={value.rarity === key}
                      onChange={() =>
                        onChange({
                          ...value,
                          rarity: key as PokemonFilterValue['rarity']
                        })
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </section>

            <section className='py-6'>
              <div className='mb-4 flex items-baseline justify-between'>
                <span className='text-xs uppercase tracking-[.11em]'>
                  {t('filters.sortBy')}
                </span>
                <small className='font-serif italic text-(--muted)'>
                  {t('filters.orderResults')}
                </small>
              </div>
              <select
                className='w-full border border-(--line) bg-transparent p-3 text-xs text-(--paper) outline-0 cursor-pointer'
                value={value.sort}
                onChange={event => {
                  onChange({
                    ...value,
                    sort: event.target.value as SortOption
                  })
                }}
              >
                <option className='bg-(--panel)' value='order-asc'>
                  {t('filters.numAsc')}
                </option>
                <option className='bg-(--panel)' value='order-desc'>
                  {t('filters.numDesc')}
                </option>
                <option className='bg-(--panel)' value='name-asc'>
                  {t('filters.alphAsc')}
                </option>
                <option className='bg-(--panel)' value='name-desc'>
                  {t('filters.alphDesc')}
                </option>
              </select>
            </section>
          </div>

          <div className='flex gap-2 pt-5'>
            <button
              className='cursor-pointer border transition-all duration-200 border-(--line) bg-transparent px-4 py-3 text-[11px] uppercase tracking-widest text-(--muted) hover:border-(--paper) hover:text-(--paper)'
              type='button'
              onClick={reset}
            >
              Reset
            </button>
            <button
              className='flex-1 cursor-pointer border transition-all duration-200 border-(--lime) bg-(--lime) px-4 py-3 text-[11px] uppercase tracking-widest text-(--ink) hover:bg-(--paper)'
              type='button'
              onClick={() => setOpen(false)}
            >
              {t('filters.apply')} <span>↗</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
