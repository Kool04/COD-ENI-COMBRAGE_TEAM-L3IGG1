import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Payment() {
  const { numero_marche } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  const [userField, setUserField] = useState({
    numero_payment: "",
    nif: "",
    numero_marche: numero_marche,
    compte_exp: "",
    compte_dest: "",
    montant: "",
    banque: "",
    code_etablisement: "",
    code_guichet: "",
    RIB: "",
    motif: "",
    date_payment: "",
  });

  useEffect(() => {
    fetchUser();
    setUserField({
      ...userField,
      nif: currentUser.nif || " ",
    });
  }, [currentUser.nif, numero_marche]);

  const fetchUser = async () => {
    try {
      const result = await axios.get(
        "http://127.0.0.1:8000/api/marche/" + numero_marche
      );
      //console.log(result.data.marches);

      setUserField((prevUserField) => ({
        ...prevUserField,
        montant: result.data.marches.pourcentage || "",
      }));

      setUser(result.data.marches);
    } catch (err) {
      console.log("erreur", err);
    }
  };

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
    console.log(userField);
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/payer",
        userField
      );
      navigate("/clientlayout/marchepublic");
      console.log(response);
    } catch (err) {
      console.log("erreur d'ajout");
    }
  };

  return (
    <div className="px-6 bg-white py-9 isolate sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        {/* fond */}
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#74e6f7] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
        {/* fond */}
      </div>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Payement du marché {user.numero_marche}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">{user.nature}</p>
      </div>
      <form
        action="#"
        method="POST"
        className="max-w-xl mx-auto mt-16 sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Numero du payment
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="numero_payment"
                id="numero_payment"
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Numero de compte expediteur
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="compte_exp"
                id="compte_exp"
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Numero du compte destinataire
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="compte_dest"
                id="compte_dest"
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Montant
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="montant"
                id="montant"
                value={user?.pourcentage || ""}
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Banque
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="banque"
                id="banque"
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Code Etablissement
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="code_etablisement"
                id="code_etablisement"
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Code Guichet
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="code_guichet"
                id="code_guichet"
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              RIB
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="RIB"
                id="RIB"
                onChange={(e) => changeUserFieldHandler(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Motif
            </label>
            <div className="mt-2.5">
              <textarea
                name="motif"
                id="motif"
                onChange={(e) => changeUserFieldHandler(e)}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            onClick={(e) => onSubmitChange(e)}
            className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Payer
          </button>
        </div>
      </form>
    </div>
  );
}
