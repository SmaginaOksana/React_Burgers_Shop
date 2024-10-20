import "./App.scss";
import { AuthPage, RegistrPage, HomePage, ErrorPage } from "../pages";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/MainComponents/Main/Main";
import Footer from "../components/Footer/Footer";

function App() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [auth, setAuth] = useState(false);

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/registr");
  //   }
  // }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        {hidden && <Main />}
        <Routes>
          <Route path="/" element={<HomePage setHidden={setHidden} />} />
          <Route path="/registr" element={<RegistrPage />} />
          <Route path="/auth" element={<AuthPage setAuth={setAuth} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
