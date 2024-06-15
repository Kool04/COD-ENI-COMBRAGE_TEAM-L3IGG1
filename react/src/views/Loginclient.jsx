import { motion } from "framer-motion";
import {
  ArrowLeftOnRectangleIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [nif, setNif] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Nouvel état pour "Remember Me"
  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate();

  const onPrec = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous allez revenir à la page précédente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, revenir en arrière!'
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
      }
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    axiosClient
      .post("/loginClient", {
        nif,
        password,
        remember_token: rememberMe, // Envoyer l'état de rememberMe
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        Swal.fire({
          title: 'Succès!',
          text: 'Connexion réussie',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        navigate("/clientlayout");
      })

      .catch((error) => {
        Swal.fire({
      title: 'Oupss !',
      icon: 'error',
      text: 'Verifiez votre mot de passe !',
      confirmButtonText: 'Ok'
    });
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: finalErrors.join("<br>") });
          Swal.fire({
            title: 'Oupss !!',
            html: finalErrors.join("<br>"),
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else {
          Swal.fire({
            title: 'Oupss !!',
            text: 'Une erreur inconnue est survenue.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center mt-15 ">
      <div
        style={{
          borderRadius: 30,
          position: "fixed",
          top: 15,
          left: 15,
          width: 40,
          height: 40,
        }}
        onClick={onPrec}
      >
        <ArrowLeftIcon className="w-7 h-7 m-2 text-white" aria-hidden="true" />
      </div>

      <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transform hover:scale-105 transition-transform duration-300"
        style={{
          borderRadius: 30,
        }}
      >
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8  transform hover:scale-105 transition-transform duration-300">
          Se connecter
        </h2>
        </motion.div>
        {error.__html && (
          <div
            className="px-3 py-2 text-white bg-red-500 rounded"
            dangerouslySetInnerHTML={error}
          ></div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nif"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              NIF
            </label>
            <input
              id="nif"
              name="nif"
              type="text"
              required
              value={nif}
              onChange={(ev) => setNif(ev.target.value)}
              className="w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1  transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 "
            >
              Mot de passe
            </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1  transform hover:scale-105 transition-transform duration-300"
              />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <EyeSlashIcon
                  className="h-6 w-6 text-gray-500 mt-5"
                  aria-hidden="true"
                />
              ) : (
                <EyeIcon
                  className="h-6 w-6 text-gray-500  mt-5"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          <div className="flex items-center">
            <input
              id="remember_token"
              name="remember_token"
              type="checkbox"
              checked={rememberMe}
              onChange={(ev) => setRememberMe(ev.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 0 , x:80}}
            animate={{ opacity: 1, y: 0 , x:0}}
            transition={{ duration: 0.85 }}>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  transform hover:scale-105 transition-transform duration-300"
            >
              <span className="flex items-center justify-center ">
                Se connecter
                <ArrowLeftOnRectangleIcon
                  className="w-5 h-5 mr-2 ml-5"
                  aria-hidden="true"
                />
              </span>
            </button>
            </motion.div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Le login est votre NIF, le mot de passe est celui que vous avez reçu
          lors de la validation du NIFONLINE. <br />
          <div className=" transform hover:scale-105 transition-transform duration-300">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500 "
            >
              Besoin d`aide ? Contactez-nous
            </a>
          </div>
        </p>
        </motion.div>
    </div>
  );
}
