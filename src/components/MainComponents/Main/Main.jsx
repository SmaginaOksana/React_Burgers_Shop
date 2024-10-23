import "./Main.scss";
import { useEffect, useState } from "react";
import Basket from "../Basket/Basket";
import Spinner from "../../Spinner/Spinner";
import Services from "../../../services/services";
import { buttonsMeal } from "../../../content/content";
import ButtonsMeal from "../ButtonsMeal/ButtonsMeal";
import Products from "../Products/Products";

function Main() {
  const [productsAll, setProductsAll] = useState({ data: [], status: false });
  const [basketProducts, setBasketProducts] = useState({
    data: [],
    status: false,
  });
  const [dataFlag, setDataFlag] = useState(false);
  const upload = { dataFlag, setDataFlag };

  useEffect(() => {
    const productsServer = Services.getAllProducts();
    const basketServer = Services.getBasketProducts();
    Promise.allSettled([productsServer, basketServer]).then((results) => {
      if (results[0].status === "fulfilled") {
        setProductsAll({ data: results[0].value, status: true });
      }
      if (results[1].status === "fulfilled") {
        setBasketProducts({ data: results[1].value, status: true });
      }
    });
  }, [dataFlag]);

  if (!productsAll.status || !basketProducts.status) {
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
            <Basket upload={upload} basketProducts={basketProducts.data} />
          </div>
          <div className="mealContainer">
            <Products
              productAll={productsAll.data}
              upload={upload}
              basketProducts={basketProducts.data}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
