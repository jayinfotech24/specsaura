import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from "react-redux";
import store from "../store/store"
export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <>
   <Provider store={store}>
         <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" 
          rel="stylesheet" 
          />
          
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet"></link>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"  />
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Marcellus&display=swap" rel="stylesheet"></link>
      </Head>
        <Component {...pageProps} />
       
 </Provider>
    </>
  );
}
