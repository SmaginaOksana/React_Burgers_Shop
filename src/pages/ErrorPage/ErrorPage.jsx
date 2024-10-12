import { useEffect } from "react";
import "./ErrorPage.scss";

function ErrorPage({ setHidden }) {
  useEffect(() => {
    setHidden(false);
  }, []);
  return (
    <div className="wrapperError">
      <h1>Error</h1>
    </div>
  );
}

export default ErrorPage;
