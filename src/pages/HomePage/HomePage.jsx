import "./HomePage.scss";
import { useEffect, useState } from "react";
import Basket from "../../components/MainComponents/Basket/Basket";
import Spinner from "../../components/Spinner/Spinner";
import { navigationButtons } from "../../content/content.json";
import Navigation from "../../components/MainComponents/Navigation/Navigation";
import Products from "../../components/MainComponents/Products/Products";
import Order from "../../components/MainComponents/Order/Order";
import { getData } from "../../services/FB_server";
import { getUsersData } from "../../services/FB_server";

function HomePage({ auth, userFB, setUserFB }) {
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

  const [order, setOrder] = useState(false);
  const [dataFlag, setDataFlag] = useState(false);
  const upload = { dataFlag, setDataFlag, dataKeys: basketProducts.dataKeys };

  useEffect(() => {
    const productsServer = getData(activeTab.name_products);
    const basketServer = getData("basket");
    const usersServer = getUsersData();

    Promise.allSettled([productsServer, basketServer, usersServer]).then(
      (results) => {
        if (results[0].status === "fulfilled") {
          setProductsAll({ data: results[0].value || [], status: true });
        }
        if (results[1].status === "fulfilled") {
          setBasketProducts({
            data: results[1].value ? Object.values(results[1]?.value) : [],
            dataKeys: results[1].value ? Object.keys(results[1]?.value) : [],
            status: true,
          });
        }
        if (results[2].status === "fulfilled") {
          for (let key in results[2].value) {
            if (results[2].value[key].email === auth.currentUser.email) {
              setUserFB(
                {
                  name: results[2].value[key].name,
                  phone: results[2].value[key].phone,
                  email: results[2].value[key].email,
                  password: results[2].value[key].password,
                  birth: results[2].value[key].birth,
                  status: true,
                  key: key,
                } || {}
              );
            }
          }
        }
      }
    );
  }, [dataFlag, activeTab]);

  if (!productsAll.status || !basketProducts.status || !userFB.status) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container">
        {order ? <Order setOrder={setOrder} userFB={userFB} /> : ""}
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
            setOrder={setOrder}
          />
        </div>
        <div className="mealContainer">
          <Products
            upload={upload}
            basketProducts={basketProducts.data}
            productAll={productsAll.data}
            activeTab={activeTab}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
