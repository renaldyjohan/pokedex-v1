import * as React from 'react';
import { useTranslation } from 'next-i18next'
import Image from '../../constant/image'
import styles from './HomeLanding.module.scss'

interface HomeLandingProps {
  handleScroll: () => void;
}

const HomeLanding: React.FC<HomeLandingProps> = ({
  handleScroll
}) => {
  const { t } = useTranslation('home')
  return (
    <div className={styles.LandingWrapper}>
      <div className={styles.DetailWrapper}>
        <div className={styles.DetailTitle}>{t('HEADER_TITLE')}</div>
        <div className={styles.DetailSubtitle}>{t('HEADER_SUBTITLE')}</div>
        <div className={styles.DetailButton} onClick={()=>handleScroll()}>{t('CHECK_BUTTON')}</div>
      </div>
      <img src={Image.Home} alt="hero-image" />
    </div>
  );
}

export default HomeLanding;
