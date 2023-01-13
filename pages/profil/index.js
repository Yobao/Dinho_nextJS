import React, { useState, useEffect, useContext } from "react";
import { LanguageContext, CurrentUserContext } from "../../AppContext";
import useFetch from "../../hooks/use-fetch";
import { USER_TABLE_BODY } from "../../templateObjects";
import TableComponent from "../../components/table";
import LoadingButton from "../../components/ui/button-loading";

const UserCurrentPage = () => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

   const [tableData, setTableData] = useState(null);

   const options = { method: "GET", undefined, accept: true };
   const { err, sendRequest } = useFetch();
   const transformData = (data) => {
      setTableData(data.reverse());
   };

   useEffect(() => {
      sendRequest(`/tips?user=${currentUser.id}`, options, transformData);
   }, []);

   if (!tableData) return <LoadingButton />;

   return (
      <div
         className='column table-width 
		is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-three-fifths-fullhd'
      >
         <h2 className='has-text-centered title is-3 mb-5'>{currentUser.user}</h2>
         <TableComponent head={applanguage.userTableHead} body={USER_TABLE_BODY} data={tableData} />
      </div>
   );
};

export default UserCurrentPage;
