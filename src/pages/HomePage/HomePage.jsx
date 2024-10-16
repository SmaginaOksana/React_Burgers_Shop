import "./HomePage.scss";
import { useEffect } from "react";

function HomePage({ setHidden }) {
  useEffect(() => {
    setHidden(true);
    return () => {
      setHidden(false);
    };
  });
}

export default HomePage;
