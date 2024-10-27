import "./RegistrPage.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function RegistrPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data, e) => {
    console.log(data);
    reset();
    setSuccess(true);
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="container">
      <div className="wrapperForm">
        <div className="registrContainer">
          {success ? <p className="success">Вы зарегистрированы!</p> : ""}
          <h2 className="title">Регистрация аккаунта</h2>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="registrForm"
          >
            <input
              type="text"
              {...register("login", { required: true, minLength: 4 })}
              placeholder="Login"
            />
            {errors.login?.type === "minLength" && (
              <p>Поле не должно быть меньше 4 символов</p>
            )}
            <input
              {...register("email", {
                required: true,
                minLength: 10,
              })}
              placeholder="email@gmail.com"
            />
            {errors.email?.type === "minLength" && (
              <p>Поле не должно быть меньше 10 символов</p>
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

            <input
              type="text"
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Пароли не совпадают!";
                },
              })}
              placeholder="Confirm password"
            />
            {errors.confirmPassword?.type === "minLength" && (
              <p>Поле не должно быть меньше 8 символов</p>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <p>Пароли не совпадают</p>
            )}

            {(errors.login ||
              errors.email ||
              errors.password ||
              errors.confirmPassword) && <p>Все поля должны быть заполнены</p>}

            <input type="submit" value="Зарегистрироваться" />
          </form>
          <div className="logIn">
            <Link to="/auth">Авторизация</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrPage;
