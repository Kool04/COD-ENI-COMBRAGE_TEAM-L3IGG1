import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export default function About() {
  const { numero_marche } = useParams();
  const [user, setUser] = useState([]);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [numero_marche]);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const fetchUser = async () => {
    try {
      const result = await axios.get(
        "http://127.0.0.1:8000/api/marche/" + numero_marche
      );
      console.log(result.data.marches);
      setUser(result.data.marches);
    } catch (err) {
      console.log("erreur", err);
    }
  };

  const onsubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://127.0.0.1:8000/api/modifier/" + numero_marche,
        user
      );
      navigate("/clientlayout/marchepublic");
    } catch (err) {
      console.log("erreur de modification");
      setError("erruer de modification");
    }
  };

  const onCancel = () => {
    navigate('/clientlayout/marchepublic');
  };

  return (
    <>

      <div className="mx-auto max-w-5xl rounded-xl sm:px-6 lg:px-8 bg-white shadow-xl">
        <div>
          {error && (
            <div className="bg-red-500 text-white p-4 mt-4">
              <p>{error}</p>
            </div>
          )}
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
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-center text-gray-900">
              Information du marche publics
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Numero du marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, numero_marche: e.target.value })
                    }
                    value={user.numero_marche || " "}
                    disabled={!editable}
                    style={{
                      backgroundColor: editable
                        ? "white"
                        : "bg-gray-200 ring-gray-200",
                    }}
                    className="w-full block rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Numero du convention
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, numero_convention: e.target.value })
                    }
                    value={user.numero_convention || " "}
                    disabled={!editable}
                    style={{
                      backgroundColor: editable
                        ? "white"
                        : "bg-gray-200 ring-gray-200",
                    }}
                    className="w-full block rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Titulaire du marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, titulaire_marche: e.target.value })
                    }
                    value={user.titulaire_marche || " "}
                    disabled={!editable}
                    style={{
                      backgroundColor: editable
                        ? "white"
                        : "bg-gray-200 ring-gray-200",
                    }}
                    className="w-full block rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nature du marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, nature: e.target.value })
                    }
                    value={user.nature || " "}
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Objet
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    onChange={(e) =>
                      setUser({ ...user, objet: e.target.value })
                    }
                    disabled={!editable}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  bg-gray-200 ring-gray-200  ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={user.objet}
                  />
                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Montant du marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, montant_marche: e.target.value })
                    }
                    value={user.montant_marche + " " + "AR" || " "}
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  financement
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <select
                    id="country"
                    name="country"
                    onChange={(e) =>
                      setUser({ ...user, financement: e.target.value })
                    }
                    value={user.financement || " "}
                    disabled={!editable}
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>RPI</option>
                    <option>BAD</option>
                    <option>FC</option>
                    <option>FP</option>
                  </select>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Imputation Budgetaire
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        imputation_budgetaire: e.target.value,
                      })
                    }
                    value={user.imputation_budgetaire || " "}
                    disabled={!editable}
                    style={{
                      backgroundColor: editable
                        ? "white"
                        : "bg-gray-200 ring-gray-200",
                    }}
                    className="w-full block rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Compte
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, compte: e.target.value })
                    }
                    value={user.compte || " "}
                    disabled={!editable}
                    style={{
                      backgroundColor: editable
                        ? "white"
                        : "bg-gray-200 ring-gray-200",
                    }}
                    className="w-full block rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  mode de passation
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <select
                    id="country"
                    onChange={(e) =>
                      setUser({ ...user, mode_passation: e.target.value })
                    }
                    value={user.mode_passation || " "}
                    disabled={!editable}
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Appel d_offre ouvert</option>
                    <option>Manifestation d_interet</option>
                  </select>
                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Type de marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <select
                    id="country"
                    name="country"
                    onChange={(e) =>
                      setUser({ ...user, type_marche: e.target.value })
                    }
                    value={user.type_marche || " "}
                    disabled={!editable}
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Marche payes par le comptable public</option>
                    <option>Marche payes par les bailleurds de Fond</option>
                    <option>
                      Marche de travaux confie a des sous traitants
                    </option>
                  </select>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Fournisseur
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, fournisseur: e.target.value })
                    }
                    value={user.fournisseur || " "}
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nom fournisseur
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, nom_fournisseur: e.target.value })
                    }
                    value={user.nom_fournisseur || " "}
                    disabled={!editable}
                    style={{
                      backgroundColor: editable
                        ? "white"
                        : "bg-gray-200 ring-gray-200",
                    }}
                    className="w-full block rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  NIF du fournisseur
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, nif_fournisseur: e.target.value })
                    }
                    value={user.nif_fournisseur || " "}
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Lieu
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    value={user.lieu || " "}
                    onChange={(e) => setUser({ ...user, lieu: e.target.value })}
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date de signature
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="date"
                    value={user.date_signature || " "}
                    onChange={(e) =>
                      setUser({ ...user, date_signature: e.target.value })
                    }
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date d_approbation
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="date"
                    onChange={(e) =>
                      setUser({ ...user, date_approbation: e.target.value })
                    }
                    value={user.date_approbation || " "}
                    disabled={!editable}
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date de notification
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="date"
                    onChange={(e) =>
                      setUser({ ...user, date_notification: e.target.value })
                    }
                    value={user.date_notification || " "}
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date d_enregistrement
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, date_enregistrement: e.target.value })
                    }
                    value={user.date_enregistrement || " "}
                    disabled={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  dure de validite
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, dure_validite: e.target.value })
                    }
                    value={user.dure_validite || " "}
                    disabled={!editable}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button type="button" onClick={toggleEditable}>
                    <PencilSquareIcon
                      className="w-5 h-5 text-gray-500 "
                      aria-hidden="true"
                    />
                  </button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Statut
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, statut: e.target.value })
                    }
                    value={user.statut || " "}
                    disabled={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>

              <div className="flex items-center justify-end mt-6 gap-x-6">
                <button
                  type="submit"
                  onClick={(e) => onsubmitChange(e)}
                  className="px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Enregistrer
                </button>
                <button
                  type="submit"
                  onClick={onCancel}
                  className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Annuler
                </button>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
