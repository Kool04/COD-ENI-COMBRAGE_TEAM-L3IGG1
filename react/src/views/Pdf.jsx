//import React from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import QRCode from "qrcode.react";

export default function Pdf() {
  const contentWidth = 190;
  const contentHeigth = 255;
  const generatePdf = () => {
    // Récupérer la div à imprimer
    const element = document.getElementById("pdf-content");

    const options = {
      margin: 5,
      filename: "recu payment.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "a4", orientation: "paysage" },
    };
    element.style.width = `${contentWidth}mm`;
    element.style.height = `${contentHeigth}mm`;

    // Utiliser html2pdf pour générer le PDF
    html2pdf(element, options);
  };

  const { numero_marche } = useParams();
  const [user, setUser] = useState([]);
  const { currentUser } = useStateContext();
  const [error, setError] = useState(null);

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
      setError("erreur du chargement du pdf");
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-500 text-white p-4 mt-4">
          <p>{error}</p>
        </div>
      )}
      <div
        id="pdf-content"
        className="flex-col w-[794px] h-[1123px] mx-auto my-10 bg-white pb-9 px-14 "
      >
        <div className="py-0 mt-0 pb-9">
          <img
            className="w-auto mx-auto mt-0"
            src="/finance.png"
            alt="finance"
            style={{ width: "180px", height: "100px" }}
          />
        </div>
        <div className="px-4 mb-10 sm:px-0">
          <h1 className="mt-0 mb-3 text-base font-semibold leading-7 text-center text-gray-900">
            ********** <br />
            {user.titulaire_marche} <br /> **********
          </h1>
        </div>
        <div className="mb-5 ">
          <p className="mb-3">
            <u>Financement:</u>
            {"  " + user.financement}
          </p>
          <p className="mb-3">
            <u>Imputation Budgetaire:</u>
            {"  " + user.imputation_budgetaire}
          </p>
          <p className="mb-3">
            <u>Compte:</u>
            {"  " + user.compte}
          </p>
          <p className="mb-3">
            <u>Montant:</u> (en ARIARY)
          </p>
        </div>
        <table
          className="mx-auto mb-12 border "
          style={{ border: "1px solid black" }}
        >
          <tbody>
            <tr>
              <td
                className="font-bold"
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {user.pourcentage !== 0
                  ? "Montant du marche y compris TMP 8%"
                  : "Montant du marché"}
              </td>
              <td
                className="font-bold"
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {"  " + user.montant_marche + " " + "AR"}
              </td>
            </tr>
            {user.pourcentage !== 0 && user.pourcentage && (
              <tr>
                <td
                  className="font-bold"
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  TMP(8%)
                </td>
                <td
                  className="font-bold"
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {"  " + user.pourcentage + " " + "AR"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mb-2 sm:px-0 ">
          <h1 className="mt-0 mb-3 text-base font-semibold leading-7 text-center text-gray-900">
            {" " + user.numero_convention}
          </h1>
        </div>
        <div className="mx-auto mb-2 ">
          <p className="mb-3 text-center">
            <u>O B J E T:</u>
            {" " + user.objet}
          </p>

          <p className="mb-2 text-center">
            <strong>
              <u>Fournisseur:</u>
            </strong>
            {" " + user.nom_fournisseur}--{user.fournisseur}
            <br />
            {currentUser.adresse_actuel}
          </p>
          <p className="mb-2 text-center">
            <strong>
              <u>Statistique:</u>
            </strong>
            {" " + currentUser.statistique}
          </p>
          <p className="mb-2 text-center">
            <strong>
              <u>NIF:</u>
            </strong>

            {" " + user.nif_fournisseur}
          </p>
        </div>
        <div className="px-4 mb-6 mt-2">
          <p className="mb-3">
            <u>Date de signature :</u> {" " + user.date_signature}
          </p>

          <p className="mb-3">
            <u>Date d&apos;approbation:</u>
            {" " + user.date_approbation}
          </p>

          <p className="mb-3">
            <u>Date de Notification :</u> {" " + user.date_notification}
          </p>

          <p className="mb-3">
            <u>Duree de Validite :</u> {" " + user.dure_validite}
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <QRCode className="w-5 h-5" value={user.numero_marche} size={90} />
        </div>
      </div>
      <div className="mx-auto ">
        <button
          onClick={generatePdf}
          className="p-2 mt-4 text-white bg-blue-500 "
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}
