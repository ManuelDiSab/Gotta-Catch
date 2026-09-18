import { getTypeEffectiveness } from "./typeEffectiveness"
import { colorsEn } from "./colors"


export function getTypeColor(type?: string): string {
    return colorsEn[type?.toLowerCase() ?? ''] ?? '#899195'
}

export function getContrastText(hex: string): string {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = num >> 16,
        g = (num >> 8) & 0xff,
        b = num & 0xff
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.6 ? '#1a1a1a' : '#ffffff'
}

// ---------- Colorazione dinamica in base al totale statistiche ----------
type StatTier = { label: string; color: string }

export function getStatTier(total: number): StatTier {
    if (total < 300) return { label: 'Debole', color: 'var(--coral)' }
    if (total < 450) return { label: 'Nella media', color: '#f5b942' }
    if (total < 580) return { label: 'Forte', color: 'var(--lime)' }
    return { label: 'Eccezionale', color: '#a78bfa' }
}



// ---------- Range statistiche a livello 100 (IV/EV/natura min e max) ----------
export function getHpRange(base: number) {
    return { min: 2 * base + 110, max: 2 * base + 204 }
}

export function getStatRange(base: number) {
    const min = Math.floor((2 * base + 5) * 0.9)
    const max = Math.floor((2 * base + 99) * 1.1)
    return { min, max }
}


export function formatSlug(slug: string): string {
    return slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
}

// ---------- Parsing catena evolutiva (shape del backend: lista piatta di nodi, eventualmente ramificata) ----------
import { Generation, IEvolutionChain, IEvolutionNode } from "../../interfaces/IPokemon.interface"

export interface EvolutionTreeNode {
    name: string
    sprite: string | null
    types: string[]
    is_baby: boolean
    children: EvolutionTreeNode[]
}

export const toRomanNumeral = (generation: Generation) =>
    generation.replace('generation-', '').toUpperCase()



// Ricostruisce l'albero evolutivo completo a partire dai nodi piatti base_form -> evolved_form,
// supportando anche evoluzioni ramificate (es. Eevee con più evoluzioni possibili).
export function buildEvolutionTree(
    chain: IEvolutionChain | null | undefined
): EvolutionTreeNode | null {
    const nodes = chain?.evolves_to
    if (!nodes || nodes.length === 0) return null

    const childrenByBaseForm = new Map<string, IEvolutionNode[]>()
    const evolvedForms = new Set<string>()
    for (const node of nodes) {
        if (!node.base_form || !node.evolved_form) continue
        const siblings = childrenByBaseForm.get(node.base_form) ?? []
        siblings.push(node)
        childrenByBaseForm.set(node.base_form, siblings)
        evolvedForms.add(node.evolved_form)
    }

    const rootNode = nodes.find(
        node => node.base_form && !evolvedForms.has(node.base_form)
    )
    const rootName = rootNode?.base_form
    if (!rootName) return null

    function build(node: IEvolutionNode | null, name: string, sprite: string | null): EvolutionTreeNode {
        const children = (childrenByBaseForm.get(name) ?? []).map(childNode =>
            build(childNode, childNode.evolved_form!, childNode.sprite ?? null)
        )
        return {
            name,
            sprite,
            // La forma base non ha un proprio nodo nella catena, quindi non conosciamo i suoi tipi/is_baby da qui
            types: node?.types ?? [],
            is_baby: node?.is_baby ?? false,
            children
        }
    }

    return build(null, rootName, rootNode?.base_form_sprite ?? null)
}