import mongoose, { Schema } from "mongoose";
import { Generation } from "../interfaces/IPokemon.interface";


const nameSchema = new Schema({
    language: { type: String, enum: ["it", "en"], required: true },
    text: { type: String, required: true },
}, { _id: false });

const statsSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    effort: { type: Number, required: true },
    base_stat: { type: Number, required: true },
}, { _id: false });

// Un singolo metodo per raggiungere una data evoluzione (livello, pietra, scambio, felicità...).
// Un'evoluzione può avere più metodi alternativi (es. Leafeon in foreste diverse), quindi
// questo schema vive dentro l'array `methods` di evolutionSchema, non a livello di evoluzione.
const evolutionMethodSchema = new Schema({
    trigger: { type: String, required: true },
    gender: { type: Number, default: null },
    held_item: { type: String, default: null },
    known_move: { type: String, default: null },
    known_move_type: { type: String, default: null },
    location: { type: String, default: null },
    min_level: { type: Number, default: null },
    min_happiness: { type: Number, default: null },
    min_beauty: { type: Number, default: null },
    min_affection: { type: Number, default: null },
    needs_multiplayer: { type: Boolean, default: false },
    needs_overworld_rain: { type: Boolean, default: false },
    party_species: { type: String, default: null },
    party_type: { type: String, default: null },
    relative_physical_stats: { type: Number, default: null },
    time_of_day: { type: String, default: "" },
    trade_species: { type: String, default: null },
    turn_upside_down: { type: Boolean, default: false },
    region: { type: String, default: null },
    used_move: { type: String, default: null },
    min_move_count: { type: Number, default: null },
    min_steps: { type: Number, default: null },
    min_damage_taken: { type: Number, default: null },
}, { _id: false });

// Un nodo per ogni pokemon dell'evoluzione (una entry per pokemon, non una per metodo).
// base_form_sprite permette al frontend di mostrare l'immagine della forma di partenza
// senza dover recuperare un altro documento pokemon.
const evolutionSchema = new Schema({
    name: { type: String, required: true },
    sprite: { type: String, required: true },
    base_form: { type: String, default: null },
    base_form_sprite: { type: String, default: "" },
    evolved_form: { type: String, default: null },
    types: { type: [String], default: [] },
    is_baby: { type: Boolean, required: true },
    methods: { type: [evolutionMethodSchema], default: [] },
}, { _id: false });

const evolutionChainSchema = new Schema({
    id: { type: Number, required: true },
    baby_trigger_item: { type: String, default: null },
    evolves_to: { type: [evolutionSchema], default: [] },
}, { _id: false });

const pokemonSchema = new Schema({
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, unique: true, index: true },
    order: { type: Number, default: null },
    generation: { type: String, required: true, enum: ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii', 'generation-ix'] },
    types: { type: [String], default: [] },
    abilities: { type: [String], default: [] },
    cries: { type: [String], default: [] },
    forms: { type: [String], default: [] },
    sprites: { type: [String], default: [] },
    flavorText: { type: [nameSchema], default: [] },
    stats: { type: [statsSchema], default: [] },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    is_default: { type: Boolean, required: true },
    base_experience: { type: Number, default: null },
    capture_rate: { type: Number, required: true },
    base_happiness: { type: Number, default: null },
    is_baby: { type: Boolean, required: true },
    is_legendary: { type: Boolean, required: true },
    is_mythical: { type: Boolean, required: true },
    hatch_counter: { type: Number, default: null },
    has_gender_differences: { type: Boolean, required: true },
    forms_switchable: { type: Boolean, required: true },
    evolution_chain: { type: evolutionChainSchema, default: null },
    genera: { type: [nameSchema], default: [] },
}, { timestamps: true, });

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
    evolution_chain?: Record<string, unknown> | null;
    genera: Array<{ language: "it" | "en"; text: string }>;
}


const Pokemon = mongoose.models.Pokemon || mongoose.model<IPokemon>("Pokemon", pokemonSchema);

export default Pokemon;