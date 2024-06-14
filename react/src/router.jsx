import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Marchepublic from "./views/Marchepublic";
import Accueil from "./views/Accueil";
import Loginadmi from "./views/Loginadmi";
import Loginclient from "./views/Loginclient";
import DefaultLayout from "./components/DefaultLayout";
import ClientLayout from "./components/ClientLayout";
import Enregistrement from "./views/Enregistrement";
import About from "./views/About";
import Payment from "./views/Payment";
import Pdf from "./views/Pdf";
import Recu from "./views/recu";
import AdmiLayout from "./components/AdmiLayout";
import Admi from "./views/Admi";
import Aboutadmi from "./views/Aboutadmi";
import Signup from "./views/Signup";
import Accueilclient from "./views/Accueilclient";
import ListePayment from "./views/ListePayment";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/*Accueil route*/}
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/accueil" element={<Navigate to="/" />} />
          <Route path="/" element={<Accueil />} />
          <Route path="/loginclient" element={<Loginclient />} />
          <Route path="/loginadmi" element={<Loginadmi />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/*Accueil route*/}

        {/*Client route*/}
        <Route path="/clientlayout" element={<ClientLayout />}>
          <Route
            path="/clientlayout/accueilclient"
            element={<Navigate to="/clientlayout" />}
          />
          <Route path="/clientlayout" element={<Accueilclient />} />
          <Route
            path="/clientlayout/enregistrement"
            element={<Enregistrement />}
          />
          <Route
            path="/clientlayout/about/:numero_marche"
            element={<About />}
          />
          <Route
            path="/clientlayout/payment/:numero_marche"
            element={<Payment />}
          />
          <Route path="/clientlayout/pdf/:numero_marche" element={<Pdf />} />
          <Route path="/clientlayout/recu/:numero_payment" element={<Recu />} />
          <Route path="/clientlayout/marchepublic" element={<Marchepublic />} />
          <Route path="/clientlayout/listePayment" element={<ListePayment />} />
        </Route>
        {/*Client route*/}

        {/* Admi route */}
        <Route path="/admilayout" element={<AdmiLayout />}>
          <Route path="admi" element={<Navigate to="/admilayout" />} />
          <Route path="/admilayout" element={<Admi />} />
          <Route
            path="/admilayout/aboutadmi/:numero_marche"
            element={<Aboutadmi />}
          />
        </Route>
        {/* Admi route */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
