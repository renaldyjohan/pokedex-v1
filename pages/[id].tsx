import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import { IPokemonData } from '../types/pokemon';
import DetailsContent from '../components/DetailsContent/DetailsContent';

interface IDetails {
  pokemonData: IPokemonData;
  evo: any;
}

const Details: NextPage<IDetails> = ({pokemonData, evo}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {pokemonData && <DetailsContent pokemonData={pokemonData} evo={evo} />}
      </main>
    </div>
  );
};

interface getStaticPropsProps {
  locale?:string
  params:{
    id?:string
  };
}

export async function getStaticProps({ params: {id}, locale }:getStaticPropsProps) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const result:IPokemonData = res.data;
  let res2:any = {}
  if(result && result.species) res2 = await axios.get(result?.species?.url)
  const result2 = res2.data;
  const res3:any = await axios.get(result2.evolution_chain.url);
  const result3 = res3.data;
  const pokemonData: IPokemonData={
    id: result.id,
    sprites: result.sprites,
    name: result.name,
    types: result.types,
    abilities: result.abilities,
    weight: result.weight,
    height: result.height,
    stats: result.stats,
  }

  return {
    props: {
      ...(await serverSideTranslations(locale? locale : "en" , ['common', 'home', 'details'])),
      pokemonData,
      evo: result3,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/1',
      // Object variant:
      { params: { id: '2' } },
    ],
    fallback: true,
  }
}

export default Details;
