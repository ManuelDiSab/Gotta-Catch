import { useTranslation } from '@/lib/i18n/useTranslation'
import { getTypeColor } from '@/lib/utils/format'
import { getTypeEffectiveness } from '@/lib/utils/typeEffectiveness'

export default function PokemonTypesResistance ({
  pokemonTypes
}: {
  pokemonTypes: string[]
}) {
  const { t } = useTranslation()
  const weaknesses = getTypeEffectiveness(pokemonTypes)
  // Definiamo le righe qui dentro per poter usare 't()'
  const weaknessRows: Array<{
    key: keyof ReturnType<typeof getTypeEffectiveness>
    label: string
  }> = [
    { key: 'quadruple', label: t('pokemonDetail.weaknesses.rows.quadruple') },
    { key: 'double', label: t('pokemonDetail.weaknesses.rows.double') },
    { key: 'normal', label: t('pokemonDetail.weaknesses.rows.normal') },
    { key: 'half', label: t('pokemonDetail.weaknesses.rows.half') },
    { key: 'quarter', label: t('pokemonDetail.weaknesses.rows.quarter') },
    { key: 'immune', label: t('pokemonDetail.weaknesses.rows.immune') }
  ]
  return (
    <section className='mb-10 border border-(--line) bg-(--panel) p-5 sm:p-6'>
      <p className='eyebrow mb-5'>{t('pokemonDetail.weaknesses.title')}</p>
      <div className='flex flex-col gap-3'>
        {weaknessRows.map(row => (
          <div
            key={row.key}
            className='flex flex-col gap-1.5 border-b border-(--line) pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4'
          >
            <span className='w-36 shrink-0 font-hud text-[10px] uppercase tracking-widest text-(--muted)'>
              {row.label}
            </span>
            <div className='flex flex-wrap gap-1.5'>
              {weaknesses[row.key].length === 0 ? (
                <span className='text-xs text-(--muted)'>
                  {t('pokemonDetail.weaknesses.none')}
                </span>
              ) : (
                weaknesses[row.key].map(atkType => (
                  <span
                    key={atkType}
                    style={{ color: getTypeColor(atkType) }}
                    className='border border-(--line) px-2 py-0.5 text-[11px] font-semibold uppercase'
                  >
                    {t(`types.${atkType}`)}
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
