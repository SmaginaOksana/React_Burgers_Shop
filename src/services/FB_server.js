import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  remove,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig.json";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function getData(path) {
  const starCountRef = ref(database, "/" + path);
  return new Promise((resolve, reject) => {
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
export function updateBasket(item) {
  const dataRef = ref(database, "/basket");
  return push(dataRef, item);
}
export function updateBasketProduct(item, key) {
  const dataRef = ref(database, "/basket/" + key);
  return update(dataRef, item);
}
export function removeBasketProduct(key) {
  const dataRef = ref(database, "/basket/" + key);
  return remove(dataRef, key);
}
export function updateUsers(user) {
  const dataRef = ref(database, "/users");
  return push(dataRef, user);
}
export async function getUsersData() {
  const starCountRef = ref(database, "/users/");
  return await new Promise((resolve, reject) => {
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
export function updateUserPassword(item, key) {
  const dataRef = ref(database, "/users/" + key);
  return update(dataRef, item);
}
