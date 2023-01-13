import React, { useContext } from "react";
import Image from "next/image";

import { LanguageContext } from "../AppContext";

export default function Home() {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const text = applanguage.homeTitle;

   return (
      <div className='column is-centered has-text-centered is-mobile is-7-desktop home-width'>
         <h1 className='title is-size-4-mobile is-size-3-tablet is-size-3-desktop'>
            {text.welcome}
         </h1>
         <br />
         <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>{text.info1}</h3>
         <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>{text.info2}</h3>
         <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>{text.info3}</h3>
         <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>{text.info4}</h3>
         <br />

         <div className='column'>
            <iframe
               src='https://flo.uri.sh/visualisation/10156801/embed'
               title='Interactive or visual content'
               className='flourish-embed-iframe'
               frameBorder='0'
               scrolling='no'
               style={{
                  width: "100%",
                  height: "35em",
               }}
               sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
            ></iframe>
         </div>

         <br />
         <br />
         <h2 className='title is-size-4-mobile is-size-3-tablet is-size-3-desktop'>
            {text.example}
         </h2>

         <figure className='image is-inline-block column'>
            <Image
               src={text.rules}
               className=''
               /* onLoad={() => setIsLoading(false)}
                  style={!isLoading ? {} : { display: "none" }} */
            />
         </figure>
      </div>
   );
}
