import React, {useEffect, useState} from 'react';
import styles from './DetailsPopup.module.scss';
import { usePage } from '../../context/PageContext';
import lightThemeOptions from '../../styles/theme/lightTheme';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { IPokemonData } from '../../types/pokemon';
import { getDisplayName } from '../../utility/common';

interface IDetailsPopup {
  url:string;
}

const DetailsPopup: React.FC<IDetailsPopup> = ({
  url}) => {
  const [data, setData] = useState<IPokemonData | undefined>(undefined);
  const {getPokemonData} = usePage();
  const { t } = useTranslation(['home', 'details'])
  const router = useRouter();
  const { pathname, locale } = router;

  const onRedirect = (e:any) => {
    router.push({
            pathname: `${pathname}/[locale]/[id]`,
            query: {id:data?.id ,locale:locale}
        });
  };

  useEffect(()=> {
    async function fetchData() {
      let response = await getPokemonData(url);
      setData(response);
    }
    fetchData();
  // eslint-disable-next-line
  },[])

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
                <div>{t("WEIGHT", {ns: "details"})} :</div>
                <div className={styles.ItemDetails}>{data?.weight}</div>
                <div>{t("HEIGHT", {ns: "details"})} :</div>
                <div className={styles.ItemDetails}>{data?.height}</div>
              </div>
              <div className={styles.AbilitiesWrapper}>
                <div>{t("ABILITIES", {ns: "details"})} :</div>
                <div className={styles.ItemDetails}>
                  {data?.abilities && data?.abilities.length>0 && data?.abilities.map((ability)=> (
                    <li key={ability.ability.url}>
                      {`${ability.ability.name} ${ability.is_hidden ? '(hidden)' : ''}`}
                    </li>
                  ))}
                </div>
              </div>
              <div className={styles.TypeWrapper}>
                <div>{t("TYPE", {ns: "details"})} :</div>
                <div style={{display: 'flex', gap: 20}}>
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
              <div className={styles.ButtonWrapper}>
                <div
                  onClick={(e) => onRedirect(e)}
                  className={styles.Button}
                >
                  {t("MORE_DETAIL")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
