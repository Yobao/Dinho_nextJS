import React, { useState, useContext, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import useFetch from "../hooks/use-fetch";
import { LanguageContext } from "../AppContext";

import Portal from "../HOC/Portal";
import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const ChangePwdModal = ({ showModal }) => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const alerts = applanguage.changePwdModal.warnings;
   const [oldPwd, setOldPwd] = useState();
   const [newPwd, setNewPwd] = useState();
   const [oldPwdColor, setOldPwdColor] = useState();
   const [newPwdColor, setNewPwdColor] = useState();
   const [submitSent, setSubmitSent] = useState(false);
   const router = useRouter();

   const handleOldPwd = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setOldPwd(val);
         if (submitSent) setOldPwdColor(val.length < 6 ? "is-danger" : "");
      },
      [submitSent]
   );
   const handleNewPwd = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setNewPwd(val);
         if (submitSent) setNewPwdColor(val.length < 6 ? "is-danger" : "");
      },
      [submitSent]
   );
   const handleInputs = useMemo(
      () => ({
         handleOldPwd,
         handleNewPwd,
      }),
      [submitSent]
   );

   const handleInputColors = {
      setOldPwdColor,
      setNewPwdColor,
   };
   const inputColors = {
      oldPwdColor,
      newPwdColor,
   };
   const userData = {
      old_password: oldPwd,
      new_password: newPwd,
   };
   const options = {
      method: "POST",
      token: true,
      accept: true,
      body: JSON.stringify(userData),
   };

   const { err, sendRequest } = useFetch();
   const transformData = (data) => {
      if (data === 400) return toastik(alerts.pwdMin);
      if (data === 409) {
         setOldPwdColor("is-danger");
         return toastik(alerts.wrongPassword);
      }
      if (data === 500) return toastik(alerts.somethingWrong);
      showModal();
      router.push("/");
   };

   const changePassword = useCallback(() => {
      setSubmitSent(true);
      let message;
      let index = 0;
      let checkUserData = {
         oldPwd,
         newPwd,
      };

      // Fill all fields condition.
      for (const input in checkUserData) {
         if (checkUserData[input] === null || checkUserData[input] === "") {
            if (!message) message = alerts.fillEverything;
            Object.values(handleInputColors)[index]("is-danger");
         }
         index++;
      }
      if (message) return toastik(message);
      // Inputfield specific.
      for (let i = 0; i < Object.keys(handleInputs).length; i++) {
         Object.values(handleInputs)[i](Object.values(checkUserData)[i]);
      }

      sendRequest("/change_password", options, transformData);
   }, [options.body]);

   const buttons = {
      changePassword,
   };

   return (
      <Portal>
         <ModalComponent
            language={applanguage.changePwdModal}
            handleInputs={handleInputs}
            handleButtons={buttons}
            userData={userData}
            inputColors={inputColors}
            showModal={showModal}
            showEye={true}
         />
      </Portal>
   );
};

export default ChangePwdModal;
