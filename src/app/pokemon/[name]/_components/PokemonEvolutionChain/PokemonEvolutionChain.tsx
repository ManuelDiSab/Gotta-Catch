import { IPokemon } from '@/interfaces/IPokemon.interface'
import {
  buildEvolutionTree,
  EvolutionMethodDisplay,
  evolutionPathIncludes,
  EvolutionTreeNode
} from '@/lib/utils/evolution-tree'
import EvolutionCard from './EvolutionCard'
import { useTranslation } from '@/lib/i18n/useTranslation'

function EvolutionArrow ({
  methods,
  active
}: {
  methods: EvolutionMethodDisplay[]
  active: boolean
}) {
  const [primary, ...alternatives] = methods
  return (
    <div className='flex w-24 shrink-0 flex-col items-center gap-1 px-2 text-center sm:w-28'>
      <span
        className={`font-hud text-2xl leading-none ${
          active ? 'text-(--accent)' : 'text-(--muted)'
        }`}
        aria-hidden='true'
      >
        →
      </span>

      {/* Da migliorare per implementarlo in un prossimofuturo */}
      {/* {primary && (
        <span className='font-hud text-[10px] uppercase tracking-wide text-(--muted)'>
          {primary.label}
        </span>
      )} */}
      {/* {primary?.detail && (
        <span className='max-w-28 text-[10px] leading-tight text-(--muted)'>
          {primary.detail}
        </span>
      )}
      {alternatives.length > 0 && (
        <details className='max-w-full'>
          <summary className='cursor-pointer list-none font-hud text-[10px] uppercase tracking-wide text-(--muted) hover:text-(--accent)'>
            +{alternatives.length}{' '}
            {alternatives.length === 1 ? 'metodo' : 'metodi'}
          </summary>
          <div className='mt-1 flex flex-col gap-1 font-hud text-[10px] uppercase tracking-wide text-(--muted)'>
            {alternatives.map((method, index) => (
              <span key={`${method.label}-${index}`}>{method.label}</span>
            ))}
          </div>
        </details>
      )} */}
    </div>
  )
}

// Ogni figlio occupa una riga autonoma, per catene lineari e biforcazioni.
function EvolutionBranch ({
  node,
  currentName
}: {
  node: EvolutionTreeNode
  currentName: string
}) {
  return (
    <div className='flex min-w-max items-center'>
      <EvolutionCard node={node} isCurrent={node.name === currentName} />

      {node.children.length > 0 && (
        <div className='flex flex-col gap-5 py-2'>
          {node.children.map(child => (
            <div key={child.name} className='flex items-center'>
              <EvolutionArrow
                methods={child.methods}
                active={evolutionPathIncludes(child, currentName)}
              />
              <EvolutionBranch node={child} currentName={currentName} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PokemonEvolutionChain ({
  pokemon
}: {
  pokemon: IPokemon
}) {
  const { t } = useTranslation()

  const tree = buildEvolutionTree(pokemon.evolution_chain)
  if (!tree || tree.children.length === 0) return null

  const currentName = pokemon.name.toLowerCase()

  if (tree.name === currentName) {
    tree.types = pokemon.types
    tree.is_baby = pokemon.is_baby
  }

  return (
    <section className='border border-(--line) bg-(--panel) p-4 sm:p-6'>
      <p className='eyebrow mb-4'>{t('pokemonDetail.evolution.title')}</p>

      <div className='overflow-x-auto pb-2 scrollbar-thin'>
        <div className='flex w-max min-w-full justify-start sm:justify-center'>
          <EvolutionBranch node={tree} currentName={currentName} />
        </div>
      </div>
    </section>
  )
}
