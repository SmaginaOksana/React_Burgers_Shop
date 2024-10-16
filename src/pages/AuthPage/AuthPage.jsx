import "./AuthPage.scss";
import Authorization from "../../components/Authorization/Authorization";

function AuthPage({ setAuth }) {
  return (
    <>
      <Authorization setAuth={setAuth} />
    </>
  );
}

export default AuthPage;
