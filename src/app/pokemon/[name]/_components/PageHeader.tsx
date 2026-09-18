import Link from 'next/link'
import Image from 'next/image'
import { NeighborInfo } from '../page'
import SearchBar from '@/components/searchBar/SearchBar'

interface INeighbor {
  prev?: NeighborInfo
  next?: NeighborInfo
}

export default function PageHeader ({
  neighbors,
  id,
  name
}: {
  neighbors: INeighbor
  id: number
  name: string
}) {
  return (
    <>
      <div className='mb-7 flex justify-end'>
        <SearchBar></SearchBar>
      </div>
      <header className='mb-10 grid grid-cols-2 items-center gap-3 border-b border-(--line) pb-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-6'>
        {neighbors.prev ? (
          <Link
            href={`/pokemon/${neighbors.prev.id}`}
            aria-label='Pokémon precedente'
            className='group flex justify-self-start items-center gap-2 border border-(--line) bg-(--panel) py-2 pl-2 pr-3 transition hover:border-(--lime)'
          >
            <Image
              src={neighbors.prev.sprite}
              alt={neighbors.prev.name}
              width={36}
              height={36}
              className='size-9 shrink-0 object-contain'
            />
            <span className='hidden flex-col text-left sm:flex'>
              <span className='font-hud text-[9px] text-(--muted)'>
                N° {String(neighbors.prev.id).padStart(4, '0')}
              </span>
              <span className='truncate text-xs capitalize text-(--paper) group-hover:text-(--lime)'>
                {neighbors.prev.name}
              </span>
            </span>
            <span
              aria-hidden='true'
              className='text-(--muted) group-hover:text-(--lime)'
            >
              ←
            </span>
          </Link>
        ) : (
          <span />
        )}
        <div className='order-first col-span-2 flex min-w-0 flex-col items-center text-center sm:order-none sm:col-span-1'>
          <span className='font-hud text-[10px] uppercase tracking-widest text-(--lime)'>
            N° {String(id).padStart(4, '0')}
          </span>
          <h1 className='mt-1 text-3xl font-semibold uppercase tracking-wide text-(--paper) sm:text-4xl'>
            {name}
          </h1>
        </div>
        {neighbors.next ? (
          <Link
            href={`/pokemon/${neighbors.next.id}`}
            aria-label='Pokémon successivo'
            className='group flex justify-self-end items-center gap-2 border border-(--line) bg-(--panel) py-2 pl-3 pr-2 transition hover:border-(--lime)'
          >
            <span
              aria-hidden='true'
              className='text-(--muted) group-hover:text-(--lime)'
            >
              →
            </span>
            <span className='hidden flex-col text-right sm:flex'>
              <span className='font-hud text-[9px] text-(--muted)'>
                N° {String(neighbors.next.id).padStart(4, '0')}
              </span>
              <span className='truncate text-xs capitalize text-(--paper) group-hover:text-(--lime)'>
                {neighbors.next.name}
              </span>
            </span>
            <Image
              src={neighbors.next.sprite}
              alt={neighbors.next.name}
              width={36}
              height={36}
              className='size-9 shrink-0 object-contain'
            />
          </Link>
        ) : (
          <span />
        )}
      </header>
    </>
  )
}
