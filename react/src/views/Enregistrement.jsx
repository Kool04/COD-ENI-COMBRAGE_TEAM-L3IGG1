import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon ,
  ArrowLeftIcon, } from "@heroicons/react/20/solid";

export default function Enregistrement() {
  const [userField, setUserField] = useState({
    numero_marche: "",
    numero_convention: "",
    titulaire_marche: "",
    nature: "",
    objet: "",
    montant_marche: "",
    financement: "",
    imputation_budgetaire: "",
    compte: "",
    mode_passation: "",
    type_marche: "",
    fournisseur: "",
    nom_fournisseur: "",
    nif_fournisseur: "",
    lieu: "",
    date_signature: "",
    date_approbation: "",
    date_notification: "",
    date_enregistrement: "2023-06-5",
    dure_validite: "",
    statut: "aaaaaaaaaaaaaaaa",
    pourcentage: "",
  });

  const onPrec = (e) => {
    e.preventDefault();
    window.history.back();
  };
  const navigate = useNavigate();
  const { currentUser } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(true);

  /* function openModal2() {
    setIsOpen2(true);
  }*/

  function closeModal2() {
    setIsOpen2(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,

      [e.target.name]: e.target.value,
    });
    console.log(userField);
  };

  useEffect(() => {
    setUserField({
      ...userField,
      nif_fournisseur: currentUser.nif || "",
      fournisseur: currentUser.nom_entite || "",
      nom_fournisseur: currentUser.nom_responsable || "",
    });
  }, [currentUser.nif, currentUser.nom_entite, currentUser.nom_responsable]);

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ajouter",
        userField
      );
      navigate("/clientlayout/marchepublic");
      console.log(response);
    } catch (err) {
      console.log("erreur d'ajout");
      if (err.response) {
        // La requête a été faite et le serveur a répondu avec un statut d'erreur
        console.log(err.response.data); // Contient les détails de l'erreur du serveur
        console.log(err.response.status); // Contient le statut de l'erreur du serveur
      } else if (err.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.log(err.request);
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.log("Error", err.message);
      }
      console.log(err.config);
    }
  };

  const onCancel = () => {
    navigate("/clientlayout/marchepublic");
  };
  const Annuler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <main><div
        style={{
          borderRadius: 30,
          position: "fixed",
          top: 15,
          left: 15,
          width: 40,
          height: 40,
          backgroundColor: "#444",
        }}
        onClick={onPrec}
      >
        <ArrowLeftIcon className="w-7 h-7 m-2 text-white" aria-hidden="true" />
      </div>
        <div className="py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <form>
            <div className="flex ml-4 lg:ml-0"></div>
            <div className="space-y-12">
              <div className="pb-12 border-b border-gray-900/10">
                <h2 className="mt-3 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                  Ajouter Marche publics
                </h2>
                <h2 className="text-base font-semibold leading-7 text-center text-gray-900">
                  Avertissement!!
                </h2>
                <p className="mt-0 text-sm leading-6 text-center text-gray-600">
                  Veuillez bien verifier vos informations que vous faites entrer
                  dans les formulaires avant de les valider
                </p>
              </div>

              <div className="mx-auto max-w-5xl rounded-xl sm:px-6 lg:px-8 bg-white shadow-xl">
                <h2 className="text-base font-semibold leading-7 text-center text-gray-900">
                  Information a propos du marche Publics
                </h2>
                <p className="mt-1 text-sm leading-6 text-center text-gray-600">
                  Utiliser les informations a propos de votre marche publics
                </p>

                <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Numero du marche
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="numero_marche"
                        id="numero_marche"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Numero convention
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="numero_convention"
                        id="numero_convention"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Titulaire du marche
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="titulaire_marche"
                        id="titulaire_marche"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Nature
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="nature"
                        id="nature"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Objet
                    </label>
                    <div className="mt-2">
                      <textarea
                        name="objet"
                        id="objet"
                        onChange={(e) => changeUserFieldHandler(e)}
                        rows={4}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      montant du marche (Ar)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="montant_marche"
                        id="montant_marche"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Financement
                    </label>
                    <div className="mt-2">
                      <select
                        id="financement"
                        name="financement"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option> </option>
                        <option>RPI</option>
                        <option>BAD</option>
                        <option>FC</option>
                        <option>FP</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Imputation budgetaire
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="imputation_budgetaire"
                        id="imputation_budgetaire"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Compte
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="compte"
                        id="compte"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Mode de Passation
                    </label>
                    <div className="mt-2">
                      <select
                        id="mode_passation"
                        name="mode_passation"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option> </option>
                        <option>Appel d_offre ouvert</option>
                        <option>Manifestation d_interet</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Type de marche
                    </label>
                    <div className="mt-2">
                      <select
                        id="type_marche"
                        name="type_marche"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option> </option>
                        <option>Marche payes par le comptable public</option>
                        <option>Marche payes par les bailleurds de Fond</option>
                        <option>
                          Marche de travaux confie a des sous traitants
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Lieu du marche
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lieu"
                        id="lieu"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      date de signature
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="date_signature"
                        id="date_signature"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      date d_approbation
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="date_approbation"
                        id="date_approbation"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      date de notification
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="date_notification"
                        id="date_notification"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Dure de validite
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="dure_validite"
                        id="dure_validite"
                        onChange={(e) => changeUserFieldHandler(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="flex items-center justify-end mt-6 gap-x-6">
                    <button
                        type="button"
                        onClick={() => {
                          openModal();
                        }}
                        className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={onCancel}
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900 bg-indigo-100 rounded-md shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100 pr-6 pl-5 "
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
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
                          <CheckIcon
                            className="w-6 h-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Ajouter Nouveau Marcher
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Êtes-vous sûr de vouloir Ajouter ce nouveau Marche?
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={(e) => {
                              onSubmitChange(e);
                              closeModal();
                            }}
                          >
                            Ajouter
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 mx-4 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={Annuler}
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
          </form>
        </div>
        <Transition appear show={isOpen2} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal2}>
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
                      Veuillez lire s&apos;vous plait
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm">
                        <strong>QU’EST CE QU’UN MARCHE PUBLIC?</strong> <br />{" "}
                        Art. 2 - Loi 2016-055 du 25 janvier 2017 portant CMP 
                        MP = « contrats administratifs écrits, conclus à titre
                        onéreux avec des personnes publiques, ou privées par les
                        autorités contractantes…pour répondre à leurs besoins en
                        matière de travaux, de fournitures, de services ou de
                        prestations intellectuelles
                      </p>
                      <p>
                        les marchés conclus pour l’application d’un accord
                        international concernant le stationnement de troupes
                        <br />
                        Les marchés ayant pour objet l’acquisition ou la
                        location de terrains, de bâtiments existants ou d’autres
                        biens immeubles ou qui concernent d’autres droits sur
                        ces biens les marchés passés par les représentations
                        diplomatiques et/ou consulaires de Madagascar et aux
                        marchés passés par les représentations extérieures des
                        sociétés d’Etat
                        <br />
                        les marchés relatifs à la confection ou à l’acquisition
                        des imprimés administratifs passés avec l’Imprimerie
                        Nationale
                        <br />
                        les marchés relatifs à l’arbitrage et à la conciliation
                        <br />
                        les marchés de services financiers (émission, achat,
                        vente et transfert de titre, services fournis par la
                        Banque Centrale et autres instruments financiers) Les
                        marchés de service d’emprunt
                        <br />
                        Les marchés de service juridique : certification et
                        authentification de documents par les notaires, services
                        fournis par les administrateurs/tuteurs/prestataires
                        désignés par une juridiction, service d’avocat,
                        d’huissiers, de commissaires-priseurs et tous autres
                        auxiliaires de justice, tous services liés à l’exercice
                        de la puissance publique (???)
                        <br />
                        <strong>
                          Les obligations éthiques des candidats et titulaires
                          des marchés publics:
                        </strong>
                        <br />
                        S’engagent expressément à faire preuve d’intégrité,
                        d’honnêteté, de diligence, de transparence et de
                        confidentialité en répondant notamment avec exactitude
                        et objectivité aux renseignements sollicités par tout
                        organe de la commande publique (valeur de la signature
                        de l’acte d’engagement)
                        <br />
                        S’engagent expressément à renoncer à toute pratique de
                        corruption passive ou de trafic d’influence (clauses des
                        DAO notamment des bailleurs de fonds)
                        <br />
                        <strong>
                          Des sanctions à l’encontre du soumissionnaire ou du
                          titulaire
                        </strong>
                        <br />
                        Confiscation des garanties constituées dans le cadre de
                        l’appel d’offres Exclusion de toute procédure de
                        passation de marché pour une durée déterminée
                        (applicable pour toute entreprise où le sanctionné a une
                        part majoritaire de capital)
                        <br />
                        Retrait d’agrément ou de certificat de qualification
                        pour une durée déterminée
                        <br />
                        Pénalité de retard en cas d’inexécution dans les délais
                        contractuels Mise en régie (substitution du titulaire
                        par une autre entreprise aux risques et périls de
                        l’entreprise défaillante : passation du nouveau contrat
                        à la charge financière de l’entreprise défaillante)
                        <br />
                        <strong>
                          Des sanctions à l’encontre des acteurs de la commande
                          publique
                        </strong>
                        <br />
                        Amende (suivant Loi 2004-006 du 26 juillet 2004 portant
                        réorganisation et fonctionnement du CDBF)
                        <br />
                        Sanctions pénales et administratives
                        <br />
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal2}
                      >
                        Lu, Continuer!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </>
  );
}
