import "./ProductItem.scss";
import { addItemBasket } from "../../../functions/addItemBasket";
import MealDescription from "../MealDescription/MealDescription";
import { useEffect, useState } from "react";

function ProductItem({ item, upload, basketProducts, index, activeTab }) {
  const { name, weight, price, onSale } = item;
  const urlImg = `products/${activeTab.name_products}/${activeTab.name_products}_${index}.png`;
  const [description, setDescription] = useState(false);
  const onSaleClass = onSale ? "meal onSale" : "meal";

  return (
    <>
      <div
        className={`${onSaleClass}`}
        onClick={() => {
          setDescription((prev) => !prev);
        }}
      >
        <div className="image">
          <img src={urlImg} alt={name} />
        </div>
        <div className="description">
          <div className="price">
            <span className="priceSpan">{price} ₽</span>
            <span className="action">{onSale ? "on Sale" : ""}</span>
          </div>
          <div>
            <span className="name">{name}</span>
          </div>
          <div>
            <span className="weight">{}</span>
          </div>
          <div>
            <span className="weight">{weight}</span>
          </div>
          <button
            className="add"
            onClick={(event) => {
              event.stopPropagation();
              addItemBasket(item, upload, basketProducts, urlImg);
            }}
          >
            Добавить
          </button>
        </div>
      </div>
      {description ? (
        <MealDescription
          item={item}
          upload={upload}
          basketProducts={basketProducts}
          urlImg={urlImg}
          setDescription={setDescription}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ProductItem;
