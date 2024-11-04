import "./UserPage.scss";
import { getAuth, signOut, updatePassword, deleteUser } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function UserPage() {
  const user = getAuth().currentUser;
  const navigate = useNavigate();
  const {
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const password = getValues().password;

    const changePassword = async () => {
      await updatePassword(user, password)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => reset());
    };
    const deleteUserAccount = () => {
      deleteUser(user)
        .then(() => {
          navigate("/registr");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const logOut = () => {
      signOut(getAuth())
        .then(() => {
          navigate("/auth");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className="userContainer">
        <h1>Profile</h1>
        <h2>Здравствуйте, {!displayName ? "Пользователь" : displayName}!</h2>
        <h2>Вы можете внести свои данные в профиль...</h2>
        <h2>Вы можете изменить пароль...</h2>
        <form
          name="newPassword"
          className="newPassword"
          onSubmit={(e) => {
            e.preventDefault();
            changePassword();
          }}
        >
          <input
            type="text"
            {...register("password", {
              required: true,
              pattern: /^[A-Za-z]+$/,
              minLength: 8,
            })}
            placeholder="new password"
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
        <button
          className="deleteUser"
          onClick={() => {
            deleteUserAccount();
          }}
        >
          Delete user
        </button>
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
        <h2 className="error none"></h2>
      </div>
    );
  } else {
    return (
      <>
        <h1>
          Чтобы зайти в кабинет пользователя, необходимо авторизоваться или
          зарегистрироваться
        </h1>
        <div className="signUp">
          <Link to="/registr">Зарегистрироваться</Link>
        </div>
      </>
    );
  }
}

export default UserPage;
