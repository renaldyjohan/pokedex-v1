import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axios from 'axios';
import { IPokemonList } from "../types/pokemon";


type pageContextType = {
    page: number;
    perPage: number;
    setPage?: Dispatch<SetStateAction<number>>;
    setPerPage?: Dispatch<SetStateAction<number>>;
    pokemonLists?: IPokemonList;
};

const pageContextDefaultValues: pageContextType = {
    page: 1,
    perPage: 9,
};

const PageContext = createContext<pageContextType>(pageContextDefaultValues);

export function usePage() {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(9)
    const [pokemonLists, setPokemonLists] = useState<IPokemonList | undefined>(undefined)

    const getPokemonLists = async () => {
      const results =  await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page-1)*perPage}&limit=${perPage}`);
      const data: IPokemonList = results.data;
      setPokemonLists(data)
    }

    const getPokemonData = async (url:string) => {
      const results =  await axios.get(url);
      const data = results.data;
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
