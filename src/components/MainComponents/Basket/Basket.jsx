import { useEffect, useState } from "react";
import "./Basket.scss";
import Choice from "../Choice/Choice";
import delivery from "../../../assets/delivery.png";

function Basket({ basket }) {
  // const [basket, setBasket] = useState([]);

  // useEffect(() => {
  //   setBasket([...props.basket]);
  // }, []);

  const calculatePlus = (index) => {
    // const newBasket = [...basket];
    // newBasket[index].count += 1;
    // setBasket(newBasket);
  };

  const calculateMinus = (index) => {
    // const newBasket = [...basket];
    // if (newBasket[index].count === 1) {
    //   newBasket[index].count = 0;
    //   const filteredBasket = newBasket.filter((item) => {
    //     return item.count !== 0;
    //   });
    //   setBasket(filteredBasket);
    // } else {
    //   newBasket[index].count -= 1;
    //   setBasket(newBasket);
    // }
  };

  const calculateAmount = () => {
    // const amount = basket.reduce((acc, item) => {
    //   return (acc += item.count);
    // }, 0);
    // return amount;
  };

  const calculateSum = () => {
    // const sum = basket.reduce((acc, item) => {
    //   return (acc += item.count * item.price);
    // }, 0);
    // return sum;
  };

  return (
    <>
      <div className="basket">
        <h2 className="basketTitle">Корзина</h2>
        <div className="amount">
          <span>{calculateAmount()}</span>
        </div>
      </div>
      {basket.length === 0 ? (
        <div className="emptyBasket">
          <h2 className="basketTitle">Корзина пуста</h2>
        </div>
      ) : (
        basket.map((item, index) => {
          return (
            <Choice
              basket={item}
              key={index}
              calculateMinus={calculateMinus}
              calculatePlus={calculatePlus}
              index={index}
            />
          );
        })
      )}
      <hr />
      <div className="inTotal">
        <h3>Итого</h3>
        <div className="totalPrice">
          <span>{calculateSum()}</span>
          <span>₽</span>
        </div>
      </div>
      <button className="toOrder">Оформить заказ</button>
      <div className="delivery">
        <div>
          <img src={delivery} alt="delivery" />
        </div>
        <span>Бесплатная доставка</span>
      </div>
    </>
  );
}

export default Basket;
