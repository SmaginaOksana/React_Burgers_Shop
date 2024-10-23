import "./Basket.scss";
import BasketItem from "../BasketItem/BasketItem";
import delivery from "../../../assets/delivery.png";
import { allProductsCount } from "../../../functions/productsCount";

function Basket({ basketProducts, upload }) {
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
          return <BasketItem item={item} key={index} upload={upload} />;
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
