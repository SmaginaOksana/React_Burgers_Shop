import "./RegistrPage.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { updateUsers } from "../../services/FB_server";

function RegistrPage({ auth }) {
  const [successRegistr, setSuccessRegistr] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setSuccessRegistr(true);
      })
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email was sent successfully");
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        reset();
      });
    await updateUsers(data)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="container">
      <div className="wrapperForm">
        <div className="registrContainer">
          {successRegistr ? (
            <p className="success">Вы зарегистрированы!</p>
          ) : (
            ""
          )}
          <h2 className="title">Регистрация аккаунта</h2>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="registrForm"
          >
            <input
              type="text"
              {...register("name", { required: true, minLength: 4 })}
              placeholder="Имя"
            />
            {errors.name?.type === "minLength" && (
              <p>Поле не должно быть меньше 4 символов</p>
            )}
            <input
              type="text"
              {...register("phone", {
                required: true,
                pattern: /^\d{3}-\d{2}-\d{3}-\d{2}-\d{2}$/,
              })}
              placeholder="375-00-000-00-00"
            />
            {errors.phone?.type === "pattern" && (
              <p>
                Номер телефона должен состоять из цифр и не содержать знак "+"
              </p>
            )}
            <input
              type="text"
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
              type="date"
              {...register("birth", {
                required: true,
              })}
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
              placeholder="Пароль"
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
              placeholder="Повторите пароль"
            />
            {errors.confirmPassword?.type === "minLength" && (
              <p>Поле не должно быть меньше 8 символов</p>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <p>Пароли не совпадают</p>
            )}
            {(errors.name ||
              errors.phone ||
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
