import React from 'react';
import styles from './PokemonLists.module.scss'
import { Pagination, Typography } from '@mui/material';
import { usePage } from '../../context/PageContext';
import PokemonCard from '../PokemonCard/PokemonCard';

interface PokemonListsProps {
}

const PokemonLists: React.FC<PokemonListsProps> = ({
}) => {
  const {page, setPage, perPage, pokemonLists} = usePage()

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ListWrapper}>
        {pokemonLists?.results?.map((pokemon)=> <PokemonCard url={pokemon.url} key={pokemon.url} />)}
      </div>
      {
        pokemonLists &&
        <div>
          <Pagination
            shape='rounded'
            variant='outlined'
            count={Math.ceil(pokemonLists.count/perPage)}
            showFirstButton
            showLastButton
            page={page}
            onChange={(e) => setPage(parseInt((e.target as HTMLButtonElement).textContent ?? "1"))}
          />
          <Typography>Total Data:{pokemonLists?.count}</Typography>
        </div>
      }
    </div>
  );
}

export default PokemonLists;
