import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from './PokemonCard.module.scss';
import { usePage } from '../../context/PageContext';
import lightThemeOptions from '../../styles/theme/lightTheme';
import { IPokemonData } from '../../types/pokemon';
import { getShortDisplayName } from '../../utility/common';

interface IPokemonCard {
  url:string;
  setPopup:Dispatch<SetStateAction<string | undefined>>;
}

const PokemonCard: React.FC<IPokemonCard> = ({setPopup,
  url}) => {
  const [data, setData] = useState<IPokemonData | undefined>(undefined);
  const {getPokemonData} = usePage();

  useEffect(()=> {
    async function fetchData() {
      let response = await getPokemonData(url);
      setData(response);
    }
    fetchData();
  // eslint-disable-next-line
  },[])

  const getDisplayId = (id: number) => {
    if (id<10) return `#00${id}`;
    if (id<100) return `#0${id}`;
    return `#${id}`;
  };

  const getLabel = (name:string|undefined) => {
    if(name) {
      const splittedName = name.split('-');
      if(splittedName.length>1) {
        let label = '';
        for(let i=1;i<splittedName.length;i++) {
          label += splittedName[i] + ' ';
        }
        return label;
      }
      return null;
    }
    return null;
  };

  return (
    <div>
      <div className={styles.CardWrapper} onClick={()=>setPopup(url)}>
        <div className={styles.CardContent}>
          { getLabel(data?.name) &&
            <div className={styles.PokemonLabel}>{getLabel(data?.name)}</div>
          }
          {data?.sprites.front_default ?
            <img src={data?.sprites.front_default} alt='pokemon-display' />
            : <div className={styles.NoImage}>No Image Available</div>
          }
          <div className={styles.PokemonId}>
            {data && getDisplayId(data.id)}
          </div>
          <div className={styles.PokemonName}>
            {getShortDisplayName(data?.name)}
          </div>
          <div className={styles.TypeWrapper}>
            {
              data?.types?.map((type) =>
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
  );
};

export default PokemonCard;
