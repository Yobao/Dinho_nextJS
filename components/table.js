import React, { useContext } from "react";
import { CurrentUserContext, OtherUserContext } from "../AppContext";
import { useRouter } from "next/router";

const TableComponent = ({ head, body, data, position }) => {
   const { otherUser, setOtherUser } = useContext(OtherUserContext);
   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
   const router = useRouter();

   const handleNavigate = (path) => {
      setOtherUser(`/${path}`);
      router.push(`/${path}`);
   };

   return (
      <React.Fragment>
         {data && (
            <table
               id='table_content'
               className='table is-bordered is-striped is-hoverable is-narrow is-fullwidth
					 is-mobile has-text-centered is-size-7-mobile is-full-tablet'
            >
               <thead>
                  <tr>
                     {head.map((column) => (
                        <th
                           key={column}
                           id='table_header'
                           className='has-text-centered is-vcentered is-size-7-mobile is-full-tablet'
                        >
                           {column}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {data.map((row, iRow) => (
                     <tr key={`${row.username}-${row.id}`} className='custom-mobile-row-height'>
                        {body.map((column, iColumn) => (
                           <td
                              key={`${row.username}-${column.name}`}
                              className={`is-vcentered ${column.class} ${
                                 iColumn === body.length - 1 && row[column.name] > 0
                                    ? "has-text-success has-text-weight-bold"
                                    : ""
                              } ${
                                 currentUser?.user !== undefined &&
                                 row.username === currentUser?.user
                                    ? "has-background-danger-light"
                                    : ""
                              }`}
                              onClick={() => {
                                 if (column.name === "username")
                                    handleNavigate(`user/${row.id}/${row.username}`);
                              }}
                           >
                              {iColumn === 0 && position !== undefined
                                 ? `${position + iRow + 1} ${
                                      row.prize === null || row.prize === undefined
                                         ? ""
                                         : `(${row.prize}€)`
                                   }`
                                 : !isNaN(Number(row[column.name]))
                                 ? Number(row[column.name]).toLocaleString("sk-SK")
                                 : row[column.name]}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </React.Fragment>
   );
};

export default TableComponent;
