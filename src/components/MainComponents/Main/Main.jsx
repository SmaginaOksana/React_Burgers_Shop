import "./Main.scss";
import Basket from "../Basket/Basket";
import Meal from "../Meal/Meal";
import ButtonsMeal from "../ButtonsMeal/ButtonsMeal";
import { burgers, buttonsMeal } from "../../../content/content";

function Main() {
  return (
    <>
      <main>
        <div className="container">
          <div className="buttonsContainer">
            {buttonsMeal.map((button, index) => {
              return <ButtonsMeal button={button} key={index} />;
            })}
          </div>
          <h2 className="mainTitle">Бургеры</h2>
          <div className="basketContainer">
            <Basket />
          </div>
          <div className="mealContainer">
            {burgers.map((item, index) => {
              return <Meal burger={item} key={index} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
