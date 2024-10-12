import { Link } from "react-router-dom";
import "./Authorization.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Authorization({ setHidden }) {
  const [pathHome, setPathHome] = useState(false);

  useEffect(() => {
    setHidden(false);
  }, []);

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
    setPathHome(true);
  };
  const onError = (errors, e) => console.log(errors, e);
  if (pathHome) {
    return <Navigate push to="/home" replace />;
  }
  return (
    <div className="wrapperForm">
      <div className="authContainer">
        <h2 className="title">Log in to order food</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="authForm">
          <input
            type="text"
            {...register("login", { required: true, minLength: 4 })}
            placeholder="Login"
          />
          {errors.login?.type === "minLength" && (
            <p>"Поле не должно быть меньше 4 символов"</p>
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
            <p>"Поле не должно быть меньше 8 символов"</p>
          )}
          {errors.password?.type === "pattern" && (
            <p>"Пароль должен состоять из латинских букв и не содержать $"</p>
          )}

          {(errors.login || errors.password) && (
            <p>"Все поля должны быть заполнены"</p>
          )}
          <input type="submit" value="Log in" />
        </form>
        <h2 className="title question">Not an user yet?</h2>
        <Link to="/registr" className="signUp">
          Sign up here!
        </Link>
      </div>
    </div>
  );
}

export default Authorization;
