import React, { useState, useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { LanguageContext, CurrentUserContext } from "../../AppContext";
import Link from "next/link";
import LoginModal from "../../modals/login-modal";
import RegModal from "../../modals/registration-modal";

import BrandImage from "./brandImage";
import { FLAGS } from "../../templateObjects";
import { LANGUAGES } from "../../languagesObjects";
import { SLOVAK, CZECH, ENGLISH } from "../../languagesObjects";

export default function NavbarComponent() {
   const checkResolution = window.matchMedia("(max-width: 1023px)").matches;
   const checkBrandResolution = window.matchMedia("(max-width: 768px)").matches;
   const router = useRouter();
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const text = applanguage.navbar;
   const TRANSLATIONS = { SLOVAK, CZECH, ENGLISH };
   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

   const [showLogin, setShowLogin] = useState(false);
   const [showReg, setShowReg] = useState(false);
   const [showChangePwd, setShowChangePwd] = useState(false);
   const [showForgotPwd, setShowForgotPwd] = useState(false);
   const [showMobileMenu, setShowMobileMenu] = useState(true);
   const [showMobileFlags, setShowMobileFlags] = useState(!checkResolution ? "" : "is-hidden");
   const [navbarEndWidth, setNavbarEndWidth] = useState(!checkResolution ? { width: "140px" } : {});

   const brandSmall = { height: "70", width: "76.75" };
   const brandBig = { height: "90", width: "98.7" };
   const brandSize = useMemo(
      () => () => {
         return window.matchMedia("(max-width: 768px)").matches ? brandSmall : brandBig;
      },
      [checkBrandResolution]
   );
   const [brandImage, setBrandImage] = useState(brandSize);
   const [defaultLanguage, setDefaultLanguage] = useState(() => {
      for (const language in LANGUAGES) {
         if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
            return FLAGS[language];
         }
      }
   });

   useEffect(() => {
      let resizeTimeout = null;
      const resize = () => {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(() => {
            setShowMobileFlags(
               !window.matchMedia("(max-width: 1023px)").matches ? "" : "is-hidden"
            );
            setNavbarEndWidth(
               !window.matchMedia("(max-width: 1023px)").matches ? { width: "140px" } : {}
            );

            setBrandImage(brandSize);
         }, 150);
      };
      window.addEventListener("resize", resize);
      return () => {
         window.removeEventListener("resize", resize);
      };
   }, [router, checkBrandResolution]);

   const handleShowLogin = () => {
      setShowLogin(!showLogin);
   };
   const handleShowReg = () => {
      setShowReg(!showReg);
   };
   const handleShowForgotPwd = () => {
      setShowForgotPwd(!showForgotPwd);
   };

   const handleShowMobileMenu = () => {
      setShowMobileMenu(!showMobileMenu ? "is-active" : null);
   };
   const handleShowMobileFlags = () => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
         setShowMobileFlags(showMobileFlags === "" ? "is-hidden" : "");
      }
   };
   const handleChangeLanguage = (e) => {
      let languageKey = e.target.getAttribute("value");
      for (const language in LANGUAGES) {
         if (LANGUAGES[language].includes(languageKey)) {
            setDefaultLanguage(FLAGS[language]);
            localStorage.setItem("dinholanguage", languageKey);
            setApplanguage(TRANSLATIONS[language]);
            handleShowMobileFlags();
         }
      }
   };

   //------------------------------------------------------------------------------------------------------

   return (
      <div className='columns my-3 mx-0 is-centered is-mobile'>
         <nav className='navbar'>
            <div className='navbar-brand'>
               <BrandImage style={brandImage} />
               <Link
                  href='/table'
                  className='navbar-item is-mobile is-size-5-tablet'
                  style={{ paddingLeft: "8px", paddingRight: "8px" }}
               >
                  {"Tabuľka"}
               </Link>
               {!currentUser && (
                  <React.Fragment>
                     <a
                        onClick={handleShowLogin}
                        className='navbar-item is-mobile is-size-5-tablet'
                        style={{ paddingLeft: "8px", paddingRight: "8px" }}
                     >
                        {text.login}
                     </a>
                     <a
                        onClick={handleShowReg}
                        className='navbar-item is-mobile is-size-5-tablet'
                        style={{ paddingLeft: "8px", paddingRight: "8px" }}
                     >
                        {text.registration}
                     </a>
                  </React.Fragment>
               )}

               {currentUser && (
                  <React.Fragment>
                     <Link
                        href='/bet'
                        className='navbar-item is-mobile is-size-5-tablet'
                        style={{ paddingLeft: "8px", paddingRight: "8px" }}
                     >
                        {text.bet}
                     </Link>
                     <Link
                        href='/profil'
                        className='navbar-item is-mobile is-size-5-tablet'
                        style={{ paddingLeft: "8px", paddingRight: "8px" }}
                     >
                        {currentUser.user}
                     </Link>
                     <a
                        role='button'
                        className={`navbar-burger my-auto ${showMobileMenu}`}
                        aria-label='menu'
                        aria-expanded='false'
                        data-target='navbarBasicExample'
                        onClick={handleShowMobileMenu}
                     >
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                     </a>
                  </React.Fragment>
               )}
            </div>

            {currentUser && (
               <div className={`navbar-menu ${showMobileMenu}`}>
                  <div className='navbar-start'>
                     <div className='account-dropdown navbar-item has-dropdown is-hoverable has-text-centered is-mobile is-size-5-desktop'>
                        <a type='modal' className='navbar-link' onClick={handleShowMobileMenu}>
                           {text.account}
                        </a>
                        <div className='account-dropdown-list navbar-dropdown'>
                           <a
                              className='navbar-item is-mobile is-size-6-tablet is-size-6-desktop'
                              style={{ paddingLeft: "8px", paddingRight: "40px" }}
                           >
                              {text.pwdchange}
                           </a>
                           <a
                              className='navbar-item is-mobile is-size-6-tablet is-size-6-desktop'
                              style={{ paddingLeft: "8px", paddingRight: "40px" }}
                           >
                              {text.logout}
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {router.route === "/" && (
               <div className='navbar-end'>
                  <div className='navbar-item has-dropdown is-hoverable lang-dropdown'>
                     <a
                        className='navbar-link is-arrowless has-text-centered'
                        onClick={handleShowMobileFlags}
                     >
                        <img src={defaultLanguage.flag}></img>
                     </a>
                     <div
                        className={`navbar-dropdown is-boxed ${showMobileFlags} custom-navbar-end`}
                        style={navbarEndWidth}
                     >
                        {Object.keys(FLAGS).map((country) => (
                           <a
                              className='navbar-item'
                              key={FLAGS[country].text}
                              value={FLAGS[country].code}
                              onClick={handleChangeLanguage}
                           >
                              <div className='columns is-mobile has-text-centered'>
                                 <div className='column is-mobile has-text-right px-0'>
                                    <img src={FLAGS[country].flag} value={FLAGS[country].code} />
                                 </div>
                                 <div className='column is-mobile has-text-left px-0'>
                                    <span value={FLAGS[country].code}>
                                       &nbsp;&nbsp;{`${FLAGS[country].text}`}
                                    </span>
                                 </div>
                              </div>
                           </a>
                        ))}
                        <hr className='navbar-divider'></hr>
                     </div>
                  </div>
               </div>
            )}
         </nav>

         {/* --------------------- MODALS SECTION --------------------- */}
         {showLogin && (
            <LoginModal showModal={handleShowLogin} showAnotherModal={handleShowForgotPwd} />
         )}
         {showReg && <RegModal showModal={handleShowReg} />}
         {showForgotPwd && <ForgotPwdModal showModal={handleShowForgotPwd} />}
      </div>
   );
}
