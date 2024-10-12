import "./AuthPage.scss";
import Authorization from "../../components/Authorization/Authorization";

function AuthPage({ setHidden }) {
  return (
    <>
      <Authorization setHidden={setHidden} />
    </>
  );
}

export default AuthPage;
