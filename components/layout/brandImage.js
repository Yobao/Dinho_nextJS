import React from "react";
import Brand from "../../public/brand.png";
import Image from "next/image";
import Link from "next/link";

export default function BrandImage() {
   return (
      <Link href='/'>
         <Image src={Brand} style={{ maxHeight: "90px" }} width={98.7} height={90} />
      </Link>
   );
}
