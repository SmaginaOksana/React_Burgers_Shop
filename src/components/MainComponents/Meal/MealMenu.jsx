import "./MealMenu.scss";
import Services from "../../../services/services";

function MealMenu({ item, upload }) {
  const { image, name, weight, price } = item;

  function addItemBasket(item) {
    Services.setBasketProduct(item).then(() => {
      upload.setDataFlag((prev) => !prev);
    });
  }

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
            addItemBasket(item);
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default MealMenu;
