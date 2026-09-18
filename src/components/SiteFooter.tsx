'use client'
import { useTranslation } from '@/lib/i18n/useTranslation'
import Link from 'next/link'

export default function SiteFooter () {
  const { t } = useTranslation()
  return (
    <footer className='relative  overflow-hidden border-t border-(--line) bg-(--panel) text-(--paper)'>
      <span className='pointer-events-none absolute inset-x-0 top-0 h-px bg-(--lime) opacity-70' />
      <div className='pointer-events-none absolute -right-24 top-0 h-48 w-48 border border-(--line) opacity-45 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]' />

      <div className='relative mx-auto w-full max-w-350 px-5 py-10 sm:px-10 lg:px-12'>
        <div className='grid gap-7 py-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-end'>
          <p className='max-w-190 text-[11px] leading-relaxed text-(--muted)'>
            {t('footer.disclaimer')}
          </p>

          <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-(--paper) md:justify-end'>
            <span className='font-hud text-[10px] uppercase tracking-widest text-(--muted)'>
              &copy; {new Date().getFullYear()} Gotta Catch
            </span>
            <span className='hidden text-(--line) sm:inline'>/</span>
            <span className='text-(--muted)'>{t('footer.createdBy')}</span>
            <Link
              href='https://manueldisabatino.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
              className=' border-b border-(--lime)/50 text-(--paper) transition-colors hover:border-(--lime) hover:text-(--lime) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lime)'
            >
              Manuel Di Sabatino
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
