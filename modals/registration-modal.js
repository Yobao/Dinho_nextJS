import React, { useState, useContext, useCallback, useMemo } from "react";
import useFetch from "../hooks/use-fetch";
import { LanguageContext, CurrentUserContext } from "../AppContext";

import Portal from "./../HOC/Portal";
import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const RegModal = ({ showModal }) => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
   const alerts = applanguage.regModal.warnings;
   const [regName, setRegName] = useState(null);
   const [regPwd, setRegPwd] = useState(null);
   const [regPwd2, setRegPwd2] = useState(null);
   const [regEmail, setRegEmail] = useState(null);
   const [regNameColor, setRegNameColor] = useState();
   const [regPwdColor, setRegPwdColor] = useState();
   const [regPwdColor2, setRegPwdColor2] = useState();
   const [regEmailColor, setRegEmailColor] = useState();
   const [team, setTeam] = useState(1);
   const [community, setCommunity] = useState(null);
   const [communityColor, setCommunityColor] = useState("");

   const [submitSent, setSubmitSent] = useState(false);

   const handleRegName = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setRegName(val);
         const validation = () => {
            setRegNameColor(
               val.length < 3 ||
                  val.length > 15 ||
                  !val.match("^[a-zA-Z0-9@\\-_.]*$") ||
                  !isNaN(val)
                  ? "is-danger"
                  : ""
            );
         };
         if (submitSent || e?.target === undefined) validation();
      },
      [submitSent]
   );
   const handleRegPwd = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setRegPwd(val);
         const validation = () => {
            setRegPwdColor(val.length < 6 ? "is-danger" : "");
         };
         if (submitSent || e?.target === undefined) validation();
      },
      [submitSent]
   );
   const handleRegPwd2 = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setRegPwd2(val);
         const validation = () => {
            setRegPwdColor2(val.length < 6 ? "is-danger" : "");
         };
         if (submitSent || e?.target === undefined) validation();
      },
      [submitSent]
   );
   const handleRegEmail = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setRegEmail(val);
         const validation = () => {
            setRegEmailColor(
               !val.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/) ? "is-danger" : ""
            );
         };
         if (submitSent || e?.target === undefined) validation();
      },
      [submitSent]
   );
   const handleCommunity = useCallback(
      (value) => {
         setCommunityColor("");
         setCommunity(value);
      },
      [submitSent]
   );
   const handleInputs = useMemo(
      () => ({
         handleRegName,
         handleRegPwd,
         handleRegPwd2,
         handleRegEmail,
      }),
      [submitSent]
   );

   const handleInputColors = {
      setRegNameColor,
      setRegPwdColor,
      setRegPwdColor2,
      setRegEmailColor,
      setCommunityColor,
   };
   const inputColors = {
      regNameColor,
      regPwdColor,
      regPwdColor2,
      regEmailColor,
      communityColor,
   };
   const userData = {
      username: regName,
      password: regPwd,
      team: team,
      mail: regEmail,
      community: community,
   };

   const options = {
      method: "POST",
      undefined,
      accept: true,
      body: JSON.stringify(userData),
   };

   const { err, sendRequest } = useFetch();
   const transformData = (data) => {
      if (data === 400 || data === 409) {
         setRegNameColor("is-danger");
         setRegEmailColor("is-danger");
         return toastik(`${alerts.exists}`);
      }
      if (data === 500) return toastik(`${alerts.somethingWrong}`);
      localStorage.setItem("dinhotoken", data.access_token);
      setCurrentUser({ user: regName, id: null });
      showModal();
   };

   const registration = useCallback(() => {
      setSubmitSent(true);
      let index = 0;
      let message = null;
      let checkUserData = {
         regName,
         regPwd,
         regPwd2,
         regEmail,
         community,
      };

      // Fill all fields condition.
      for (const input in checkUserData) {
         if (checkUserData[input] === null || checkUserData[input] === "") {
            if (!message) message = alerts.fillEverything;
            if (input === "community") {
               Object.values(handleInputColors)[index]("hsl(348deg, 86%, 61%)");
            } else {
               Object.values(handleInputColors)[index]("is-danger");
            }
         }
         index++;
      }
      if (message) return toastik(message);
      // Inputfield specific.
      for (let i = 0; i < Object.keys(handleInputs).length; i++) {
         Object.values(handleInputs)[i](Object.values(checkUserData)[i]);
      }
      // Not matching passwords condition.
      if (regPwd !== regPwd2) {
         setRegPwdColor("is-danger");
         setRegPwdColor2("is-danger");
         message = alerts.pwdNotMatch;
      }
      if (message) return toastik(message);

      sendRequest("/register", options, transformData);
   }, [options.body]);

   const buttons = {
      registration,
   };

   const dropdownData = {
      data: applanguage.regModal.dropdown,
      handleRequest: handleCommunity,
      styleTitle: "is-size-6",
      styleMenu: "is-size-6",
   };

   return (
      <Portal>
         <ModalComponent
            language={applanguage.regModal}
            handleInputs={handleInputs}
            handleButtons={buttons}
            userData={userData}
            inputColors={inputColors}
            showModal={showModal}
            showEye={false}
            dropdown={dropdownData}
         />
      </Portal>
   );
};

export default RegModal;
