import React, {useEffect, useState} from 'react';
import styles from './DetailsPopup.module.scss';
import { usePage } from '../../context/PageContext';
import lightThemeOptions from '../../styles/theme/lightTheme';
import { useTranslation } from 'next-i18next';

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

interface DetailsPopupProps {
  url:string;
}

interface PokemonTypeProps {
  slot: number;
  type: {
    name: pokemonType;
    url: string;
  };
}

interface PokemonAbilitiesProps {
  ability:{
    name: string;
    url: string;
  }
  is_hidden: boolean;
  slot: number;
}

interface dataProps {
  id: number;
  sprites: {
    front_default: string;
  };
  name: string;
  types: PokemonTypeProps[];
  abilities: PokemonAbilitiesProps[];
  weight: number;
  height: number;
}

const DetailsPopup: React.FC<DetailsPopupProps> = ({
  url}) => {
  const [data, setData] = useState<dataProps | undefined>(undefined);
  const {getPokemonData} = usePage();
  const { t } = useTranslation('home')
  useEffect(()=> {
    async function fetchData() {
      let response = await getPokemonData(url);
      setData(response);
    }
    fetchData();
  // eslint-disable-next-line
  },[])

  const getDisplayName = (name:string|undefined) => {
    if(name) {
      const splittedName = name.split('-');
      if(splittedName.length>1) {
        let label = '';
        for(let i=0;i<splittedName.length;i++) {
          label += splittedName[i] + ' ';
        }
        return label;
      }
      if(splittedName.length===1) return splittedName[0];
    }
    return "Unknown";
  };

  return (
    <div>
      <div className={styles.CardWrapper}>
        <div className={styles.CardContent}>
          {data?.sprites.front_default ?
            <img src={data?.sprites.front_default} alt='pokemon-display' />
            : <div className={styles.NoImage}>No Image Available</div>
          }
          <div>
            <div className={styles.PokemonName}>
              {getDisplayName(data?.name)}
            </div>
            <div className={styles.DetailsWrapper}>
              <div className={styles.SizeWrapper}>
                <div>Weight :</div>
                <div className={styles.ItemDetails}>{data?.weight}</div>
                <div>Height :</div>
                <div className={styles.ItemDetails}>{data?.height}</div>
              </div>
              <div className={styles.AbilitiesWrapper}>
                <div>Abilities :</div>
                <div className={styles.ItemDetails}>
                  {data?.abilities && data?.abilities.length>0 && data?.abilities.map((ability)=> (<li>{ability.ability.name}</li>))}
                </div>
              </div>
              <div className={styles.TypeWrapper}>
                <div>Type :</div>
                <div style={{display: 'flex', gap: 20}}>
                  {
                    data?.types.map((type) =>
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
              <div className={styles.ButtonWrapper}>
                <div className={styles.Button}>{t("MORE_DETAIL")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
