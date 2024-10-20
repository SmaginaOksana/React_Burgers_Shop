import "./Choice.scss";

function Choice({ index, calculateMinus, calculatePlus, basket }) {
  const { image, name, weight, price, count } = basket;

  return (
    <div className="containerFood">
      <div className="image">
        <img src={image} alt={name} />
      </div>
      <div className="description">
        <div>
          <span className="name">{name}</span>
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
            calculateMinus(index);
          }}
        >
          -
        </button>
        <span className="number">{count}</span>
        <button
          onClick={() => {
            calculatePlus(index);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Choice;
