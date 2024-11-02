import { useEffect } from "react";
import "./ErrorPage.scss";

function ErrorPage({ setHidden }) {
  useEffect(() => {
    setHidden(false);
    return () => {
      setHidden(true);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="wrapperError">
          <h1>Error</h1>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
