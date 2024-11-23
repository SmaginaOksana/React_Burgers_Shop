import "./UserPage.scss";
import {
  signOut,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UserPage({ auth, userFB }) {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const {
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const credentialFirebase = {
    email: getValues().email,
    password: getValues.previousPassword,
  };

  const changePassword = async () => {
    await reauthenticateWithCredential(credentialFirebase)
      .then(() => {
        updatePassword(user, getValues().newPassword)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => reset());
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
          <h2 className="title">Здравствуйте, "Пользователь"!</h2>
          <h2 className="title">Вы можете изменить пароль...</h2>
          <form
            className="userPageForm"
            onSubmit={(e) => {
              e.preventDefault();
              changePassword();
            }}
          >
            <input
              type="text"
              {...register("email", {
                required: true,
                minLength: 8,
              })}
              placeholder="Email"
            />
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
                  const { newPassword } = getValues();
                  return newPassword === value || "Пароли не совпадают!";
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
