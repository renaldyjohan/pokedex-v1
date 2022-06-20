import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axios from 'axios';

export interface pokemonProps {
    name: string;
    url: string;
}

export interface pokemonListProps {
  count: number;
  next?: string;
  previous?: string;
  getPokemonData:void;
  results?: pokemonProps[];
}

export interface getPokemonListsProps {
    data: pokemonListProps;
}

type pageContextType = {
    page: number;
    perPage: number;
    setPage?: Dispatch<SetStateAction<number>>;
    setPerPage?: Dispatch<SetStateAction<number>>;
    pokemonLists?: pokemonListProps;
};

const pageContextDefaultValues: pageContextType = {
    page: 1,
    perPage: 9,
};

const PageContext = createContext<pageContextType>(pageContextDefaultValues);

export function usePage() {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(9)
    const [pokemonLists, setPokemonLists] = useState<pokemonListProps | undefined>(undefined)

    const getPokemonLists = async () => {
      const results =  await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page-1)*9}&limit=${9}`);
      const data: pokemonListProps = results.data;
      setPokemonLists(data)
    }

    const getPokemonData = async (url:string) => {
      const results =  await axios.get(url);
      const data = results.data;
      console.log(data)
      return data;
    }

    useEffect(() => {
      getPokemonLists()
    }, [page, perPage])

    return {
        page,
        setPage,
        perPage,
        setPerPage,
        pokemonLists,
        getPokemonData,
    };
}

type Props = {
    children: ReactNode;
};

export function PageProvider({ children }: Props) {
    return (
        <>
            <PageContext.Provider value={usePage()}>
                {children}
            </PageContext.Provider>
        </>
    );
}
