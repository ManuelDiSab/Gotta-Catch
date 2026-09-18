// en.ts
export const en = {
    header: {
        nav: { home: 'Home', pokedex: 'Pokedex', game: 'Mini-game' },
        menuAriaOpen: 'Open menu',
        menuAriaClose: 'Close menu',
        menuKicker: 'Navigation',
        footerBrand: 'GOTTA CATCH',
    },
    footer: {
        disclaimer: `This is a non-profit, unofficial, fan-made project. Pokémon, character names, and all related trademarks are the exclusive property of Nintendo, The Pokémon Company, Game Freak, and Creatures Inc. No copyright infringement is intended..`,
        createdBy: "Created by "
    },
    filters: {
        title: 'Filters',
        rarity: ' Rarity',
        all: 'All species',
        legendary: 'Legendary',
        mythical: 'Mythical',
        types: 'Types',
        reset: 'Reset',
        apply: 'Apply filters',
        chooseUp: 'Choose up to 2',
        generations: 'Generations',
        sortBy: 'Sort by',
        orderResults: 'Order of results',
        numAsc: 'Numeric - ascending',
        numDesc: 'Numeric - descending',
        alphAsc: 'Name - A -> Z',
        alphDesc: 'Name - Z -> A'
    },
    search: {
        placeholder: 'Search a Pokemon...',
        ariaLabel: 'Search a Pokemon',
        clearAriaLabel: 'Clear search',
        noResults: 'No results',
        search: 'Search',

    },
    error: { generic: 'Something went wrong' },
    home: {
        exploreCollection: 'Explore collection',
        playRound: 'Play a round',
        kicker: 'Field log / Featured species',
        featuredTitle: 'Pokémon of the day',
        featuredError: 'The featured species signal could not be received.',
        retry: 'Retry scan',
        height: 'Height',
        weight: 'Weight',
        generation: 'Generation',
        openProfile: 'Open profile',
        pokedexCtaTitle: 'Pokédex archive',
        pokedexCtaDescription: 'Browse every species and filter the database by type, generation, or rarity.',
        gameCtaTitle: 'Who\'s that Pokémon?',
        gameCtaDescription: 'Put your Trainer eye to the test. New challenges are on their way.',
        comingSoon: 'Under construction',
        loading: 'Loading Pokémon...',
        noResults: 'No field notes match that search.',
        loadMore: 'Load more pokemon',
        loadingMore: 'Loading...',
        backToTopAriaLabel: 'Back to top',
        comingSoonTitle: 'The hero section',
        comingSoonTitleAccent: 'is coming soon.',
        comingSoonDescription: 'In the meantime, explore the full Pokedex.',
        goToPokedex: 'Go to Pokedex'
    },
    pokedex: {
        species: 'species found'
    },
    game: {
        comingSoonKicker: 'Game / under construction',
        comingSoonTitle: 'The Mini game ',
        comingSoonTitleAccent: 'is coming soon.',
        comingSoonDescription: 'In the meantime, explore the full Pokedex.',
        goToPokedex: 'Go to Pokedex'

    },
    pokemonDetail: {
        intro: {
            text1: " it's a pokemon of type ",
            text2: ' introduced in the generation {generation}'
        },
        info: {
            sound: 'Play sound',
            mainInfo: 'Main info',
            types: 'Types',
            species: 'Species',
            generation: 'Generation',
            ability: 'Abilities',
            details: 'Details',
            height: 'Height',
            weight: 'Weight',
            exp: 'Base Exp.',
            happyness: 'Base happyness',
            capture: 'Capture rate',
            cycle: 'Hatching cycle',
        },
        stats: {
            title: 'Base stats',
            statName: 'Stat name',
            hp: 'hp',
            attack: 'attack',
            defense: 'defense',
            'special-attack': 'sp. attack',
            'special-defense': 'sp. defense',
            speed: 'speed',
            total: 'total',
            disclaimer: 'Min/Max values ​​calculated at level 100 with unfavorable and favorable Nature, IVs, and EVs, respectively'
        },
        weaknesses: {
            title: 'weaknesses and resistances',
            none: 'None',
            rows: {
                quadruple: 'Weaknesses 4x',
                double: 'Weaknesses 2x',
                normal: 'Normal 1x',
                half: 'Resistances ½x',
                quarter: 'Resistances ¼x',
                immune: 'Immunities 0x',
            }
        },
        // Da fare la catena evolutiva
        evolution: {
            title: 'evolution chain',
            friendly: 'High friendship',
            beauty: 'high beauty',
            affection: 'affection ',
            day: 'during day',
            night: 'during night',
            move: 'learning {move}',

        }
    },
    types: {
        electric: 'electric',
        fighting: 'fighting',
        grass: 'grass',
        ice: 'ice',
        dark: 'dark',
        poison: 'poison',
        water: 'water',
        fire: 'fire',
        flying: 'flying',
        dragon: 'dragon',
        ghost: 'ghost',
        bug: 'bug',
        normal: 'normal',
        fairy: 'fairy',
        psychic: 'psychic',
        steel: 'steel',
        ground: 'ground',
        rock: 'rock',
    }
}