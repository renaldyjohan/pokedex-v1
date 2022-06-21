import styles from './DetailsEvo.module.scss';
import { getShortDisplayName } from '../../utility/common';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface IDetailsEvo {
  url: string;
  index: number;
}

const DetailsEvo: React.FC<IDetailsEvo> = ({url, index}) => {
  const router = useRouter();
  const { pathname } = router;
  const [data, setData] = useState<any>(undefined);

  const onRedirect = (e:any) => {
    router.push({
            pathname: `${pathname}`,
            query: {id:data?.id}
        });
  };

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
    <div className={styles.Container} onClick={(e)=>onRedirect(e)}>
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
