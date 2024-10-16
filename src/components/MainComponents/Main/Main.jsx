import { useEffect, useState } from "react";
import "./Main.scss";
import Basket from "../Basket/Basket";
import Spinner from "../../Spinner/Spinner";
import Meal from "../Meal/Meal";
import ButtonsMeal from "../ButtonsMeal/ButtonsMeal";

function Main() {
  const [flagButtons, setFlagButtons] = useState(false);
  const [flagBurgers, setFlagBurgers] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [burgers, setBurgers] = useState([]);

  useEffect(() => {
    async function getBurgersContent() {
      try {
        const response = await fetch("http://localhost:3001/0");
        if (!response.ok) {
          throw new Error("Ошибка получения данных");
        }
        const data = await response.json();
        setBurgers(...burgers, [data]);
        setFlagBurgers(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log("done");
      }
    }
    async function getButtonsContent() {
      try {
        const response = await fetch("http://localhost:3001/1");
        if (!response.ok) {
          throw new Error("Ошибка получения данных");
        }
        const data = await response.json();
        setButtons(...buttons, [data]);
        setFlagButtons(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log("done");
      }
    }
    getBurgersContent();
    getButtonsContent();
  }, [flagBurgers, flagButtons]);

  if (!flagBurgers || !flagButtons) {
    return <Spinner />;
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="buttonsContainer">
            {buttons.map((button, index) => {
              return <ButtonsMeal button={button} key={index} />;
            })}
          </div>
          <h2 className="mainTitle">Бургеры</h2>
          <div className="basketContainer">
            <Basket />
          </div>
          <div className="mealContainer">
            {burgers.map((item, index) => {
              return <Meal burger={item} key={index} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
