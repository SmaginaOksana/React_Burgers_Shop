import "./Order.scss";
import { useState } from "react";

function Order({ setOrder, userFB }) {
  const [userName, setUserName] = useState(userFB.name);
  const [userPhone, setUserPhone] = useState(userFB.phone);
  const [userEmail, setUserEmail] = useState(userFB.email);
  const [inputDelivery, setInputDelivery] = useState("");
  const [errors, setErrors] = useState({ delivery: "" });

  const handleSubmit = () => {
    const data = {
      name: userName,
      phone: userPhone,
      email: userEmail,
      delivery: inputDelivery,
    };
    if (!data.delivery) {
      setErrors({
        ...errors,
        delivery: "Необходимо выбрать способ получения товара!",
      });
    } else {
      setErrors({ ...errors, delivery: "", ordered: "Заказ оформлен!" });
    }
    console.log(inputDelivery);
  };

  return (
    <div
      className="wrapperOrder"
      onClick={() => {
        setOrder(false);
      }}
    >
      <div
        className="modalOrder"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="orderImage">
          <img src="products/order.png" alt="order" />
        </div>
        <div className="toSetOrder">
          {errors.ordered ? <p className="ordered">{errors.ordered}</p> : ""}
          <div
            className="closeImage"
            onClick={() => {
              setOrder(false);
            }}
          >
            <img src="products/x.png" alt="close" />
          </div>
          <h2 className="title">Доставка</h2>
          <form
            className="orderForm"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              placeholder="Имя"
              defaultValue={userFB.name}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="375000000000"
              defaultValue={userFB.phone}
              onChange={(event) => {
                setUserPhone(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="email@gmail.com"
              defaultValue={userFB.email}
              onChange={(event) => {
                setUserEmail(event.target.value);
              }}
            />
            <div className="radio">
              <label htmlFor="delivery">
                <input
                  type="radio"
                  id="delivery"
                  name="radio"
                  value="delivery"
                  onChange={(event) => {
                    setInputDelivery(event.target.value);
                  }}
                />
                Доставка
              </label>
              <label htmlFor="takeOff">
                <input
                  type="radio"
                  id="takeOff"
                  name="radio"
                  value="takeOff"
                  onChange={(event) => {
                    setInputDelivery(event.target.value);
                  }}
                />
                Самовывоз
              </label>
            </div>
            {!errors.delivery ? "" : <p>{errors.delivery}</p>}
            <input type="submit" value="Оформить" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
