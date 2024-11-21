import "./AuthPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";

function AuthPage({ auth }) {
  const navigate = useNavigate();
  const [emailLetter, setEmailLetter] = useState({
    email: false,
    letter: false,
  });
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
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        reset();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onError = (errors, e) => console.log(errors, e);

  const forgetPassword = () => {
    const { email } = getValues();
    if (!email) {
      setEmailLetter({
        email: true,
        letter: false,
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailLetter({
          email: false,
          letter: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="wrapperForm">
        <div className="authContainer">
          <h2 className="title">Авторизация</h2>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="authForm">
            <input
              type="text"
              {...register("email", { required: true, minLength: 4 })}
              placeholder="Электронная почта"
            />
            {errors.email?.type === "minLength" && (
              <p>Поле не должно быть меньше 4 символов</p>
            )}
            <input
              type="text"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
                minLength: 8,
              })}
              placeholder="Пароль"
            />
            {errors.password?.type === "minLength" && (
              <p>Поле не должно быть меньше 8 символов</p>
            )}
            {errors.password?.type === "pattern" && (
              <p>
                Пароль может состоять из латинских букв разного регистра, цифр и
                спец.символов
              </p>
            )}

            {(errors.login || errors.password) && (
              <p>Все поля должны быть заполнены</p>
            )}
            <input type="submit" value="Войти" />
          </form>
          <div className="signUp">
            <Link to="/registr">Зарегистрироваться</Link>
          </div>
          <button
            className="forget"
            onClick={() => {
              forgetPassword();
            }}
          >
            Забыли пароль
          </button>
          {emailLetter.letter ? (
            <p className="letter">
              Письмо для смены пароля отправлено на электронную почту
            </p>
          ) : (
            ""
          )}
          {emailLetter.email ? (
            <p className="letter">Для смены пароля введите электронную почту</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
