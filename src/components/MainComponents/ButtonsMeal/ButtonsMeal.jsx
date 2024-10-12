import "./ButtonsMeal.scss";

function ButtonsMeal(props) {
  const { image, name } = props.button;

  return (
    <button>
      <img src={image} alt={name} />
      <span>{name}</span>
    </button>
  );
}

export default ButtonsMeal;
