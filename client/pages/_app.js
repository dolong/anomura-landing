import React from 'react';
import { RecoilRoot } from 'recoil';
import "/node_modules/nes.css/css/nes.css";
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
