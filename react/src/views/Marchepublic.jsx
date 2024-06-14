import { Fragment, useEffect, useState } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  DocumentArrowDownIcon,
  InformationCircleIcon,
  MapPinIcon,
  TrashIcon,
  CreditCardIcon,
  PlusIcon,
  MapIcon,
  ExclamationTriangleIcon,

  //PencilIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import SearchBar from "../components/SearchBar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Marchepublic() {
  const navigate = useNavigate();
  const { currentUser } = useStateContext();
  const [allUsers, setAllcountry] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser.nif) {
          const result = await axios.get(
            `http://127.0.0.1:8000/api/liste/${currentUser.nif}`
          );
          const userDataArray = Array.isArray(result.data.results)
            ? result.data.results
            : [result.data.results];

          setAllcountry(userDataArray);
          console.log(userDataArray);
        }
      } catch (err) {
        console.log(
          "Erreur lors de la récupération des marchés de l'utilisateur",
          err
        );
      }
    };

    fetchData();
  }, [currentUser.nif]);

  const handleDeleteButtonClick = (numero_marche) => {
    setSelectedMarket(numero_marche);
    openModal();
  };

  const handleDelete = async (numero_marche) => {
    console.log(numero_marche);

    await axios.delete("http://127.0.0.1:8000/api/supprimer/" + numero_marche);

    setAllcountry((prevAllUsers) =>
      prevAllUsers.filter((item) => item.numero_marche !== numero_marche)
    );
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://127.0.0.1:8000/api/recupdf");
      navigate("/clientlayout/marchepublic");
    } catch (err) {
      console.log("pdf indisponible");
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="  text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
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
                  <MapPinIcon
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
            <div className="flex mt-5 lg:ml-4 lg:mt-0">
              <span className="hidden ml-3 sm:block">
                <button
                  type="button"
                  className="flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  <NavLink to={`/clientlayout/enregistrement`}>
                    Ajouter nouveaux marche
                  </NavLink>
                </button>
              </span>

              <Menu as="div" className="relative ml-3 sm:hidden">
                <Menu.Button className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                  More
                  <ChevronDownIcon
                    className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 -mr-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          View
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-sm mx-auto sm:px-6 lg:px-8">
          <SearchBar
            placeholder="recherche..."
            data={allUsers}
            updateFilteredData={setFilteredUsers}
            updateKeyword={setSearchKeyword}
          />
        </div>

        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100">
            {(filteredUsers.length > 0 ? filteredUsers : allUsers)
              .filter(
                (marche_public) =>
                  marche_public.nature
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase()) ||
                  marche_public.numero_marche
                    .toString()
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
                      <p className="text-sm leading-6 text-gray-900">
                        <button type="button">
                          <NavLink
                            to={`/clientlayout/about/${marche_public.numero_marche}`}
                          >
                            <InformationCircleIcon
                              className="w-8 h-8 text-gray-500 "
                              aria-hidden="true"
                            />
                          </NavLink>
                        </button>
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteButtonClick(marche_public.numero_marche)
                          }
                        >
                          <TrashIcon
                            className="text-red-600 w-7 h-7 "
                            aria-hidden="true"
                          />
                        </button>
                      </p>
                      <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          onClose={closeModal}
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
                            <div
                              className="fixed inset-0 bg-black/25"
                              onClick={closeModal}
                            />
                          </Transition.Child>

                          <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                              <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                      className="w-6 h-6 text-red-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                  >
                                    Confirmation de suppression
                                  </Dialog.Title>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      Êtes-vous sûr de vouloir supprimer ce
                                      marché ?
                                    </p>
                                  </div>
                                  <div className="mt-4">
                                    <button
                                      type="button"
                                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                      onClick={async () => {
                                        await handleDelete(selectedMarket);
                                        setIsOpen(false);
                                        setSelectedMarket(null);
                                      }}
                                    >
                                      Confirmer la suppression
                                    </button>
                                    <button
                                      type="button"
                                      className="inline-flex justify-center px-4 py-2 mx-4 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                      onClick={() => {
                                        closeModal();
                                      }}
                                    >
                                      Annuler
                                    </button>
                                  </div>
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </Dialog>
                      </Transition>
                      <p className="text-sm leading-6 text-gray-900">
                        <button
                          disabled={false}
                          type="button"
                          onClick={(e) => onSubmitChange(e)}
                          style={{
                            display:
                              marche_public.statut.trim().toLowerCase() ===
                              "non payé"
                                ? "none"
                                : "block",
                          }}
                        >
                          <NavLink
                            to={`/clientlayout/pdf/${marche_public.numero_marche}`}
                          >
                            <DocumentArrowDownIcon
                              className="text-blue-500 w-7 h-7 animate-bounce"
                              aria-hidden="true"
                            />
                          </NavLink>
                        </button>
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        <button
                          type="button"
                          disabled={false}
                          style={{
                            display:
                              marche_public.statut.trim().toLowerCase() ===
                              "payé"
                                ? "none"
                                : "block",
                          }}
                        >
                          <NavLink
                            to={`/clientlayout/payment/${marche_public.numero_marche}`}
                          >
                            <CreditCardIcon
                              className="w-10 h-8 text-amber-600 animate-bounce"
                              aria-hidden="true"
                            />
                          </NavLink>
                        </button>
                      </p>
                    </div>

                    {marche_public.statut === "non payé" ? (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none p-1 rounded-full bg-red-500/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Non Payé
                        </p>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none p-1 rounded-full bg-emerald-500/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">Payé</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </>
  );
}
