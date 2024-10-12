import "./Footer.scss";
import phone from "../../assets/phone.png";
import logoEnd from "../../assets/logoEnd.png";
import vk from "../../assets/vk.png";
import telegram from "../../assets/telegram.png";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="logo">
          <img src={logoEnd} alt="logo" />
        </div>
        <div className="contactsContainer">
          <div className="contacts">
            <span>Номер для заказа</span>
            <div>
              <img src={phone} alt="phone" />
              <span>+7 (930) 833-38-11</span>
            </div>
          </div>
          <div className="social">
            <span>Мы в соцсетях</span>
            <div>
              <a href="#">
                <img src={vk} alt="vk" />
              </a>
              <a href="#">
                <img src={telegram} alt="telegram" />
              </a>
            </div>
          </div>
        </div>
        <div className="designed">
          <span>&copy; YouMeal, 2022</span>
          <span>Design: Anastasia Ilina</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
