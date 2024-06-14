import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axiosClient from "../axios.js";
//import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {
  // const { setCurrentUser, setUserToken } = useStateContext();
  const [nif, setNif] = useState("");
  const [nom_entite, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  //const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/signup", {
        nif,
        nom_entite,
        mdp,
      })
      .then(({ data }) => {
        if (data && data.message) {
          // Utilisez data.message ou d'autres propriétés nécessaires
          console.log(data.message);
          // Redirigez l'utilisateur ou effectuez d'autres actions nécessaires
        } else {
          console.error("Réponse du serveur incomplète :", data);
        }
      })
      .catch((error) => {
        if (error.response) {
          /*const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });*/
        } else {
          console.error("Erreur lors de la requête :", error);
        }
      });
  };

  return (
    <>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
        Signup for free
      </h2>
      <p className="mt-2 text-sm text-center text-gray-600">
        Or{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login with your account
        </Link>
      </p>

      {error.__html && (
        <div
          className="px-3 py-2 text-white bg-red-500 rounded"
          dangerouslySetInnerHTML={error}
        ></div>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="full-name" className="sr-only">
              nif
            </label>
            <input
              id="nif"
              name="nif"
              type="text"
              required
              value={nif}
              onChange={(ev) => setNif(ev.target.value)}
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Nom entite
            </label>
            <input
              id="nom"
              name="nom_entite"
              type="text"
              //autoComplete="email"
              required
              value={nom_entite}
              onChange={(ev) => setNom(ev.target.value)}
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="mdp"
              name="mdp"
              type="password"
              autoComplete="current-password"
              required
              value={mdp}
              onChange={(ev) => setMdp(ev.target.value)}
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Signup
          </button>
        </div>
      </form>
    </>
  );
}
