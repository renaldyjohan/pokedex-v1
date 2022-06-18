import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomeLanding from '../../components/HomeLanding/HomeLanding'
import { useRef } from 'react'

const Home: NextPage = () => {
  const myRef = useRef(null)
  const scrollToRef = (ref:any) => window.scrollTo({top:ref.current.offsetTop, behavior:'smooth'})

  const handleScroll = () => scrollToRef(myRef)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomeLanding handleScroll={handleScroll} />
        <div style={{height: 2000}} ref={myRef}></div>
      </main>
    </div>
  )
}

interface getStaticPropsProps {
  locale:string;
}

export async function getStaticProps({ locale }:getStaticPropsProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','home'])),
      // Will be passed to the page component as props
    },
  };
}

export default Home
