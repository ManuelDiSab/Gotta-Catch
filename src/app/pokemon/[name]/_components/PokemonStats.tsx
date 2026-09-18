import { useTranslation } from '@/lib/i18n/useTranslation'
import { getHpRange, getStatRange, getStatTier } from '@/lib/utils/format'

export default function PokemonStats ({
  pokemonStats
}: {
  pokemonStats: {
    url: string
    name: string
    effort: number
    base_stat: number
  }[]
}) {
  const { t } = useTranslation()
  const statsTotal = pokemonStats.reduce((sum, s) => sum + s.base_stat, 0)
  const tier = getStatTier(statsTotal)
  return (
    <section className='mb-10 border border-(--line) bg-(--panel) p-5 sm:p-6'>
      <div className='mb-5 flex items-center justify-between gap-3'>
        <p className='eyebrow'>{t('pokemonDetail.stats.title')}</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-130 border-collapse text-sm'>
          <thead>
            <tr className='border-b border-(--line) text-left font-hud text-[10px] uppercase tracking-widest text-(--muted)'>
              <th className='py-2 pr-3 font-normal'>
                {t('pokemonDetail.stats.statName')}
              </th>
              <th className='py-2 pr-3 font-normal'>Base</th>
              <th className='w-1/3 py-2 pr-3 font-normal'></th>
              <th className='py-2 pr-3 font-normal'>Min. Lv100</th>
              <th className='py-2 font-normal'>Max. Lv100</th>
            </tr>
          </thead>
          <tbody>
            {pokemonStats.map(stat => {
              const pct = Math.min(100, (stat.base_stat / 255) * 100)
              const range =
                stat.name === 'hp'
                  ? getHpRange(stat.base_stat)
                  : getStatRange(stat.base_stat)
              return (
                <tr
                  key={stat.name}
                  className='border-b border-(--line) last:border-0'
                >
                  <td className='py-2.5 pr-3 font-hud text-[10px] uppercase text-(--muted)'>
                    {t(`pokemonDetail.stats.${stat.name}`)}
                  </td>
                  <td className='py-2.5 pr-3 font-hud text-[11px] font-semibold'>
                    {stat.base_stat}
                  </td>
                  <td className='py-2.5 pr-3'>
                    <div className='relative h-2 min-w-24 overflow-hidden bg-(--ink)'>
                      <div
                        style={{
                          width: `${pct}%`,
                          backgroundColor: tier.color
                        }}
                        className='absolute inset-y-0 left-0 transition-[width] duration-500'
                      />
                    </div>
                  </td>
                  <td className='py-2.5 pr-3 font-hud text-[11px] text-(--muted)'>
                    {range.min}
                  </td>
                  <td className='py-2.5 font-hud text-[11px] text-(--muted)'>
                    {range.max}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td className='pt-3 font-hud text-[10px] uppercase text-(--muted)'>
                {t('pokemonDetail.stats.total')}
              </td>
              <td className='pt-3 font-hud text-[11px] font-bold text-(--lime)'>
                {statsTotal}
              </td>
              <td className='pt-3' colSpan={3} />
            </tr>
          </tbody>
        </table>
      </div>
      <p className='mt-4 text-[11px] text-(--muted)'>
        {t('pokemonDetail.stats.disclaimer')}
      </p>
    </section>
  )
}
