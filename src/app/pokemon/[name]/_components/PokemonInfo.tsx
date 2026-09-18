import { IPokemon } from '@/interfaces/IPokemon.interface'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { pickLocalizedText } from '@/lib/i18n/pickLocalizedTExt'
import { useTranslation } from '@/lib/i18n/useTranslation'
import {
  formatSlug,
  getContrastText,
  getTypeColor,
  toRomanNumeral
} from '@/lib/utils/format'
import Image from 'next/image'
import { useRef } from 'react'
export default function PokemonInfo ({ pokemon }: { pokemon: IPokemon }) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const { t } = useTranslation()
  const { locale } = useLocale()

  const genus = pickLocalizedText(pokemon.genera, locale)
  const flavorText = pickLocalizedText(pokemon.flavorText, locale)

  function playCry () {
    if (!pokemon?.cries[0]) return
    if (!audioRef.current) audioRef.current = new Audio(pokemon.cries[0])
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }
  return (
    <>
      <p className='mb-8 max-w-3xl text-sm leading-relaxed text-(--muted)'>
        <em className='not-italic text-(--paper)'>
          {formatSlug(pokemon.name)}
        </em>{' '}
        {t('pokemonDetail.intro.text1')}
        <span
          style={{ color: getTypeColor(pokemon.types[0]) }}
          className='font-semibold'
        >
          {t(`types.${pokemon.types[0]}`)}
        </span>
        {pokemon.types[1] && (
          <>
            {' '}
            e{' '}
            <span
              style={{ color: getTypeColor(pokemon.types[1]) }}
              className='font-semibold'
            >
              {t(`types.${pokemon.types[1]}`)}
            </span>
          </>
        )}
        ,{' '}
        {t('pokemonDetail.intro.text2', {
          generation: toRomanNumeral(pokemon.generation)
        })}
        . {flavorText}
      </p>

      <div className='mb-10 grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start'>
        {/* Sprite + verso */}
        <div className=' relative flex flex-col items-center gap-4 border border-(--line) bg-(--panel) p-6 lg:sticky lg:top-24'>
          <div className='relative flex w-full justify-center'>
            <div className='absolute size-40 rounded-full bg-(--accent) opacity-30 blur-3xl' />
            <Image
              src={pokemon.sprites[0]}
              alt={pokemon.name}
              width={220}
              height={220}
              className='relative z-10 h-auto max-h-56 w-auto drop-shadow-[0_18px_20px_rgba(0,0,0,0.4)]'
            />
          </div>
          {genus && (
            <p className='text-center font-serif text-xs italic text-(--muted)'>
              {genus}
            </p>
          )}
          {pokemon.cries[0] && (
            <button
              type='button'
              onClick={playCry}
              className='flex items-center gap-2 border border-(--line) px-3 py-1.5 font-hud text-[10px] uppercase tracking-widest text-(--muted) transition hover:border-(--lime) hover:text-(--lime)'
            >
              ▶ {t('pokemonDetail.info.sound')}
            </button>
          )}
        </div>

        {/* 2. SEZIONE CARATTERISTICHE (info principali + dettagli) */}
        <section className='grid gap-8 sm:grid-cols-2'>
          <div className='border border-(--line) bg-(--panel) p-5 sm:p-6'>
            <p className='eyebrow mb-4'>{t('pokemonDetail.info.mainInfo')}</p>
            <dl className='flex flex-col gap-2.5 text-sm'>
              <div className='flex items-center justify-between gap-3 border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.types')}
                </dt>
                <dd className='flex gap-2'>
                  {pokemon.types.map(type => {
                    const color = getTypeColor(type)

                    return (
                      <span
                        key={type}
                        style={{
                          backgroundColor: color,
                          color: getContrastText(color)
                        }}
                        className='px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide'
                      >
                        {t(`types.${type}`)}
                      </span>
                    )
                  })}
                </dd>
              </div>
              <div className='flex items-center justify-between gap-3 border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.species')}
                </dt>
                <dd className='text-right'>{genus || '—'}</dd>
              </div>
              <div className='flex items-center justify-between gap-3 border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.generation')}
                </dt>
                <dd>{toRomanNumeral(pokemon.generation)}</dd>
              </div>
              <div className='flex items-start justify-between gap-3'>
                <dt className='shrink-0 text-(--muted)'>
                  {t('pokemonDetail.info.ability')}
                </dt>
                <dd className='flex flex-wrap justify-end gap-1.5'>
                  {pokemon.abilities.map(ability => (
                    <span
                      key={ability}
                      className='border border-(--line) px-2 py-0.5 text-[11px]'
                    >
                      {formatSlug(ability)}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className='border border-(--line) bg-(--panel) p-5 sm:p-6'>
            <p className='eyebrow mb-4'>{t('pokemonDetail.info.details')}</p>
            <dl className='flex flex-col gap-2.5 text-sm'>
              <div className='flex items-center justify-between border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.height')}
                </dt>
                <dd>{(pokemon.height / 10).toFixed(1)} m</dd>
              </div>
              <div className='flex items-center justify-between border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.weight')}
                </dt>
                <dd>{(pokemon.weight / 10).toFixed(1)} kg</dd>
              </div>
              <div className='flex items-center justify-between border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.exp')}
                </dt>
                <dd>{pokemon.base_experience ?? '—'}</dd>
              </div>
              <div className='flex items-center justify-between border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.happyness')}
                </dt>
                <dd>{pokemon.base_happiness ?? '—'}</dd>
              </div>
              <div className='flex items-center justify-between border-b border-(--line) pb-2'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.capture')}
                </dt>
                <dd>{pokemon.capture_rate}</dd>
              </div>
              <div className='flex items-center justify-between'>
                <dt className='text-(--muted)'>
                  {t('pokemonDetail.info.cycle')}
                </dt>
                <dd>{pokemon.hatch_counter ?? '—'}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </>
  )
}
