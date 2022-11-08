import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import Logo from "../src/Asset/Afex.png";
import { RegisterFormProvider } from "../src/layout/RegisterFormProvider";
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  return (pathname === '/login' || pathname === '/track_application') ? 
  <Component {...pageProps} /> :
   (
    <>
      <div className="lg:py-[29px] lg:pl-[84px] lg:m-0 pl-2 py-8 ">
        <img src={Logo.src} className="lg:w-[125px] w-[125px] lg:m-0 m-auto" />
      </div>

      <RegisterFormProvider>
        <Component {...pageProps} />
      </RegisterFormProvider>
    </>
  );


  }
export default MyApp;
