import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
//import { NavLink } from "react-router-dom";
import axios from "axios";
import SearchPayment from "../components/SearchPayment";

import {
  BriefcaseIcon,
  CalendarIcon,
  MapIcon,
  // InformationCircleIcon,
  // DocumentCheckIcon,

  //PencilIcon,
} from "@heroicons/react/20/solid";

export default function ListePayment() {
  const { currentUser } = useStateContext();
  const [allUsers, setAllcountry] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser.nif) {
          const result = await axios.get(
            `http://127.0.0.1:8000/api/payment/${currentUser.nif}`
          );
          const userDataArray = Array.isArray(result.data.results)
            ? result.data.results
            : [result.data.results];

          setAllcountry(userDataArray);
          //console.log(userDataArray);
        }
      } catch (err) {
        console.log(
          "Erreur lors de la récupération des payment de l'utilisateur",
          err
        );
      }
    };
    fetchData();
    //getusers();
  }, [currentUser.nif]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {currentUser.nom_entite}
              </h2>
              <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <BriefcaseIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {currentUser.activite}
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MapIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {currentUser.province}
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MapIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {currentUser.statistique}
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {currentUser.created_at}
                </div>
              </div>
            </div>
            <div className="flex mt-5 lg:ml-4 lg:mt-0"></div>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <div className="max-w-sm mx-auto sm:px-6 lg:px-8">
          <SearchPayment
            placeholder="recherche..."
            data={allUsers}
            updateFilteredData={setFilteredUsers}
            updateKeyword={setSearchKeyword}
          />
        </div>

        <div className="mx-auto max-w-2xl rounded-xl sm:px-6 lg:px-8 bg-white shadow-xl">
          <ul role="list" className="divide-y divide-gray-100">
            {(filteredUsers.length > 0 ? filteredUsers : allUsers)
              .filter((payment) =>
                payment.numero_payment
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase())
              )
              .map((payment) => (
                <li
                  key={payment.numero_payment}
                  className="flex justify-between py-5 gap-x-6"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="flex-auto min-w-0">
                      <p className="font-semibold leading-6 text-gray-900 text-x">
                        {payment.banque}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        Numero Payment:{payment.numero_payment} <br />
                        numero compte Destinataire: {payment.compte_dest} <br />
                        Montant: {payment.montant} <br />
                        code etablissement:{payment.code_etablisement} || code
                        Guichet:{payment.code_guichet} || RIB: {payment.RIB}{" "}
                        <br />
                        Date d&apos;enregistrement: {payment.date_payment}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="flex mt-5 lg:ml-4 lg:mt-0">
                      {/* <p className="text-sm leading-6 text-gray-900">
                        <button type="button">
                          <NavLink>
                            <InformationCircleIcon
                              className="w-8 h-8 text-red-500"
                              aria-hidden="true"
                            />
                          </NavLink>
                        </button>
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        <button type="button">
                          <NavLink
                            to={`/clientlayout/recu/${payment.numero_payment}`}
                          >
                            <DocumentCheckIcon
                              className="w-8 h-8 text-green-500"
                              aria-hidden="true"
                            />
                          </NavLink>
              </button>*
              </p>*/}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
