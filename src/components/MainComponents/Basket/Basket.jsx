import "./Basket.scss";
import { useEffect, useState } from "react";
import BasketItem from "../BasketItem/BasketItem";
import delivery from "../../../assets/delivery.png";
import { allProductsCount } from "../../../functions/productsCount";

function Basket({ basketProducts, upload }) {
  const [freeDelivery, setFreeDelivery] = useState({});

  useEffect(() => {
    setFreeDelivery({
      count: allProductsCount(basketProducts),
      price: allProductsCount(basketProducts, true),
      onSale: basketProducts.filter((item) => item.onSale === true),
    });
  }, [upload]);

  return (
    <>
      <div className="basket">
        <h2 className="basketTitle">Корзина</h2>
        <div className="amount">
          <span>{allProductsCount(basketProducts)}</span>
        </div>
      </div>
      {basketProducts.length === 0 ? (
        <div className="emptyBasket">
          <h2 className="basketTitle">Корзина пуста</h2>
        </div>
      ) : (
        basketProducts.map((item, index) => {
          return (
            <BasketItem
              item={item}
              key={index}
              activeIndex={index}
              upload={upload}
            />
          );
        })
      )}
      <hr />
      <div className="inTotal">
        <h3>Итого</h3>
        <div className="totalPrice">
          <span>{allProductsCount(basketProducts, true)}</span>
          <span>₽</span>
        </div>
      </div>
      {basketProducts.length ? (
        <button className="toOrder">Оформить заказ</button>
      ) : (
        ""
      )}
      <div className="delivery">
        <div className="img">
          <img src={delivery} alt="delivery" />
        </div>
        {freeDelivery.count >= 3 || freeDelivery.price >= 1500 ? (
          // || freeDelivery.onSale.length > 0
          <div className="list">
            <span>Бесплатная доставка</span>
          </div>
        ) : (
          <div className="list">
            <span>Бесплатная доставка при заказе:</span>
            <ul>
              <li>акционного товара</li>
              <li>от 3-х товаров в корзине</li>
              <li>на сумму свыше 1000 руб.</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Basket;
