// Costruisce l'albero evolutivo a partire da IPokemon.evolution_chain.
//
// Il backend salva la catena come lista di ARCHI (evolves_to), non come albero annidato:
// ogni arco ha base_form (genitore) ed evolved_form (figlio), e porta con sé TUTTI i metodi
// alternativi per compiere quello specifico step (methods[]), oltre allo sprite della forma
// base (base_form_sprite) e di quella evoluta (sprite).
//
// Questo file ricostruisce l'albero e traduce i metodi grezzi dell'API in etichette leggibili.

import { IEvolutionChain, IEvolutionMethod } from '@/interfaces/IPokemon.interface'

export type EvolutionMethodDisplay = {
    label: string
    detail?: string
}

export type EvolutionTreeNode = {
    name: string
    sprite: string
    types: string[]
    is_baby: boolean
    methods: EvolutionMethodDisplay[]
    children: EvolutionTreeNode[]
}

const GENDER_LABEL: Record<number, string> = { 1: 'femmina', 2: 'maschio' }

function humanize(value: string): string {
    return value.replace(/-/g, ' ')
}

// Traduce un singolo metodo grezzo in un'etichetta primaria + dettagli secondari.
// L'etichetta primaria è sempre il "come" (livello, oggetto, scambio...), i dettagli
// sono le condizioni aggiuntive (orario, luogo, amicizia...) mostrate in piccolo sotto.
function describeMethod(method: IEvolutionMethod): EvolutionMethodDisplay {
    let label: string

    switch (method.trigger) {
        case 'level-up':
            label = method.min_level ? `Livello ${method.min_level}` : 'Salendo di livello'
            break
        case 'trade':
            label = method.trade_species ? `Scambio con ${humanize(method.trade_species)}` : 'Scambio'
            break
        case 'use-item':
            label = method.held_item ? `Usa ${humanize(method.held_item)}` : 'Usa un oggetto'
            break
        case 'shed':
            label = 'Muta'
            break
        case 'spin':
            label = 'Rotazione'
            break
        case 'tower-of-darkness':
            label = 'Torre dell\u2019Oscurità'
            break
        case 'tower-of-waters':
            label = 'Torre delle Acque'
            break
        case 'three-critical-hits':
            label = '3 colpi critici in lotta'
            break
        case 'take-damage':
            label = 'Subisce danno'
            break
        case 'other':
            label = 'Metodo speciale'
            break
        default:
            label = humanize(method.trigger)
    }

    const conditions: string[] = []
    if (method.min_happiness) conditions.push('amicizia alta')
    if (method.min_beauty) conditions.push('bellezza alta')
    if (method.min_affection) conditions.push('affetto alto')
    if (method.time_of_day === 'day') conditions.push('di giorno')
    if (method.time_of_day === 'night') conditions.push('di notte')
    if (method.known_move) conditions.push(`conosce ${humanize(method.known_move)}`)
    if (method.known_move_type) conditions.push(`mossa di tipo ${humanize(method.known_move_type)}`)
    if (method.location) conditions.push(`a ${humanize(method.location)}`)
    if (method.region) conditions.push(`regione ${humanize(method.region)}`)
    if (method.party_species) conditions.push(`con ${humanize(method.party_species)} nel gruppo`)
    if (method.party_type) conditions.push(`con un tipo ${humanize(method.party_type)} nel gruppo`)
    if (method.relative_physical_stats === 1) conditions.push('attacco > difesa')
    if (method.relative_physical_stats === -1) conditions.push('difesa > attacco')
    if (method.relative_physical_stats === 0) conditions.push('attacco = difesa')
    if (method.gender && GENDER_LABEL[method.gender]) conditions.push(GENDER_LABEL[method.gender])
    if (method.turn_upside_down) conditions.push('console capovolta')
    if (method.needs_overworld_rain) conditions.push('sotto la pioggia')
    if (method.needs_multiplayer) conditions.push('multiplayer attivo')
    if (method.min_move_count) conditions.push(`${method.min_move_count}+ mosse apprese`)
    if (method.min_steps) conditions.push(`${method.min_steps}+ passi`)
    if (method.min_damage_taken) conditions.push(`${method.min_damage_taken}+ danni subiti`)

    return {
        label,
        detail: conditions.length > 0 ? conditions.join(', ') : undefined
    }
}

export function buildEvolutionTree(chain: IEvolutionChain | null | undefined): EvolutionTreeNode | null {
    if (!chain) return null
    if (!chain.evolves_to || chain.evolves_to.length === 0) return null

    // La forma base è quella il cui nome non compare mai come evolved_form di un altro arco.
    const rootName = chain.evolves_to.find((edge) =>
        !chain.evolves_to.some((other) => other.evolved_form === edge.base_form)
    )?.base_form

    if (!rootName) return null

    const rootSprite = chain.evolves_to.find((edge) => edge.base_form === rootName)?.base_form_sprite ?? ''

    const nodesByName = new Map<string, EvolutionTreeNode>()
    nodesByName.set(rootName, {
        name: rootName,
        sprite: rootSprite,
        // La forma base non porta con sé tipi/is_baby nella catena: se è il pokemon che si sta
        // visualizzando, il componente li sovrascrive con i dati reali del pokemon corrente.
        types: [],
        is_baby: false,
        methods: [],
        children: []
    })

    for (const edge of chain.evolves_to) {
        if (!nodesByName.has(edge.name)) {
            nodesByName.set(edge.name, {
                name: edge.name,
                sprite: edge.sprite,
                types: edge.types,
                is_baby: edge.is_baby,
                methods: edge.methods.map(describeMethod),
                children: []
            })
        }
    }

    for (const edge of chain.evolves_to) {
        const node = nodesByName.get(edge.name)
        const parent = edge.base_form ? nodesByName.get(edge.base_form) : undefined
        if (node && parent && !parent.children.includes(node)) {
            parent.children.push(node)
        }
    }

    return nodesByName.get(rootName) ?? null
}

// Vero se `name` è il nodo stesso o un suo discendente: usato per capire se un ramo
// dell'albero fa parte del percorso che porta al pokemon attualmente visualizzato.
export function evolutionPathIncludes(node: EvolutionTreeNode, name: string): boolean {
    if (node.name === name) return true
    return node.children.some((child) => evolutionPathIncludes(child, name))
}