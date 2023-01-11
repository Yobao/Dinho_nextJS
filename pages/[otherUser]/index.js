import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

export default function OtherUserPage() {
   const router = useRouter();
   router.query.otherUser = "test";
   const { otherUser } = router.query.otherUser;

   return <div>{otherUser} PAGE!</div>;
}
