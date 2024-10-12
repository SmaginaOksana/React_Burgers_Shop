import "./RegistrPage.scss";
import Registration from "../../components/Registration/Registration";

function RegistrPage({ setHidden }) {
  return (
    <>
      <Registration setHidden={setHidden} />
    </>
  );
}

export default RegistrPage;
