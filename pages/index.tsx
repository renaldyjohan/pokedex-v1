import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomeLanding from '../components/HomeLanding/HomeLanding';
import { useRef } from 'react';
import PokemonLists from '../components/PokemonLists/PokemonLists';

interface IGetStaticProps {
  locale:string;
}

interface IHome {
  totalPage: number;
}

const Home: NextPage<IHome> = ({}) => {
  const myRef = useRef(null);
  const scrollToRef = (ref:any) => window.scrollTo({top:ref.current.offsetTop, behavior:'smooth'});
  const handleScroll = () => scrollToRef(myRef);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomeLanding handleScroll={handleScroll} />
        <div ref={myRef}>
          <PokemonLists />
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps({ locale }:IGetStaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'details'])),
    }
  };
}

export default Home;
