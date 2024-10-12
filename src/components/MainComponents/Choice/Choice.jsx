import "./Choice.scss";

function Choice(props) {
  const { image, nameRu, weight, price, number } = props.basket;

  return (
    <div className="containerFood">
      <div className="image">
        <img src={image} alt={nameRu} />
      </div>
      <div className="description">
        <div>
          <span className="name">{nameRu}</span>
        </div>
        <div>
          <span className="weight">{weight}</span>
        </div>
        <div>
          <span className="price">{price} ₽</span>
        </div>
      </div>
      <div className="amount">
        <button
          onClick={() => {
            props.calculateMinus(props.index);
          }}
        >
          -
        </button>
        <span className="number">{number}</span>
        <button
          onClick={() => {
            props.calculatePlus(props.index);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Choice;
