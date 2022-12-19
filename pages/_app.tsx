import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import Logo from "../src/Asset/Afex.png";
import { RegisterFormProvider } from "../src/layout/RegisterFormProvider";
import { useRouter } from "next/router";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [resume, setResume] = useState<File | null>(null);
  const [others, setOthers] = useState<File | null>(null);
  const { pathname } = useRouter();
  return pathname === "/track_login" || pathname === "/track_application" ? (
    <Component
      {...pageProps}
      resume={resume}
      setResume={setResume}
      others={others}
      setOthers={setOthers}
    />
  ) : (
    <div className="flex flex-col h-screen overflow-auto">
      <div className="lg:py-[20px] lg:pl-[84px] lg:m-0 pl-2 py-4 bg-white">
        <img src={Logo.src} className="lg:w-[125px] w-[125px] lg:m-0 m-auto" />
      </div>
      <RegisterFormProvider>
        <Component
          {...pageProps}
          resume={resume}
          setResume={setResume}
          others={others}
          setOthers={setOthers}
        />
      </RegisterFormProvider>
    </div>
  );
}
export default MyApp;
