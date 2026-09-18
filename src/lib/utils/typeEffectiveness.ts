// File di utility per assegnare l'efficacia ai tipi in base al tipo (o alla combianzione di due tipi) del pokemon

// Tabella standard delle efficacie di tipo (attaccante -> difensore).
// Le combinazioni non presenti valgono 1 (danno normale).
const TYPE_CHART: Record<string, Partial<Record<string, number>>> = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
    grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
    ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
    fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
    poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
    ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
    flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
    bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
    ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
    steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
    fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
}

export const ALL_TYPES = Object.keys(TYPE_CHART)

export interface TypeEffectivenessGroups {
    quadruple: string[]
    double: string[]
    normal: string[]
    half: string[]
    quarter: string[]
    immune: string[]
}

// Calcola, per ogni tipo attaccante, il moltiplicatore totale contro la combinazione di tipi del difensore
export function getTypeEffectiveness(defenderTypes: string[]): TypeEffectivenessGroups {
    const groups: TypeEffectivenessGroups = {
        quadruple: [],
        double: [],
        normal: [],
        half: [],
        quarter: [],
        immune: []
    }

    for (const attackType of ALL_TYPES) {
        const multiplier = defenderTypes.reduce((total, defType) => {
            const factor = TYPE_CHART[attackType]?.[defType.toLowerCase()] ?? 1
            return total * factor
        }, 1)

        if (multiplier === 0) groups.immune.push(attackType)
        else if (multiplier === 4) groups.quadruple.push(attackType)
        else if (multiplier === 2) groups.double.push(attackType)
        else if (multiplier === 1) groups.normal.push(attackType)
        else if (multiplier === 0.5) groups.half.push(attackType)
        else if (multiplier === 0.25) groups.quarter.push(attackType)
    }

    return groups
}
