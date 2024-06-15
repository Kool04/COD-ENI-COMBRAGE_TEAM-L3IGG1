import { useEffect, useState, Fragment } from "react";
import {
  ChatBubbleLeftIcon,
  InformationCircleIcon,

  //PencilIcon,
} from "@heroicons/react/20/solid";
//import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Dialog, Transition } from "@headlessui/react";

//import { useNavigate } from "react-router-dom";
import { BellAlertIcon } from "@heroicons/react/24/outline";
//import { useStateContext } from "../contexts/ContextProvider";
import SearchBar from "../components/SearchBar";

/*function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}*/

export default function Client() {
  const { currentUser } = useStateContext();
  const [allUsers, setAllcountry] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notificationSent, setNotificationSent] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedNif, setSelectedNif] = useState(null);
  const [allMessages, setAllMessages] = useState([]);

  const [userField, setUserField] = useState({
    message: "",
    id_sent: currentUser.id,
  });

  function closeModal() {
    setIsChatOpen(false);
  }

  function openModal() {
    setUserField({
      ...userField,
      message: "",
    });
    setIsChatOpen(true);
  }

  const chatClick = (nif_fournisseur) => {
    setSelectedNif(nif_fournisseur);
    openModal();
  };

  useEffect(() => {
    fetchData();
    fetchMessages();
    if (isChatOpen && selectedNif) {
      fetchMessages(selectedNif);
    }
  }, [currentUser.id]);

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

  const fetchMessages = async (nif) => {
    try {
      if (currentUser.nif) {
        const results = await axios(
          `http://127.0.0.1:8000/api/getmess/${currentUser.nif}/${nif}`
        );
        const userDataArray = Array.isArray(results.data.results)
          ? results.data.results
          : [results.data.results];
        setAllMessages(userDataArray);
        alert(results);
      }
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

  const changeUserFieldHandler = (e) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === "file" ? files[0] : value;

    setUserField({
      ...userField,
      [name]: fieldValue,
    });
  };

  const onSend = async (nif) => {
    //nif.preventDefault();
    try {
      //alert(nif);
      const dataToSend = {
        id_receiv: nif, // Remplacez 1 par l'ID du destinataire approprié
        id_sent: currentUser.id.toString(),
        message: userField.message,
      };
      //const cleanUserField = JSON.parse(JSON.stringify(userField));
      await axios.post("http://127.0.0.1:8000/api/sendMess", dataToSend);

      console.log("Message envoyé avec succès");
      setIsDialogOpen(true);
    } catch (err) {
      console.error("Erreur lors de l'envoi du message", err);
    }
  };

  return (
    <>
      <main>
        <div className="max-w-sm mx-auto sm:px-6 lg:px-8 mr-5">
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
        <div className="mx-auto max-w-5xl rounded-xl sm:px-6 lg:px-8 bg-white shadow-xl">
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
                        <button
                          type="button"
                          onClick={() =>
                            chatClick(marche_public.nif_fournisseur)
                          }
                        >
                          <ChatBubbleLeftIcon
                            className="w-8 text-blue-500 h-7 "
                            aria-hidden="true"
                          />
                        </button>
                      </p>

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
      <Transition appear show={isChatOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Chat
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Ici, vous pouvez discuter avec l&apos;utilisateur.
                    </p>
                  </div>

                  {/* Affichage des messages */}
                  <div>
                    {allMessages.map((message) => (
                      <div key={message.id_sent} className="text-gray-500">
                        {message.message}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <textarea
                      className="w-full p-2 border rounded-md"
                      placeholder="Tapez votre message..."
                      id="message"
                      name="message"
                      onChange={(e) => changeUserFieldHandler(e)}
                    ></textarea>

                    <button
                      type="button"
                      className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={async () => {
                        await onSend(selectedNif);
                        setSelectedNif(null);
                        closeModal();
                      }}
                    >
                      Envoyer
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      );
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
