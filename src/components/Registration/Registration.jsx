import "./Registration.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Registration({ setHidden }) {
  const [pathAuth, setPathAuth] = useState(false);

  useEffect(() => {
    setHidden(false);
  }, []);

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
    setPathAuth(true);
  };
  if (pathAuth) {
    return <Navigate push to="/auth" replace />;
  }

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="wrapperForm">
      <div className="registrContainer">
        <h2 className="title">Sign up to order food</h2>
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
            <p>"Поле не должно быть меньше 4 символов"</p>
          )}
          <input
            {...register("email", {
              required: true,
              minLength: 10,
            })}
            placeholder="email@gmail.com"
          />
          {errors.email?.type === "minLength" && (
            <p>"Поле не должно быть меньше 10 символов"</p>
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

          <input
            type="text"
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Passwords should match!";
              },
            })}
            placeholder="Confirm password"
          />
          {errors.confirmPassword?.type === "minLength" && (
            <p>"Поле не должно быть меньше 8 символов"</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p>"Пароли не совпадают"</p>
          )}

          {(errors.login ||
            errors.email ||
            errors.password ||
            errors.confirmPassword) && <p>"Все поля должны быть заполнены"</p>}

          <input type="submit" value="Sign up" />
        </form>
        <h2 className="title question">Already an user?</h2>
        <Link to="/auth" className="logIn">
          Log in!
        </Link>
        <h2 className="agree">
          By creating an account you agree with Privacy Policy.
        </h2>
      </div>
    </div>
  );
}
