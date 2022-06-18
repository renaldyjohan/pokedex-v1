import React, { useEffect, useState } from 'react';
import styles from "./Navbar.module.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import { useCommon } from "../../context/CommonContext";
import { useRouter } from 'next/router';
import Image from '../../constant/image';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {
  const { locale } = useCommon();
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter()
  const { pathname, asPath, query } = router
  const { t } = useTranslation('common')
  const [nav, setNav] = useState('')
  const getSelected = () => {
    if (locale === 'id') return 'Indonesia';
    return 'English';
  }
  useEffect(()=> {
    if(router.asPath.includes('details')) return setNav('details')
    return(setNav('home'))
  }, [router])
  const onRedirect = (e:any) => {
    router.push({ pathname, query }, asPath, { locale: e.target.id })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.languageDropdown}>
          <LanguageTwoToneIcon className={styles.globe} />
          <div onClick={() => setDropdown(!dropdown)} className={styles.selectedDropdown}>
            {getSelected()}
            <div className={styles.dropdownWrapper} style={{display: dropdown ? "block" : "none"}}>
              <div
                className={styles.dropdownOption}
                id='en'
                onClick={(e) => onRedirect(e)}
                >
                  English
              </div>
              <div
                className={styles.dropdownOption}
                id='id'
                onClick={(e) => onRedirect(e)}
              >
                  Indonesia
              </div>
            </div>
          </div>
          <KeyboardArrowDownIcon style={{transform: dropdown ? 'rotate(180deg)': 'none'}} className={styles.chevron} />
        </div>
      </div>
      <div className={styles.navContainer}>
        <img src={Image.Logo} alt='brand-logo' />
        <Link href='/'>
          <div style={{
            color: nav==='home' ? '#E6AB09' : 'unset',
            fontWeight: nav==='home' ? 700 : 0
          }}>{t('HOME')}</div>
        </Link>
        <Link href='details'>
          <div style={{
            color: nav==='details' ? '#E6AB09' : 'unset',
            fontWeight: nav==='details' ? 700 : 0
          }}>{t('TYPE')}</div>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
