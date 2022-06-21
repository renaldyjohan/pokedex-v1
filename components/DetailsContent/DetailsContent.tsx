import styles from './DetailsContent.module.scss';
import { IPokemonData } from '../../types/pokemon';
import { getDisplayName } from '../../utility/common';
import lightThemeOptions from '../../styles/theme/lightTheme';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import DetailsEvo from './DetailsEvo';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IDetailsContent {
  pokemonData: IPokemonData;
  evo: any;
}

const DetailsContent: React.FC<IDetailsContent> = ({pokemonData, evo}) => {
  const { t } = useTranslation(['details'])
  const getImages:any = () => {
    let newData = {...pokemonData.sprites}
    Object.keys(newData).forEach(key => {
      if (typeof newData[key] !== "string" ) {
        delete newData[key];
      }
    });
    return Object.values(newData);
  }

  const [chain, setChain] = useState<any[]>([])

  useEffect(()=> {
    let newData=[]
    const {chain} = evo;
    newData.push(chain.species)
    if(chain.evolves_to.length>0) {
      newData.push(chain.evolves_to[0].species)
      if(chain.evolves_to[0].evolves_to.length>0) {
        newData.push(chain.evolves_to[0].evolves_to[0].species)
        if(chain.evolves_to[0].evolves_to[0].evolves_to.length>0) {
          newData.push(chain.evolves_to[0].evolves_to[0].evolves_to[0].species)
        }
      }
    }
    setChain(newData);
  },[evo])

  const getStatus = (status:any) => {
    return (
      <div className={styles.Status}>
        <div className={styles[status.stat.name]}>
          <div className={styles.StatusItem}>
            <div>
              {status.base_stat}
            </div>
            <div className={styles.StatusText}>
              {status.stat.name}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.DetailWrapper}>
      <div className={styles.DetailContent}>
        {pokemonData.sprites.front_default ?
          <img src={pokemonData.sprites.front_default} alt='pokemon-display' />
          : <div className={styles.NoImage}>No Image Available</div>
        }
        <div>
          <div className={styles.PokemonName}>
            {getDisplayName(pokemonData.name)}
          </div>
          <div className={styles.DetailsWrapper}>
            <div className={styles.SizeWrapper}>
              <div>{t("WEIGHT")} :</div>
              <div className={styles.ItemDetails}>{pokemonData?.weight}</div>
              <div>{t("HEIGHT")} :</div>
              <div className={styles.ItemDetails}>{pokemonData?.height}</div>
            </div>
            <div className={styles.AbilitiesWrapper}>
              <div>{t("ABILITIES")} :</div>
              <div className={styles.ItemDetails}>
                  {pokemonData?.abilities && pokemonData?.abilities.length>0 && pokemonData?.abilities.map((ability)=> (
                    <li key={ability.ability.url}>
                      {`${ability.ability.name} ${ability.is_hidden ? '(hidden)' : ''}`}
                    </li>
                  ))}
              </div>
            </div>
            <div className={styles.TypeWrapper}>
              <div>{t("TYPE")} :</div>
              <div style={{display: 'flex', gap: 20}}>
                {
                  pokemonData.types?.map((type) =>
                    <div
                      className={styles.PokemonType}
                      style={{backgroundColor:lightThemeOptions.backgroundType[type.type.name]}}
                      key={type.slot+type.type.name}
                    >
                      {type.type.name}
                    </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.OtherDetails}>
        <div style={{padding:"20px 0"}}>{t('OTHER_IMAGES')} :</div>
        <div className={styles.Images}>
          {
            getImages().length >0 && getImages().map((image:string) => {
              return <img key={image} src={image} alt='display-picture' />
            })
          }
        </div>
        <div style={{padding:"20px 0"}}>{t('STATUS')} :</div>
        <div className={styles.StatusWrapper}>
          {pokemonData.stats?.map((status) => {return getStatus(status)})}
        </div>
        {chain &&
          <>
            <div style={{padding:"20px 0"}}>{t('EVOLUTION')} :</div>
            <div className={styles.EvoWrapper}>
              {chain.map((pokemon: any, index:number) => {
                return (
                  <>
                    <DetailsEvo url={pokemon.url} index={index}/>
                    {index+1< chain.length && <ArrowForwardIcon style={{height:50, width:50}} />}
                  </>
                )})}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default DetailsContent;
