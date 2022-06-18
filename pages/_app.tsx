import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { appWithTranslation } from 'next-i18next'

import "@fontsource/poppins"; // Defaults to weight 400.

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightTheme';
import '../styles/globals.css';
import nextI18NextConfig from '../next-i18next.config.js';
import { CommonProvider } from '../context/CommonContext';
import Navbar from '../components/Navbar/Navbar';
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;

}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CommonProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </CommonProvider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
