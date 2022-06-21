import React from 'react';
import styles from './PokemonLists.module.scss';
import { MenuItem, Pagination, Select, Typography } from '@mui/material';
import { usePage } from '../../context/PageContext';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useTranslation } from 'next-i18next';

interface PokemonListsProps {
}

const PokemonLists: React.FC<PokemonListsProps> = ({
}) => {
  const {page, setPage, setPerPage, perPage, pokemonLists} = usePage();
  const { t } = useTranslation('home');

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TopCircle}>
        <div className={styles.Inner} />
        <div className={styles.Outer} />
      </div>
      <div className={styles.BotCircle}>
        <div className={styles.Inner} />
        <div className={styles.Outer} />
      </div>
      <div className={styles.Header}>
        <div>
          PokèDex
        </div>
        <div className={styles.Subheader}>
          {t('ALL_GENERATION')}
        </div>
        <div className={styles.Subheader}>
          {`${pokemonLists?.count} Pokemon`}
        </div>
      </div>
      <div className={styles.ListWrapper}>
        {pokemonLists?.results?.map((pokemon)=> <PokemonCard url={pokemon.url} key={pokemon.url} />)}
      </div>
      {
        pokemonLists &&
        <div className={styles.PaginationWrapper}>
          <Typography>Per Page:</Typography>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={perPage}
            onChange={(e) => {
              if (typeof e.target.value === 'number') return setPerPage(e.target.value);
              return setPerPage(parseInt(e.target.value));
            }}
            autoWidth
            label="Age"
            className={styles.Select}
          >
            <MenuItem value={9}>
              <em>9</em>
            </MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={99}>99</MenuItem>
          </Select>
          <Pagination
            shape='rounded'
            variant='outlined'
            count={Math.ceil(pokemonLists.count/perPage)}
            showFirstButton
            showLastButton
            className={styles.Pagination}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
          <Typography>Total Data:{pokemonLists?.count}</Typography>
        </div>
      }
    </div>
  );
};

export default PokemonLists;
