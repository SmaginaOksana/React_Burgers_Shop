import "./AuthPage.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AuthPage({ setAuth }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data, e) => {
    console.log(data);
    reset();
    navigate("/");
    setAuth(true);
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="container">
      <div className="wrapperForm">
        <div className="authContainer">
          <h2 className="title">Авторизация</h2>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="authForm">
            <input
              type="text"
              {...register("login", { required: true, minLength: 4 })}
              placeholder="Login"
            />
            {errors.login?.type === "minLength" && (
              <p>Поле не должно быть меньше 4 символов</p>
            )}
            <input
              type="text"
              {...register("password", {
                required: true,
                pattern: /^[A-Za-z]+$/,
                minLength: 8,
              })}
              placeholder="Password"
            />
            {errors.password?.type === "minLength" && (
              <p>Поле не должно быть меньше 8 символов</p>
            )}
            {errors.password?.type === "pattern" && (
              <p>Пароль должен состоять из латинских букв и не содержать $</p>
            )}

            {(errors.login || errors.password) && (
              <p>Все поля должны быть заполнены</p>
            )}
            <input type="submit" value="Войти" />
          </form>
          <div className="signUp">
            <Link to="/registr">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
