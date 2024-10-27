import "./App.scss";
import { AuthPage, RegistrPage, HomePage, ErrorPage } from "../pages";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [hidden, setHidden] = useState(true);

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/registr");
  //   }
  // }, []);

  return (
    <>
      <div className="wrapper">
        {hidden && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registr" element={<RegistrPage />} />
            <Route path="/auth" element={<AuthPage setAuth={setAuth} />} />
            <Route path="*" element={<ErrorPage setHidden={setHidden} />} />
          </Routes>
        </main>
        {hidden && <Footer />}
      </div>
    </>
  );
}

export default App;
