export type Generation = 'generation-i' | 'generation-ii' | 'generation-iii' | 'generation-iv' | 'generation-v' | 'generation-vi' | 'generation-vii' | 'generation-viii' | 'generation-ix'

// Un singolo metodo per raggiungere un'evoluzione (livello, pietra, scambio, felicità...).
// Un'evoluzione può avere più metodi alternativi (es. Leafeon in foreste diverse).
export interface IEvolutionMethod {
    trigger: string;
    gender: number | null;
    held_item: string | null;
    known_move: string | null;
    known_move_type: string | null;
    location: string | null;
    min_level: number | null;
    min_happiness: number | null;
    min_beauty: number | null;
    min_affection: number | null;
    needs_multiplayer: boolean;
    needs_overworld_rain: boolean;
    party_species: string | null;
    party_type: string | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: string | null;
    turn_upside_down: boolean;
    region: string | null;
    used_move: string | null;
    min_move_count: number | null;
    min_steps: number | null;
    min_damage_taken: number | null;
}

// Un nodo per ogni pokemon evoluto: la catena è una lista piatta di questi nodi,
// collegati tra loro tramite base_form/evolved_form (permette anche evoluzioni ramificate, es. Eevee).
export interface IEvolutionNode {
    name: string;
    sprite: string;
    base_form: string | null;
    base_form_sprite: string;
    evolved_form: string | null;
    types: string[];
    is_baby: boolean;
    methods: IEvolutionMethod[];
}

export interface IEvolutionChain {
    id: number;
    baby_trigger_item: string | null;
    evolves_to: IEvolutionNode[];
}

export interface IPokemon {
    id: number;
    generation: Generation
    name: string;
    order?: number | null;
    types: string[];
    abilities: string[];
    cries: string[];
    forms: string[];
    sprites: string[];
    flavorText: Array<{ language: "it" | "en"; text: string }>;
    stats: Array<{ url: string; name: string; effort: number; base_stat: number }>;
    height: number;
    weight: number;
    is_default: boolean;
    base_experience?: number | null;
    capture_rate: number;
    base_happiness?: number | null;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter?: number | null;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    evolution_chain?: IEvolutionChain | null;
    genera: Array<{ language: "it" | "en"; text: string }>;
}

export interface IPokemonCard {
    id: number
    name: string
    types: string[]
    genera: Array<{ language: "it" | "en"; text: string }>;
    sprites: string[]
}