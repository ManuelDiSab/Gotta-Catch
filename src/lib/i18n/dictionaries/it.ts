// it.ts
export const it = {
    header: {
        nav: { home: 'Home', pokedex: 'Pokedex', game: 'Mini-game' },
        menuAriaOpen: 'Apri menu',
        menuAriaClose: 'Chiudi menu',
        menuKicker: 'Navigazione ',
        footerBrand: 'GOTTA CATCH',
    },
    footer: {
        disclaimer: `Questo è un progetto amatoriale e non ufficiale senza scopo di
            lucro.Pokemon, i nomi dei personaggi e tutti i relativi marchi sono
            di proprietà esclusiva di Nintendo, The Pokemon Company, Game Freak
            e Creatures Inc.Nessuna violazione del copyright intesa.`,
        createdBy: "Creato da "
    },
    filters: {
        title: 'Filtri',
        rarity: ' Rarità',
        all: 'Tutti',
        legendary: 'Leggendari',
        mythical: 'Mitici',
        types: 'Tipi',
        reset: 'Reset',
        apply: 'Applica filtri',
        chooseUp: 'Scegline fino a 2',
        generations: 'Generazioni',
        sortBy: 'Ordina per',
        orderResults: 'Ordinde dei risultati',
        numAsc: 'Numerico - crescente',
        numDesc: 'Numerico - decrescente',
        alphAsc: 'Alfabetico - A -> Z',
        alphDesc: 'Alfabetico - Z -> A'
    },
    search: {
        placeholder: 'Cerca un Pokémon...',
        ariaLabel: 'Cerca un Pokémon',
        clearAriaLabel: 'Cancella ricerca',
        noResults: 'Nessun risultato',
        search: 'Cerca'
    },
    error: { generic: 'Si è verificato un errore' },
    home: {

        kicker: 'Registro di campo / Specie in evidenza',
        featuredTitle: 'Pokémon del giorno',
        featuredError: 'Impossibile ricevere il segnale della specie in evidenza.',
        retry: 'Riprova scansione',
        height: 'Altezza',
        weight: 'Peso',
        generation: 'Generazione',
        openProfile: 'Apri scheda',
        pokedexCtaTitle: 'Archivio Pokédex',
        pokedexCtaDescription: 'Consulta tutte le specie e filtra il database per tipo, generazione o rarità.',
        gameCtaTitle: 'Who\'s that Pokémon?',
        gameCtaDescription: 'Metti alla prova il tuo occhio da Allenatore. Nuove sfide sono in arrivo.',
        comingSoon: 'In costruzione',
        loading: 'Caricamento Pokémon...',
        noResults: 'Nessun risultato per questa ricerca.',
        loadMore: 'Carica altri pokemon',
        loadingMore: 'Caricamento...',
        backToTopAriaLabel: 'Torna in cima',

    },
    pokedex: {
        species: 'specie trovate'
    },
    game: {
        comingSoonKicker: 'Game / in costruzione',
        comingSoonTitle: 'Il mini gioco',
        comingSoonTitleAccent: 'arriverà presto.',
        comingSoonDescription: 'Nel frattempo esplora il Pokedex completo.',
        goToPokedex: 'Vai al Pokedex'
    },
    pokemonDetail: {
        intro: {
            text1: " è un pokemon di tipo ",
            text2: 'introdotto nella generazione {generation}'
        },
        info: {
            sound: 'Riproduci verso',
            mainInfo: 'Info principali',
            types: 'Tipi',
            species: 'Specie',
            generation: 'Generazione',
            ability: 'Abilità',
            details: 'Dettagli',
            height: 'Altezza ',
            weight: 'Peso',
            exp: 'Exp. base',
            happyness: 'Felictà base',
            capture: 'Tasso di cattura',
            cycle: 'Ciclo di schiusa',
        },
        stats: {
            title: 'Statistiche base',
            statName: 'Statistica',
            hp: 'ps',
            attack: 'attacco',
            defense: 'difesa',
            'special-attack': 'Att. speciale',
            'special-defense': 'Dif. speciale',
            speed: 'Velocità',
            total: 'totale',
            disclaimer: 'Min/Max calcolati a livello 100 con natura, IV ed EV rispettivamente sfavorevoli e favorevoli'
        },
        weaknesses: {
            title: 'Debolezze e resistenze',
            none: 'Nessuna',
            rows: {
                quadruple: 'Debolezze 4x',
                double: 'Debolezze 2x',
                normal: 'Normale 1x',
                half: 'Resistanze ½x',
                quarter: 'Resistanze ¼x',
                immune: 'Immunità 0x',
            }
        },
        // Da fare la catena evolutiva
        evolution: {
            title: 'catena evolutiva',
            friendly: 'High friendship',
            beauty: 'high beauty',
            affection: 'affection ',
            day: 'during day',
            night: 'during night',
            move: 'learning {move}',

        }
    },
    types: {
        electric: 'elettrico',
        fighting: 'lotta',
        grass: 'erba',
        ice: 'ghiaccio',
        dark: 'buio',
        poison: 'veleno',
        water: 'acqua',
        fire: 'fuoco',
        flying: 'volante',
        dragon: 'drago',
        ghost: 'spettro',
        bug: 'coleottero',
        normal: 'normale',
        fairy: 'folletto',
        psychic: 'psichico',
        steel: 'acciaio',
        ground: 'terra',
        rock: 'roccia',
    }
}