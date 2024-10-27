import "./Navigation.scss";

function Navigation({ button, activeTab, setActiveTab }) {
  const { image, name, name_products } = button;
  const activeClass =
    activeTab.name_products === name_products ? `activeTab` : "";

  return (
    <button
      className={`${activeClass}`}
      onClick={() => {
        setActiveTab(button);
      }}
    >
      <img src={image} alt={name} />
      <span>{name}</span>
    </button>
  );
}

export default Navigation;
