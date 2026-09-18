'use client'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/useTranslation'
export default function GamePage () {
  const { t } = useTranslation()
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-(--ink) px-10 text-center text-(--paper) max-[800px]:px-5'>
      <div className='text-[10px] font-semibold uppercase tracking-[.18em] text-(--lime)'>
        {t('game.comingSoonKicker')}
      </div>
      <h1 className='my-6 text-[clamp(40px,6vw,72px)] font-medium leading-[.95] tracking-[-.08em]'>
        {t('game.comingSoonTitle')}
        <br />
        <span className='font-serif italic font-normal text-(--lime)'>
          {t('game.comingSoonTitleAccent')}
        </span>
      </h1>
      <p className='max-w-105 text-[15px] leading-[1.7] text-(--muted)'>
        {t('game.comingSoonDescription')}
      </p>
      <Link
        href='/pokedex'
        className=' mt-8 inline-flex items-center gap-3 bg-(--lime) px-4 py-3.5 font-hud text-[11px] font-semibold uppercase text-(--ink) transition hover:bg-[#5cf0b0]'
      >
        {t('game.goToPokedex')} <span>↗</span>
      </Link>

      {/* <HeroSection></HeroSection> */}
    </main>
  )
}
