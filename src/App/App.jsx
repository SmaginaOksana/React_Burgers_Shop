import "./App.scss";
import { AuthPage, RegistrPage, HomePage, ErrorPage, UserPage } from "../pages";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const auth = getAuth();
  const [userFB, setUserFB] = useState({
    name: "",
    phone: "",
    email: "",
    status: false,
    password: "",
    birth: "",
    key: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        if (navigate !== "/auth") {
          if (navigate !== "/registr") {
            navigate("/auth");
            return;
          }
          return;
        }
      }
    });
  }, []);

  return (
    <>
      <div className="wrapper">
        {hidden && <Header />}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage auth={auth} userFB={userFB} setUserFB={setUserFB} />
              }
            />
            <Route path="/registr" element={<RegistrPage auth={auth} />} />
            <Route path="/auth" element={<AuthPage auth={auth} />} />
            <Route
              path="/user"
              element={<UserPage auth={auth} userFB={userFB} />}
            />
            <Route path="*" element={<ErrorPage setHidden={setHidden} />} />
          </Routes>
        </main>
        {hidden && <Footer />}
      </div>
    </>
  );
}

export default App;
