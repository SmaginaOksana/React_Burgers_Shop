import "./ProductItem.scss";
import { addItemBasket } from "../../../functions/addItemBasket";

function ProductItem({ item, upload, basketProducts, index, activeTab }) {
  const { name, weight, price } = item;
  const urlImg = `products/${activeTab.name_products}/${activeTab.name_products}_${index}.png`;

  return (
    <div className="meal">
      <div className="image">
        <img src={urlImg} alt={name} />
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
            addItemBasket(item, upload, basketProducts, urlImg);
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
