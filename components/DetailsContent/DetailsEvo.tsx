import styles from './DetailsEvo.module.scss';
import { getShortDisplayName } from '../../utility/common';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IDetailsEvo {
  url: string;
  index: number;
}

const DetailsEvo: React.FC<IDetailsEvo> = ({url, index}) => {

  const [data, setData] = useState<any>(undefined);

  useEffect(()=> {
    async function fetchData() {
      let response = await axios.get(url);
      let response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${response.data.id}`)
      setData(response2.data);
    }
    fetchData();
  // eslint-disable-next-line
  },[])

  return (
    <div className={styles.Container}>
      <div className={styles[`Wrapper${index}`]}>
        {
          data &&
            <img src={data.sprites.front_default} alt='evo-display' />
        }
      </div>
      <div>
        {data && getShortDisplayName(data.name)}
      </div>
    </div>
  );
};

export default DetailsEvo;
