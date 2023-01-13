import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               <link
                  rel='sheet'
                  href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
               />

               <script defer src='https://use.fontawesome.com/releases/v5.3.1/js/all.js'></script>
            </Head>
            <body>
               <Main />
               <div id='modal-root' />
               <NextScript />
            </body>
         </Html>
      );
   }
}
