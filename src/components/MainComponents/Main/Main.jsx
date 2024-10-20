import "./Main.scss";
import { useEffect, useState } from "react";
import Basket from "../Basket/Basket";
import Spinner from "../../Spinner/Spinner";
import Services from "../../../services/services";
import MealMenu from "../Meal/MealMenu";
import { buttonsMeal } from "../../../content/content";
import ButtonsMeal from "../ButtonsMeal/ButtonsMeal";

function Main() {
  const [products, setProducts] = useState({ data: [], status: false });
  const [basket, setBasket] = useState({ data: [], status: false });
  const [dataFlag, setDataFlag] = useState(false);
  const upload = { dataFlag, setDataFlag };

  useEffect(() => {
    const productsServer = Services.getAllProducts();
    const basketServer = Services.getBasketProducts();
    Promise.allSettled([productsServer, basketServer]).then((results) => {
      if (results[0].status === "fulfilled") {
        setProducts({ data: results[0].value, status: true });
      }
      if (results[1].status === "fulfilled") {
        setBasket({ data: results[1].value, status: true });
      }
    });
  }, [dataFlag]);

  if (!products.status || !basket.status) {
    return <Spinner />;
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="buttonsContainer">
            {buttonsMeal.map((button, index) => {
              return <ButtonsMeal button={button} key={index} />;
            })}
          </div>
          <h2 className="mainTitle">Бургеры</h2>
          <div className="basketContainer">
            <Basket basket={basket.data} dataFlag={dataFlag} />
          </div>
          <div className="mealContainer">
            {products.data.map((item, index) => {
              return <MealMenu item={item} key={index} upload={upload} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
