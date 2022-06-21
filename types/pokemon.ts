type pokemonType =
  'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water'
;


interface IPokemonType {
  slot: number;
  type: {
    name: pokemonType;
    url: string;
  };
}

interface IPokemonAbilities {
  ability:{
    name: string;
    url: string;
  }
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonData {
  id: number;
  sprites: any;
  name: string;
  types?: IPokemonType[];
  abilities?: IPokemonAbilities[];
  weight?: number;
  height?: number;
  stats?:{
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
  }[];
  species?: {
    name:string;
    url:string
  }
}

export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonList {
  count: number;
  next?: string;
  previous?: string;
  getPokemonData:void;
  results?: IPokemon[];
}

