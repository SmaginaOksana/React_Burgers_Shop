import "./Header.scss";
import logoTop from "../../assets/logoTop.png";
import pic from "../../assets/pic.png";
import user from "../../assets/user.png";
import { NavLink } from "react-router-dom";

function Header({ auth }) {
  return (
    <header>
      <div className="container">
        <div className="logoAndUser">
          <div className="logo">
            <img src={logoTop} alt="logo" />
          </div>
          <div className={auth.currentUser ? "user" : "none"}>
            <NavLink to="/user">
              <img src={user} alt="user" />
            </NavLink>
          </div>
        </div>
        <div className="titleContainer">
          <div className="pic">
            <img src={pic} alt="pic" />
          </div>
          <div className="mainInfo">
            <h1 className="whiteTitle">Только самые</h1>
            <h1 className="orangeTitle">сочные бургеры!</h1>
            <p>Бесплатная доставка от 599₽</p>
            <button>Добавить</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
