import "./MealDescription.scss";
import { addItemBasket } from "../../../functions/addItemBasket";
import { editProductsCount } from "../../../functions/productsCount";

function MealDescription({
  item,
  upload,
  basketProducts,
  urlImg,
  setDescription,
}) {
  const { name, price, description } = item;

  let activeIndex;
  let activeProduct;
  basketProducts.forEach((elem, index) => {
    if (elem.id === item.id) {
      activeIndex = index;
      activeProduct = basketProducts[index];
    }
  });

  return (
    <div
      className="wrapperModal"
      onClick={() => {
        setDescription(false);
      }}
    >
      <div
        className="meal modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div>
          <span className="name">{name}</span>
        </div>
        <div className="wrapperDescription">
          <div className="image">
            <img src={urlImg} alt={name} />
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </div>
        <div className="wrapperButton">
          <button
            className="add"
            onClick={() => {
              addItemBasket(item, upload, basketProducts, urlImg);
            }}
          >
            Добавить
          </button>
          {activeProduct ? (
            <div className="amount">
              <button
                onClick={() => {
                  editProductsCount(false, activeProduct, upload, activeIndex);
                }}
              >
                -
              </button>
              <span className="number">{activeProduct.count}</span>
              <button
                onClick={() => {
                  editProductsCount(true, activeProduct, upload, activeIndex);
                }}
              >
                +
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="wrapperPrice">
            <span className="price">{price} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDescription;
