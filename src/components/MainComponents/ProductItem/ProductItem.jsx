import "./ProductItem.scss";
import { addItemBasket } from "../../../functions/addItemBasket";

function ProductItem({ item, upload, basketProducts }) {
  const { image, name, weight, price } = item;

  return (
    <div className="meal">
      <div className="image">
        <img src={image} alt={name} />
      </div>
      <div className="description">
        <div>
          <span className="price">{price} ₽</span>
        </div>
        <div>
          <span className="name">{name}</span>
        </div>
        <div>
          <span className="weight">{weight}</span>
        </div>
        <button
          onClick={() => {
            addItemBasket(item, upload, basketProducts);
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
