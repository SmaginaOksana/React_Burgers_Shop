import "./Order.scss";
import { useState } from "react";

function Order({ setOrder, userFB }) {
  const [userName, setUserName] = useState(userFB.name);
  const [userPhone, setUserPhone] = useState(userFB.phone);
  const [userEmail, setUserEmail] = useState(userFB.email);
  const [inputDelivery, setInputDelivery] = useState("");
  const [inputTakeOff, setInputTakeOff] = useState("");

  const handleSubmit = () => {
    const data = {
      name: userName,
      phone: userPhone,
      email: userEmail,
      delivery: inputDelivery,
      takeOff: inputTakeOff,
    };
    setOrder(false);
    console.log(data);
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
              placeholder="375-00-000-00-00"
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
                    setInputTakeOff(event.target.value);
                  }}
                />
                Самовывоз
              </label>
            </div>
            <input type="submit" value="Оформить" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
