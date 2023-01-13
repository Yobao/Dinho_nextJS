import React, { useState, useEffect } from "react";
import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import useFetch from "../hooks/use-fetch";
import { LanguageContext, CurrentUserContext } from "../AppContext";
import { LANGUAGES } from "../languagesObjects";
import { SLOVAK, CZECH, ENGLISH } from "../languagesObjects";

function MyApp({ Component, pageProps }) {
   const TRANSLATIONS = { SLOVAK, CZECH, ENGLISH };
   const [applanguage, setApplanguage] = useState(null);
   const [currentUser, setCurrentUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   const { error, sendRequest, isAuth } = useFetch();

   useEffect(() => {
      const token = localStorage.getItem("dinhotoken");
      const options = { method: "GET", token };

      const transformData = (data) => {
         if (Number.isNaN(Number(data))) {
            setCurrentUser(data);
         }
      };
      sendRequest("/autologin", options, transformData);

      let timer = setTimeout(() => {
         setApplanguage(() => {
            for (const language in LANGUAGES) {
               if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
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
         <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {isAuth && (
               <Layout>
                  <Component {...pageProps} />
               </Layout>
            )}
         </CurrentUserContext.Provider>
      </LanguageContext.Provider>
   );
}

export default MyApp;
