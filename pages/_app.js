import React, { useState, useEffect } from "react";
import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import { useRouter } from "next/router";
import useFetch from "../hooks/use-fetch";
import {
   LanguageContext,
   CurrentUserContext,
   DropdownTitleContext,
   OtherUserContext,
} from "../AppContext";
import { LANGUAGES } from "../languagesObjects";
import { SLOVAK, CZECH, ENGLISH } from "../languagesObjects";

function MyApp({ Component, pageProps }) {
   const route = useRouter();
   const location = route.route;
   const urlPreCheck = Number(
      location.slice(
         location.split("/", 2).join("/").length + 1,
         location.split("/", 3).join("/").length
      )
   );

   const TRANSLATIONS = { SLOVAK, CZECH, ENGLISH };
   const [applanguage, setApplanguage] = useState(null);
   const [currentUser, setCurrentUser] = useState(null);
   const [otherUser, setOtherUser] = useState(
      !Number.isNaN(urlPreCheck) && urlPreCheck !== 0 ? location : null
   );
   const [dropdownTitle, setDropdownTitle] = useState(null);
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
            localStorage.setItem("dinholanguage", "cs");
            return TRANSLATIONS["CZECH"];
         });

         setIsLoading(false);
      }, 100);

      return () => {
         clearInterval(timer);
      };
   }, []);

   if (isLoading) return;
   if (route.route.includes("/changepassword"))
      return (
         <LanguageContext.Provider value={{ applanguage, setApplanguage }}>
            <Component {...pageProps} />
         </LanguageContext.Provider>
      );

   return (
      <LanguageContext.Provider value={{ applanguage, setApplanguage }}>
         <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <OtherUserContext.Provider value={{ otherUser, setOtherUser }}>
               <DropdownTitleContext.Provider value={{ dropdownTitle, setDropdownTitle }}>
                  {isAuth && (
                     <Layout>
                        <Component {...pageProps} />
                     </Layout>
                  )}
               </DropdownTitleContext.Provider>
            </OtherUserContext.Provider>
         </CurrentUserContext.Provider>
      </LanguageContext.Provider>
   );
}

export default MyApp;
