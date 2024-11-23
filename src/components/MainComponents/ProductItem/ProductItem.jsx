import "./ProductItem.scss";
import { addItemBasket } from "../../../functions/addItemBasket";
import MealDescription from "../MealDescription/MealDescription";
import { useState } from "react";

function ProductItem({ item, upload, basketProducts, index, activeTab }) {
  const { name, weight, price, onSale } = item;
  const urlImg = `products/${activeTab.name_products}/${activeTab.name_products}_${index}.png`;
  const [mealDescription, setMealDescription] = useState(false);
  const onSaleClass = onSale ? "meal onSale" : "meal";

  return (
    <>
      <div
        className={`${onSaleClass}`}
        onClick={() => {
          setMealDescription((prev) => !prev);
        }}
      >
        <div className="image">
          <img src={urlImg} alt={name} />
        </div>
        <div className="description">
          <div className="price">
            <span className={onSale ? "priceSpan actionPrice" : "priceSpan"}>
              {price}₽
            </span>
            <span className="priceSpan action">
              {onSale ? Math.round(price * 0.8) + `₽` : ""}
            </span>
          </div>
          <div>
            <span className="name">{name}</span>
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
      {mealDescription ? (
        <MealDescription
          item={item}
          upload={upload}
          basketProducts={basketProducts}
          urlImg={urlImg}
          setMealDescription={setMealDescription}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ProductItem;
