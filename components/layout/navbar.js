import React, { useState, useContext, useEffect } from "react";
import BrandImage from "./brandImage";
import Link from "next/link";

export default function NavbarComponent() {
   return (
      <div className='columns my-3 mx-0 is-centered is-mobile'>
         <nav className='navbar'>
            <div className='navbar-brand'>
               <BrandImage />
               <Link
                  href='/table'
                  className='navbar-item is-mobile is-size-5-tablet'
                  style={{ paddingLeft: "8px", paddingRight: "8px" }}
               >
                  {"Tabuľka"}
               </Link>
               {/* IF USER IS NOT LOGGED IN */}
               {/*                <a className='navbar-item is-mobile is-size-5-tablet'>Prihlásiť</a>
               <a className='navbar-item is-mobile is-size-5-tablet'>Registrovať</a> */}
               {/* IF USER IS LOGGED IN */}
               <Link href='/bet' className='navbar-item is-mobile is-size-5-tablet'>
                  Tipuj
               </Link>
               <Link href='/profil' className='navbar-item is-mobile is-size-5-tablet'>
                  Profil
               </Link>
            </div>

            <div className={`navbar-menu`}>
               <div className='navbar-start'>
                  <div className='account-dropdown navbar-item has-dropdown is-hoverable has-text-centered is-mobile is-size-5-desktop'>
                     <div className='account-dropdown-list navbar-dropdown'></div>
                  </div>
               </div>
            </div>

            <div className='navbar-end'>
               <div className='navbar-item has-dropdown is-hoverable lang-dropdown'></div>
            </div>
         </nav>
      </div>
   );
}
