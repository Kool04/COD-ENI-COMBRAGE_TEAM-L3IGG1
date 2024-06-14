import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function About() {
  const { numero_marche } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, [numero_marche]);

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

  return (
    <>
      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div>
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
                  {user.numero_marche}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Numero de Convention
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.numero_convention}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Titulaire du marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.titulaire_marche}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nature du marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.nature}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Objet
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.objet}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Montant du marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.montant_marche}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  financement
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.financement}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Imputation Budgetaire
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.imputation_budgetaire}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  mode de passation
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.mode_passation}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Type de marche
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.type_marche}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Fournisseur
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.fournisseur}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nom du Fournisseur
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.nom_fournisseur}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  NIF du fournisseur
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.nif_fournisseur}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Lieu
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.lieu}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date de signature
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.date_signature}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date d_approbation
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.date_approbation}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date de notification
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.date_notification}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date d_enregistrement
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.date_enregistrement}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  dure de validite
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.dure_validite}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Statut
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.statut}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  TMP 8%(AR)
                </dt>
                <dd className="flex items-center mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.pourcentage}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
