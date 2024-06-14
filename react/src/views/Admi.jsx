import { useEffect, useState, Fragment } from "react";
import {
  InformationCircleIcon,

  //PencilIcon,
} from "@heroicons/react/20/solid";
//import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

//import { useNavigate } from "react-router-dom";
import { BellAlertIcon } from "@heroicons/react/24/outline";
//import { useStateContext } from "../contexts/ContextProvider";
import SearchBar from "../components/SearchBar";

/*function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}*/

export default function Client() {
  const [allUsers, setAllcountry] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notificationSent, setNotificationSent] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  //const { currentUser } = useStateContext();

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/api/marche");

      const userDataArray = Array.isArray(result.data.results)
        ? result.data.results
        : [result.data.results];

      setAllcountry(userDataArray);
    } catch (err) {
      console.log("erreur");
      setError(
        "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer plus tard."
      );
    }
  };

  const onSubmitChange = async (e, nif, numero_marche) => {
    e.preventDefault();

    if (!notificationSent) {
      try {
        await axios.post("http://127.0.0.1:8000/api/sendnotif", {
          nif: nif, // Passer le NIF en paramètre
          message: `Vous êtes notifié pour le paiement du marché numéro ${numero_marche}`,
          numero_marche: numero_marche,
          statut: 1,
        });

        console.log("client notifie");
        setNotificationSent(false);
        setIsDialogOpen(true);
      } catch (err) {
        console.error("Erreur lors de l'envoi de la notification", err);
      }
    }
  };

  return (
    <>
      <main>
        <div className="max-w-sm mx-auto sm:px-6 lg:px-8">
          <SearchBar
            placeholder="recherche..."
            data={allUsers}
            updateFilteredData={setFilteredUsers}
            updateKeyword={setSearchKeyword}
          />
        </div>
        {error && (
          <div className="bg-red-500 text-white p-4 mt-4">
            <p>{error}</p>
          </div>
        )}
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100">
            {(filteredUsers.length > 0 ? filteredUsers : allUsers)
              .filter((marche_public) =>
                marche_public.nature
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase())
              )
              .map((marche_public) => (
                <li
                  key={marche_public.numero_marche}
                  className="flex justify-between py-5 gap-x-6"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="flex-auto min-w-0">
                      <p className="font-semibold leading-6 text-gray-900 text-x">
                        {marche_public.nature}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        marche numero: {marche_public.numero_marche} <br />
                        Date d&apos;enregistrement:{" "}
                        {marche_public.date_enregistrement}
                        <br />
                        Nif du fournisseur: {marche_public.nif_fournisseur}
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-0 gap-x-4">
                    <div className="flex-auto min-w-0 center">
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        en cours...
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="flex mt-5 lg:ml-4 lg:mt-0">
                      <p className="text-sm leading-6 text-gray-900 ">
                        <button type="button">
                          <NavLink
                            to={`/admilayout/aboutadmi/${marche_public.numero_marche}`}
                          >
                            <InformationCircleIcon
                              className="w-8 text-gray-800 h-7 "
                              aria-hidden="true"
                            />
                          </NavLink>
                        </button>
                      </p>

                      <p className="px-1 text-sm leading-6 text-gray-900">
                        <button
                          type="button"
                          onClick={(e) =>
                            onSubmitChange(
                              e,
                              marche_public.nif_fournisseur,
                              marche_public.numero_marche
                            )
                          }
                        >
                          <BellAlertIcon
                            className="text-blue-500 w-7 h-7 "
                            aria-hidden="true"
                            style={{
                              display:
                                marche_public.statut.trim().toLowerCase() ===
                                "payé"
                                  ? "none"
                                  : "block",
                            }}
                          />
                        </button>
                      </p>
                    </div>

                    {marche_public.statut === "non payé" ? (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none p-1 rounded-full bg-red-500/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Non validé
                        </p>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none p-1 rounded-full bg-emerald-500/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Validé
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </main>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition appear show={isDialogOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsDialogOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Client Notifié
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Le client est notifie avec succes
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Ok
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  );
}
