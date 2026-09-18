'use client'

import Link from 'next/link'
import Image from 'next/image'
import { colorsEn } from '../../../lib/utils/colors'
import { IPokemonCard } from '../../../interfaces/IPokemon.interface'
import { useLocale } from '../../../lib/i18n/LocaleContext'
import { pickLocalizedText } from '../../../lib/i18n/pickLocalizedTExt'
import { useTranslation } from '@/lib/i18n/useTranslation'

function getTypeColor (type?: string): string {
  return colorsEn[type?.toLowerCase() ?? ''] ?? '#899195'
}

function getPokemonBackground (pokemon: IPokemonCard) {
  const firstType = pokemon.types[0]?.toLowerCase()
  const secondType = pokemon.types[1]?.toLowerCase()
  const primaryColor = colorsEn[firstType] ?? '#899195'
  const secondaryColor = secondType
    ? colorsEn[secondType] ?? primaryColor
    : primaryColor
  const accentColor = secondType ? secondaryColor : primaryColor

  return {
    '--accent': accentColor,
    '--accent-soft': '#22282e',
    backgroundColor: '#1e2429', // Un grigio scuro neutro, bilanciato e pulito
    backgroundImage: `
      linear-gradient(135deg, ${primaryColor}40 0%, ${secondaryColor}25 100%),
      radial-gradient(circle at 80% 20%, ${primaryColor}30 0%, transparent 50%)
    `,
    backgroundSize: 'auto, auto'
  }
}

export default function PokemonCard ({ item }: { item: IPokemonCard }) {
  const { t } = useTranslation()
  const { locale } = useLocale()
  const genus = pickLocalizedText(item.genera, locale)

  return (
    <Link
      href={`/pokemon/${item.name.toLowerCase()}`}
      title={`Scopri di più su ${item.name}`}
      style={getPokemonBackground(item)}
      className='group relative flex aspect-[3/4.2] sm:aspect-3/4 flex-col overflow-hidden border border-(--line) bg-(--panel) p-3.5 sm:p-5 text-(--paper) transition duration-200 hover:-translate-y-1 hover:border-(--lime)'
    >
      {/* Badge ID */}
      <span className='absolute right-3 top-3 z-1 font-hud text-[10px] text-(--muted)'>
        #{String(item.id).padStart(3, '0')}
      </span>

      {/* Sprite */}
      <div className='relative flex flex-1 items-center justify-center'>
        <Image
          src={item.sprites[0]}
          alt={`${item.name}, pokemon di tipo: ${item.types.join(' ')}`}
          width={180}
          height={180}
          className='h-auto max-h-36 sm:max-h-50 max-w-[85%] object-contain drop-shadow-[0_18px_14px_rgba(0,0,0,.35)] transition duration-300 group-hover:scale-105'
        />
      </div>

      {/* Info */}
      <div className='border-t border-(--line) pt-2.5 sm:pt-3'>
        <p className='truncate text-center font-serif text-[10px] sm:text-xs italic text-(--muted)'>
          {genus}
        </p>
        <h3 className='my-1.5 sm:my-2 text-center text-lg sm:text-xl font-medium tracking-[-.04em] capitalize'>
          {item.name}
        </h3>

        <div className='flex flex-wrap items-center justify-center gap-1.5'>
          {item.types.map(itemType => (
            <span
              key={itemType}
              className='flex items-center gap-1 border border-(--line) px-2 py-1 font-hud text-[9px] font-semibold uppercase tracking-widest text-(--muted)'
            >
              <span
                style={{ backgroundColor: getTypeColor(itemType) }}
                className='size-1.5 rounded-full'
              />
              {t(`types.${itemType}`)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
