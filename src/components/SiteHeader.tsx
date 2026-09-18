'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from '../lib/i18n/useTranslation'
import LanguageToggle from './LanguageToggle'
// import

const navItems = [
  { key: 'home', href: '/' },
  { key: 'pokedex', href: '/pokedex' },
  { key: 'game', href: '/game' }
] as const

export function SiteHeader () {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  // Chiude il menu offcanvas ad ogni cambio di rotta
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMenuOpen(false)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const navigate = (href: string) => {
    setMenuOpen(false)
    router.push(href)
  }

  return (
    <>
      <header className='sticky top-0 z-50 border-b border-(--line) bg-(--ink)/95 backdrop-blur'>
        <div className='mx-auto grid h-19.5 w-full max-w-350 grid-cols-[auto_1fr_auto] items-center gap-4 px-10 max-[800px]:h-17 max-[800px]:px-5'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-3 group transition '>
            {/* Icona SVG Minimal incorporata */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-7 h-7 shrink-0'
              fill='none'
            >
              <circle cx='12' cy='12' r='10' stroke='#3ddc97' strokeWidth='2' />
              <path
                d='M2 12h8m4 0h8'
                stroke='#3ddc97'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <circle
                cx='12'
                cy='12'
                r='3'
                stroke='#3ddc97'
                strokeWidth='2'
                fill='#ffffff'
              />
            </svg>

            <div className='wordmark'>
              <span className='word-gotta'>Gotta</span>{' '}
              <span className='word-catch'>catch</span>
            </div>
          </Link>

          {/* Navigazione Desktop */}
          <nav
            className='flex justify-self-center gap-8 max-[800px]:hidden'
            aria-label='Navigazione principale'
          >
            {navItems.map(item => (
              <Link
                key={item.key}
                className={`font-hud text-xs uppercase transition ${
                  isActive(item.href)
                    ? 'text-(--lime)'
                    : 'text-(--muted) hover:text-(--paper)'
                }`}
                href={item.href}
              >
                {t(`header.nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Azioni destra (Language toggle + Hamburger button) */}
          <div className='flex items-center justify-self-end gap-4'>
            <div className='max-[800px]:hidden'>
              <LanguageToggle />
            </div>
            <button
              className='relative hidden h-9.5 w-10.5 flex-col items-center justify-center gap-1.5 border border-(--line) bg-transparent max-[800px]:flex cursor-pointer'
              type='button'
              aria-label={
                menuOpen ? t('header.menuAriaClose') : t('header.menuAriaOpen')
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(current => !current)}
            >
              <span
                className={`block h-px w-4.5 bg-(--paper) transition ${
                  menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-4.5 bg-(--paper) transition ${
                  menuOpen ? 'translate-y-[-3.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className='fixed inset-0 z-9999 overflow-hidden'>
          <div
            className='absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity'
            onClick={() => setMenuOpen(false)}
            aria-hidden='true'
          />

          {/* Pannello laterale */}
          <aside
            className='absolute inset-y-0 right-0 flex w-[min(86vw,390px)] max-w-90 animate-[menu-in_.24s_ease-out] flex-col border-l border-(--line) bg-(--panel) p-6 shadow-2xl'
            aria-label='Menu mobile'
          >
            <div className='mobile-menu-head'>
              <span className='eyebrow'>{t('header.menuKicker')}</span>
              <button
                className='menu-close cursor-pointer'
                type='button'
                aria-label={t('header.menuAriaClose')}
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <nav className='flex flex-col'>
              {navItems.map(item => (
                <button
                  key={item.key}
                  className={`flex items-center justify-between border-b border-(--line) bg-transparent py-5 text-left text-base cursor-pointer ${
                    isActive(item.href) ? 'text-(--lime)' : 'text-(--muted)'
                  }`}
                  type='button'
                  onClick={() => navigate(item.href)}
                >
                  {t(`header.nav.${item.key}`)} <span>↗</span>
                </button>
              ))}
            </nav>
            <div className='mt-6'>
              <LanguageToggle />
            </div>
            <div className='mt-auto flex justify-between border-t border-(--line) pt-4 text-[9px] uppercase tracking-[.12em] text-(--muted)'>
              <span>{t('header.footerBrand')}</span>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
