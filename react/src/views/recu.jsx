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
      filename: "marche publics.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    element.style.width = `${contentWidth}mm`;
    element.style.height = `${contentHeigth}mm`;

    // Utiliser html2pdf pour générer le PDF
    html2pdf(element, options);
  };

  const { numero_payment } = useParams();
  const [user, setUser] = useState([]);
  const { currentUser } = useStateContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [numero_payment]);

  const fetchUser = async () => {
    try {
      const result = await axios.get(
        "http://127.0.0.1:8000/api/payment/" + numero_payment
      );
      console.log(result.data);
      setUser(result.data);
    } catch (err) {
      console.log("erreur", err);
      setError("erreur lors de l'ajout");
    }
  };

  return (
    <div>
      {/*{error && (
        <div className="bg-red-500 text-white p-4 mt-4">
          <p>{error}</p>
        </div>
      )}*/}
      <div
        id="pdf-content"
        className="flex-col w-[1123px] h-[794px] mx-auto my-10 bg-white pb-9 px-14 "
      >
        <div>
          <p>nom de la banque: {user.banque}</p>
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
