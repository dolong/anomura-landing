import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import "/node_modules/nes.css/css/nes.css";
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <StrictMode>
        <Component {...pageProps} />
      </StrictMode>
    </RecoilRoot>
  )
}

export default MyApp
