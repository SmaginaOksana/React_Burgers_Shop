import "./App.scss";
import { AuthPage, RegistrPage, HomePage, ErrorPage } from "../pages";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header/Header";
import Main from "../components/MainComponents/Main/Main";
import Footer from "../components/Footer/Footer";

function App() {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<RegistrPage setHidden={setHidden} />} />
          <Route
            path="/registr"
            element={<RegistrPage setHidden={setHidden} />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage setHidden={setHidden} />} />
          <Route path="*" element={<ErrorPage setHidden={setHidden} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
