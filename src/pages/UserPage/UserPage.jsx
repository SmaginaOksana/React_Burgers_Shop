import {
  EmailAuthCredential,
  EmailAuthProvider,
} from "firebase/auth/web-extension";
import "./UserPage.scss";
import {
  signOut,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function UserPage({ auth, user }) {
  const navigate = useNavigate();
  const {
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const changePassword = async () => {
    const credential = "";
    const password = getValues().newPassword;
    await reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, password)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => reset());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="wrapperForm">
        <div className="userContainer">
          <h1 className="title">Profile</h1>
          <h2 className="title">
            Здравствуйте,{" "}
            {!auth.currentUser.displayName
              ? "Пользователь"
              : auth.currentUser.displayName}
            !
          </h2>
          <h2 className="title">Вы можете изменить пароль...</h2>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              changePassword();
            }}
          >
            <input
              type="text"
              {...register("previousPassword", {
                required: true,
                pattern: /^[A-Za-z]+$/,
                minLength: 8,
              })}
              placeholder="Previous password"
            />
            <input
              type="text"
              {...register("newPassword", {
                required: true,
                pattern: /^[A-Za-z]+$/,
                minLength: 8,
              })}
              placeholder="New password"
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
              placeholder="Confirm new password"
            />
            {errors.confirmPassword?.type === "minLength" && (
              <p>Поле не должно быть меньше 8 символов</p>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <p>Пароли не совпадают</p>
            )}
            <button className="changePassword">Change password</button>
          </form>
          <div className="buttons">
            <button
              className="close"
              onClick={() => {
                navigate("/");
              }}
            >
              Close profile settings
            </button>
            <button
              className="logOutBtn"
              name="logOutBtn"
              onClick={() => {
                logOut();
              }}
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
