import "./HomePage.scss";
import { useEffect, useState } from "react";
import Basket from "../../components/MainComponents/Basket/Basket";
import Spinner from "../../components/Spinner/Spinner";
import Services from "../../services/services";
import { navigationButtons } from "../../content/content.json";
import Navigation from "../../components/MainComponents/Navigation/Navigation";
import Products from "../../components/MainComponents/Products/Products";

function HomePage() {
  const [activeTab, setActiveTab] = useState({
    image: "navButtons/icon_burger.png",
    name: "Бургеры",
    name_products: "burgers",
  });
  const [productsAll, setProductsAll] = useState({ data: [], status: false });
  const [basketProducts, setBasketProducts] = useState({
    data: [],
    status: false,
  });
  const [dataFlag, setDataFlag] = useState(false);
  const upload = { dataFlag, setDataFlag };

  useEffect(() => {
    const productsServer = Services.getAllProducts(activeTab.name_products);
    const basketServer = Services.getBasketProducts();
    Promise.allSettled([productsServer, basketServer]).then((results) => {
      if (results[0].status === "fulfilled") {
        setProductsAll({ data: results[0].value, status: true });
      }
      if (results[1].status === "fulfilled") {
        setBasketProducts({ data: results[1].value, status: true });
      }
    });
  }, [dataFlag, activeTab]);

  if (!productsAll.status || !basketProducts.status) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container">
        <div className="buttonsContainer">
          {navigationButtons.map((button, index) => {
            return (
              <Navigation
                button={button}
                key={index}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            );
          })}
        </div>
        <h2 className="mainTitle">{activeTab.name}</h2>
        <div className="basketContainer">
          <Basket
            upload={upload}
            basketProducts={basketProducts.data}
            activeTab={activeTab}
          />
        </div>
        <div className="mealContainer">
          <Products
            productAll={productsAll.data}
            upload={upload}
            basketProducts={basketProducts.data}
            activeTab={activeTab}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
