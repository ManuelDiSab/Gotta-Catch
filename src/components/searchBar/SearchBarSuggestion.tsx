import Image from 'next/image'
import Link from 'next/link'
import { pickLocalizedText } from '../../lib/i18n/pickLocalizedTExt'
import { IPokemonCard } from '@/interfaces/IPokemon.interface'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { useTranslation } from '@/lib/i18n/useTranslation'
export default function Suggestion ({
  isLoading,
  suggestions,
  onClick
}: {
  isLoading: boolean
  suggestions: IPokemonCard[]
  onClick: () => void
}) {
  const { locale } = useLocale()
  const { t } = useTranslation()
  return (
    <>
      {!isLoading && suggestions.length === 0 && (
        <p className='px-3 py-3 text-xs text-(--muted)'>
          {t('search.noResults')}
        </p>
      )}
      {!isLoading &&
        suggestions.map(pokemon => {
          const genus = pickLocalizedText(pokemon.genera, locale)
          return (
            <Link
              key={pokemon.id}
              href={`/pokemon/${pokemon.name.toLowerCase()}`}
              onClick={onClick}
              className='group flex items-center gap-2.5 border-b border-(--line) px-2.5 py-2 last:border-b-0 transition hover:bg-(--panel)'
            >
              <div className='relative flex h-8 w-8 shrink-0 items-center justify-center'>
                {pokemon.sprites[0] && (
                  <Image
                    src={pokemon.sprites[0]}
                    alt={pokemon.name}
                    width={32}
                    height={32}
                    className='object-contain'
                  />
                )}
              </div>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-1.5'>
                  <span className='truncate text-xs font-bold uppercase tracking-wide text-(--paper) group-hover:text-(--lime)'>
                    {pokemon.name}
                  </span>
                </div>
                {genus && (
                  <p className='truncate text-[10px] italic text-(--muted)'>
                    {genus}
                  </p>
                )}
              </div>
              <span className='shrink-0 font-mono text-[10px] text-(--muted)'>
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </Link>
          )
        })}
    </>
  )
}
