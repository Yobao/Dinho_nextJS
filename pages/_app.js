import React, { useState, useEffect } from "react";
import "../styles/globals.scss";
import Layout from "../components/layout/layout";

import { LanguageContext } from "../AppContext";

import { LANGUAGES } from "../languagesObjects";
import { SLOVAK, CZECH, ENGLISH } from "../languagesObjects";

function MyApp({ Component, pageProps }) {
   const TRANSLATIONS = { SLOVAK, CZECH, ENGLISH };
   const [applanguage, setApplanguage] = useState();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      let timer = setTimeout(() => {
         setApplanguage(() => {
            for (const language in LANGUAGES) {
               if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
                  console.log(TRANSLATIONS[language]);
                  return TRANSLATIONS[language];
               }
            }
            return TRANSLATIONS["CZECH"];
         });
         setIsLoading(false);
      }, 100);

      return () => {
         clearInterval(timer);
      };
   }, []);

   if (isLoading) return;

   return (
      <LanguageContext.Provider value={{ applanguage, setApplanguage }}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </LanguageContext.Provider>
   );
}

export default MyApp;
