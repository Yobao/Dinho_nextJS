import React from "react";
import Brand from "../../public/brand.png";
import Image from "next/image";
import Link from "next/link";

export default function BrandImage({ style }) {
   return (
      <Link href='/'>
         <Image src={Brand} style={style} width={style.width} height={style.height} />
      </Link>
   );
}
