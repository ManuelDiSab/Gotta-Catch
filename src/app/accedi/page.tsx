import Link from 'next/link'
import { SiteHeader } from '../../components/SiteHeader'
// In  futuro
export default function LoginPage () {
  return (
    <main className='min-h-screen bg-(--ink) text-(--paper)'>
      <SiteHeader />
      <section className='mx-auto min-h-155 max-w-190 px-10 py-32.5 max-[800px]:min-h-137.5 max-[800px]:px-5 max-[800px]:py-[90px]'>
        <div className='text-[10px] font-semibold uppercase tracking-[.18em] text-(--lime)'>
          <span className='mr-2 inline-block size-1.5 rounded-full bg-(--coral)' />
          Trainer access
        </div>
        <h1 className='my-7 text-[clamp(52px,7vw,92px)] font-medium leading-[.91] tracking-[-.09em]'>
          Your private
          <br />
          <span className='font-serif italic font-normal text-[var(--lime)]'>
            field notes.
          </span>
        </h1>
        <p className='mb-8 max-w-[470px] font-serif text-lg leading-[1.6] text-[var(--muted)]'>
          L&apos;area privata è in preparazione. Qui potrai salvare i tuoi
          Pokémon, creare squadre e tenere traccia delle tue sessioni.
        </p>
        <Link
          className='inline-flex items-center gap-6 bg-[var(--lime)] px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[.1em] text-[var(--ink)]'
          href='/pokedex'
        >
          Back to the guide <span>↗</span>
        </Link>
      </section>
    </main>
  )
}
