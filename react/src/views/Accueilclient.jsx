import { GlobeAltIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

import { Helmet } from "react-helmet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";

const MySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (<motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.91 }}>
    <Slider {...settings}>

      <img
        src="/taxe4.jpg"
        alt="taxe4"
        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        width={3000}
        height={1442}
      />
      <img
        src="/taxe2.jpg"
        alt="taxe2"
        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        width={3000}
        height={1442}
      />
      <img
        src="/taxe3.jpg"
        alt="taxe3"
        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        width={3000}
        height={1442}
      />
      <img
        src="/taxe5.jpg"
        alt="taxe5"
        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        width={3000}
        height={1442}
      />
    </Slider>
    </motion.div>
  );
};

export default function Accueilclient() {
  const [count, setCount] = useState(0);
  const { currentUser } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseCount, responseCounts] = await Promise.all([
          axios.get(
            `http://127.0.0.1:8000/api/count_marche/${currentUser.nif}`
          ),
          axios.get(`http://127.0.0.1:8000/api/count_paye/${currentUser.nif}`),
        ]);
        setCount(responseCount.data.count);
        console.log(responseCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser.nif]);

  return (
    <>
      <Helmet>
        <title>Accueil client - Hetra Online</title>
      </Helmet>
      <div className="py-10 overflow-hidden bg-white sm:py-20">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.51 }}>
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  Hetra Online
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Bienvenue sur votre espace contribuable dou vous Pouvez regler
                  vos differents Taxe
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Simple,Rapide et Securise
                </p>
                <dl className="max-w-xl mt-10 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none" style={{backgroundColor:"#4B5563", borderRadius:"2rem", width:"45%"}}>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <GlobeAltIcon
                        className="absolute w-5 h-5 text-indigo-600 left-1 top-1"
                        aria-hidden="true"
                        style={{color:"white"}}
                      />
                    </dt>{" "}
                    <dd className="inline">
                      <h1 style={{color:"white"}}>Marche Public: {count}</h1>
                    </dd>
                  </div>
                </dl>
              </div></motion.div>
            <MySlider />
          </div>
        </div>
      </div>
    </>
  );
}
