import "./Meal.scss";

function Meal(props) {
  const { image, name, weight, price } = props.burger;

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
        <button>Добавить</button>
      </div>
    </div>
  );
}

export default Meal;
