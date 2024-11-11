import "./BasketItem.scss";
import { editProductsCount } from "../../../functions/productsCount";

function BasketItem({ item, upload, activeIndex }) {
  const { name, weight, price, count, urlImg, onSale } = item;

  return (
    <div className="containerFood">
      <div className="image">
        <img src={urlImg} alt={name} />
      </div>
      <div className="description">
        <div>
          <span className="name">{name}</span>
        </div>
        <div>
          <span className="weight">{weight}</span>
        </div>
        <div className="price">
          <span className="priceSpan">{price} ₽</span>
          <span className="action">{onSale ? "on Sale" : ""}</span>
        </div>
      </div>
      <div className="amount">
        <button
          onClick={() => {
            editProductsCount(false, item, upload, activeIndex);
          }}
        >
          -
        </button>
        <span className="number">{count}</span>
        <button
          onClick={() => {
            editProductsCount(true, item, upload, activeIndex);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default BasketItem;
