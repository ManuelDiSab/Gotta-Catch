import Link from 'next/link'
import Image from 'next/image'
import { EvolutionTreeNode } from '@/lib/utils/evolution-tree'

export default function EvolutionCard ({
  node,
  isCurrent
}: {
  node: EvolutionTreeNode
  isCurrent: boolean
}) {
  const spriteSize = 64

  const content = (
    <>
      <div
        className='flex items-center justify-center'
        style={{ width: spriteSize + 20, height: spriteSize + 20 }}
      >
        {node.sprite ? (
          <Image
            src={node.sprite}
            alt={node.name}
            width={spriteSize}
            height={spriteSize}
            className='object-contain '
          />
        ) : (
          <span className='font-hud text-[9px] text-(--muted)'>?</span>
        )}
      </div>

      <span
        className={[
          'text-sm capitalize',
          isCurrent ? 'font-semibold text-(--paper)' : 'text-(--muted)'
        ].join(' ')}
      >
        {node.name}
      </span>

      {isCurrent && (
        <span
          className='h-1.5 w-1.5 rounded-full bg-(--accent) motion-safe:animate-pulse'
          aria-label='Pokemon corrente'
        />
      )}
    </>
  )

  const className = [
    'evolution-card flex min-h-30 w-28 shrink-0 flex-col items-center justify-center gap-1.5  px-2 py-2 transition-colors sm:w-32',
    isCurrent
      ? 'cursor-default border-(--accent)'
      : 'border-(--line) hover:border-(--lime) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--lime)'
  ].join(' ')

  if (isCurrent) {
    return <div className={className}>{content}</div>
  }

  return (
    <Link href={`/pokemon/${node.name}`} className={className}>
      {content}
    </Link>
  )
}
