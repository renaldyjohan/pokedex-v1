import React, {useEffect, useState} from 'react';
import styles from './PokemonCard.module.scss';
import { usePage } from '../../context/PageContext';
import lightThemeOptions from '../../styles/theme/lightTheme';

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

interface PokemonCardProps {
  url:string;
}

interface PokemonTypeProps {
  slot: number;
  type: {
    name: pokemonType;
    url: string;
  };
}

interface dataProps {
  id: number;
  sprites: {
    front_default: string;
  };
  name: string;
  types: PokemonTypeProps[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  url}) => {
  const [data, setData] = useState<dataProps | undefined>(undefined);
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

  const getDisplayName = (name:string|undefined) => {
    if(name) {
      const splittedName = name.split('-');
      return(splittedName[0]);
    }
    return '';
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
      <div className={styles.CardWrapper}>
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
            {/* {getDisplayName(data?.name)} */}
            {data?.name}
          </div>
          <div className={styles.TypeWrapper}>
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
      </div>
    </div>
  );
};

export default PokemonCard;
