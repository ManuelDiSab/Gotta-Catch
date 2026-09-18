'use client'

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { getPokemonList } from '../../lib/api/pokemon'
import { IPokemonCard } from '../../interfaces/IPokemon.interface'
import SearchBarSuggestion from './SearchBarSuggestion'
import { useTranslation } from '@/lib/i18n/useTranslation'
const MAX_SUGGESTIONS = 5

export default function SearchBar () {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<IPokemonCard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { t } = useTranslation()

  // Gestisce il focus automatico quando la barra si apre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef?.current?.focus()
    }
  }, [isOpen])

  // Chiude il pannello se si clicca fuori dal componente
  useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Recupera i suggerimenti con debounce, annullando la richiesta precedente
  useEffect(() => {
    const trimmed = query.trim()
    const controller = new AbortController()

    const timeoutId = setTimeout(() => {
      if (trimmed.length < 2) {
        setSuggestions([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      getPokemonList({ name: trimmed })
        .then(res => {
          if (controller.signal.aborted) return
          setSuggestions(res.data.slice(0, MAX_SUGGESTIONS))
        })
        .catch(() => {
          if (!controller.signal.aborted) setSuggestions([])
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false)
        })
    }, 300)

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [query])

  // Funzione di invio ricerca (es. reindirizza a /pokedex?search=nome)
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsOpen(false)
    setShowSuggestions(false)
    router.push(`/pokedex?search=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = () => {
    // setIsOpen(false)
    setShowSuggestions(false)
    setQuery('')
  }

  const trimmedQuery = query.trim()
  const displaySuggestions = showSuggestions && trimmedQuery.length >= 2

  return (
    <div ref={containerRef} className='relative flex items-center'>
      {isOpen && (
        <div className='right-0  top-12 z-50 w-[min(80vw,26rem)] border border-(--line) bg-(--panel) mr-3 shadow-2xl animate-[menu-in_.2s_ease-out]'>
          <form onSubmit={handleSearch} className='flex'>
            <input
              ref={inputRef}
              type='text'
              value={query}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={e => e.key === 'Escape' && setShowSuggestions(false)}
              placeholder={t('search.placeholder')}
              autoComplete='off'
              className='min-w-0 flex-1 bg-(--ink) border border-(--line) px-3 py-2.5 text-xs text-(--paper) focus:outline-none focus:border-(--lime)'
            />
            <button
              type='submit'
              className='border border-(--lime) bg-(--lime) px-3 text-xs font-bold uppercase text-(--ink) hover:bg-(--paper) cursor-pointer'
            >
              {t('search.search')}
            </button>
          </form>

          {/* Dropdown suggerimenti */}
          {displaySuggestions && (
            <div className='mt-2 border absolute w-[min(80vw,26rem)]  border-(--line) bg-(--ink) max-h-80 overflow-y-auto'>
              {isLoading && (
                <div className='space-y-1.5 p-2'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='h-9 animate-pulse bg-(--panel)' />
                  ))}
                </div>
              )}
              <SearchBarSuggestion
                onClick={handleSuggestionClick}
                isLoading={isLoading}
                suggestions={suggestions}
              />
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-10 shrink-0 items-center justify-center border bg-(--ink) transition cursor-pointer ${
          isOpen
            ? 'border-(--lime) text-(--lime)'
            : 'border-(--line) text-(--paper) hover:border-(--lime) hover:text-(--lime)'
        }`}
        type='button'
        aria-label={
          isOpen ? `${t('search.clearAriaLabel')}` : `${t('search.ariaLabel')}`
        }
        aria-expanded={isOpen}
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <circle cx='11' cy='11' r='7' />
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </svg>
      </button>
    </div>
  )
}
