import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  XMarkIcon,
  HomeIcon,
  GlobeAltIcon,
  CreditCardIcon,
  TrashIcon,
  UserCircleIcon,
  MapPinIcon,
  IdentificationIcon,
  CubeTransparentIcon,
  CalendarIcon,
  FaceSmileIcon,
  QueueListIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CalculatorIcon,
  ArrowsRightLeftIcon,
  MapIcon,
  //ClibboardDocumentIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Swal from 'sweetalert2';
//import axiosClient from "../axios";
import axios from "axios";
import { Dialog } from "@headlessui/react";
//import { XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Accueil", to: "/clientlayout/accueilclient" },
  { name: "Marche public", to: "/clientlayout/marchepublic" },
  { name: "Payement", to: "/clientlayout/listePayment" },
];
const userNavigation = [
  // { name: 'logout', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ClientLayout() {
  const { currentUser, userToken } = useStateContext();
  const [openProfil, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/modifnotif/${notificationId}`);
      // Mettez à jour localement les données de l'utilisateur après la mise à jour réussie
      setUserData((prevData) =>
        prevData.map((notification) =>
          notification.id === notificationId
            ? { ...notification, statut: 0 }
            : notification
        )
      );
      // Mettez à jour le nombre de nouvelles notifications non lues
      setNewNotificationsCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de la notification :",
        error
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete("http://127.0.0.1:8000/api/supprimernotif/" + id);

      // Mettre à jour localement les données après la suppression réussie
      setUserData((prevData) =>
        prevData.filter((notification) => notification.id !== id)
      );

      // Mettre à jour le nombre de nouvelles notifications non lues (si nécessaire)
      const updatedUnreadNotifications = userData.filter(
        (notification) => notification.id !== id && notification.statut === 1
      );
      setNewNotificationsCount(updatedUnreadNotifications.length);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la notification :",
        error
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser.nif) {
          const result = await axios.get(
            `http://127.0.0.1:8000/api/notification/${currentUser.nif}`
          );

          const unreadNotifications = result.data.results.filter(
            (notification) => notification.statut === 1
          );

          setUserData(result.data.results);
          setNewNotificationsCount(unreadNotifications.length);
        }
      } catch (err) {
        console.log(
          "Erreur lors de la récupération des notifications de l'utilisateur",
          err
        );
      }
    };
    fetchData();
  }, [currentUser.nif]);

  if (!userToken) {
    return <Navigate to="/loginclient" />;
  }
  const logout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voullez vous vraiment vous déconnecter",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Déconnecter'
    }).then((result) => {
      if (result.isConfirmed) {

    navigate("/loginClient"); }
    });
  };


  return (
    <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.51 }}>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex ml-4 lg:ml-0">
                      <img
                        className="w-auto h-8"
                        src="/DGI.png"
                        alt="DGI"
                        style={{ width: "150px", height: "80px" }}
                      />
                    </div>

                    <div className="hidden md:block">
                      <div className="flex items-baseline ml-10 space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                              classNames(
                                isActive
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2  text-sm font-medium"
                              )
                            }
                          >
                            <div className="flex items-center">
                              {item.name === "Accueil" && (
                                <HomeIcon className="w-5 h-5 mr-2" />
                              )}
                              {item.name === "Marche public" && (
                                <GlobeAltIcon className=" animate-spin w-5 h-5 mr-2" />
                              )}
                              {item.name === "Payement" && (
                                <CreditCardIcon className="w-5 h-5 mr-2" />
                              )}
                              {item.name}
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="flex items-center ml-4 md:ml-6">
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button
                            onClick={() => {
                              // Mettez à jour l'état lorsque l'utilisateur clique
                              setNewNotificationsCount(0); // Réinitialiser le nombre de nouvelles notifications
                            }}
                            className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />

                            {/* Affichez le nombre de nouvelles notifications uniquement s'il y en a */}
                            {newNotificationsCount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                                {newNotificationsCount > 9
                                  ? "+9"
                                  : newNotificationsCount}
                              </span>
                            )}

                            <BellIcon className="w-6 h-6 text-white rounded-full" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-80 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {userData.length === 0 ? (
                                <p className="px-4 py-2 text-sm text-gray-700">
                                  Aucune notification
                                </p>
                              ) : (
                                <ul className="block px-4 py-2 text-sm text-gray-700 divide-y divide-gray-100">
                                  {userData.map((notification_client) => (
                                    <li
                                      key={notification_client.id}
                                      onClick={() =>
                                        markNotificationAsRead(
                                          notification_client.id
                                        )
                                      }
                                      className={`flex items-center cursor-pointer ${
                                        notification_client.statut === 1
                                          ? "font-bold"
                                          : ""
                                      }`}
                                    >
                                      {notification_client.message}
                                      <br />
                                      <p className="text-gray-300">
                                        {notification_client.date}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleDelete(notification_client.id);
                                        }}
                                      >
                                        <TrashIcon className="w-5 h-5 ml-1 text-red-500" />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="w-6 h-6 text-white rounded-full" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 w-40 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <a
                                href="#"
                                onClick={() => {
                                  openModal();
                                }}
                                className={
                                  "block px-4 py-2 text-sm text-gray-700"
                                }
                              >
                                A propos
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                href="#"
                                onClick={(ev) => logout(ev)}
                                className={
                                  "block px-4 py-2 text-sm text-gray-700"
                                }
                              >

                                Se déconnecter
                                      </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  {/* Profil */}
                  <Transition.Root show={openProfil} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={setIsOpen}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                              as={Fragment}
                              enter="transform transition ease-in-out duration-500 sm:duration-700"
                              enterFrom="translate-x-full"
                              enterTo="translate-x-0"
                              leave="transform transition ease-in-out duration-500 sm:duration-700"
                              leaveFrom="translate-x-0"
                              leaveTo="translate-x-full"
                            >
                              <Dialog.Panel className="bg-white shadow pointer-events-auto relative w-screen max-w-md">
                                <Transition.Child
                                  as={Fragment}
                                  enter="ease-in-out duration-500"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="ease-in-out duration-500"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                    <button
                                      type="button"
                                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <span className="absolute -inset-2.5" />
                                      <span className="sr-only">
                                        Close panel
                                      </span>
                                      <XMarkIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </Transition.Child>
                                <div className="flex h-full flex-col overflow-y-scroll bg-gray-200 py-6 shadow-xl">
                                  <div className="border mx-2 mt-5 bg-white rounded-xl shadow-2xl">
                                    <div className="px-4 sm:px-6">
                                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                        Vos informations:
                                      </Dialog.Title>
                                    </div>

                                    <div className=" m-5 relative mt-0 flex-1 px-4 sm:px-6">
                                      <div className="flex items-center justify-center">
                                        <UserCircleIcon className=" text-red-600 h-12 w-12 animate-bounce" />
                                      </div>
                                      <p className=" text-center">
                                        <strong>
                                          <u> {currentUser.nom_entite}:</u>{" "}
                                        </strong>
                                      </p>
                                      <p className=" flex items-center mt-1 ">
                                        <IdentificationIcon className="text-green-600 h-5 w-5 m-1 " />
                                        <u>Responsable:</u>
                                        {" " + currentUser.nom_responsable}
                                      </p>
                                      <p className=" flex items-center mt-1">
                                        <CubeTransparentIcon className="text-blue-600 h-5 w-5 m-1 animate-spin" />
                                        <u>NIF:</u>
                                        {" " + currentUser.nif}
                                      </p>
                                      <p className=" flex items-center mt-1">
                                        <EnvelopeIcon className="text-gray-600 h-5 w-5 m-1" />
                                        <u>email:</u>
                                        {" " + currentUser.email}
                                      </p>
                                      <p className=" flex items-center mt-1">
                                        <MapPinIcon className="text-red-600 h-5 w-5 m-1 animate-bounce" />
                                        <u>localisation:</u>
                                        {" " + currentUser.localisation}
                                      </p>
                                      <p className="flex items-center mt-1">
                                        <FaceSmileIcon className="text-yellow-600 h-5 w-5 m-1 " />
                                        <u>Activite:</u>
                                        {" " + currentUser.activite}
                                      </p>
                                      <p className=" flex items-center mt-1">
                                        <QueueListIcon className="text-orange-600 h-5 w-5 m-1" />
                                        <u>statistique:</u>
                                        {" " + currentUser.statistique}
                                      </p>
                                      <p className="flex items-center mt-1">
                                        <CalendarIcon className="text-green-600 h-5 w-5 m-1" />
                                        <u>Delivrance Stat:</u>
                                        {" " + currentUser.delivrance_stat}
                                      </p>
                                      <p className=" flex items-center mt-1">
                                        <DocumentTextIcon className="text-violet-600 h-5 w-5 m-1" />
                                        <u>registre de commerce:</u>
                                        {" " + currentUser.registre_commerce}
                                      </p>
                                      <p className="flex items-center mt-1">
                                        <CalendarDaysIcon className="text-green-600 h-5 w-5 m-1" />
                                        <u>Date de commerce:</u>
                                        {" " + currentUser.date_commerce}
                                      </p>
                                      <p className="flex items-center mt-1">
                                        <CalculatorIcon className="text-red-600 h-5 w-5 m-1" />
                                        <u>debut exercice comptable:</u>
                                        {" " +
                                          currentUser.debut_exercicecomptable}
                                      </p>
                                      <p className="flex items-center mt-1">
                                        <ArrowsRightLeftIcon className="text-blue-600 h-5 w-5 m-1" />
                                        <u>importation ou exportation:</u>
                                        {" " + currentUser.impo_expo}
                                      </p>
                                      <p className="flex items-center mt-1">
                                        <MapIcon className="text-red-600 h-5 w-5 m-1" />
                                        <u>Adresse Actuel:</u>
                                        {" " + currentUser.adresse_actuel}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>

                  {/* Profil */}
                  <div className="flex -mr-2 md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-white rounded-full" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {currentUser.nom_entite}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {currentUser.nif}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <div className="flex items-center">
                        <EnvelopeIcon
                          className="w-6 h-6 mr-2 text-white rounded-full"
                          aria-hidden="true"
                        />
                        <BellIcon className="w-6 h-6 text-white rounded-full" />
                      </div>
                    </button>
                  </div>

                  <div className="px-2 mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href="#"
                        onClick={(ev) => logout(ev)}
                        className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                      >
                        sign out
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Outlet />
      </div>
      </motion.div>
  );
}
