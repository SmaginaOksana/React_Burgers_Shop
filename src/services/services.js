export default class Services {
  static async getAllProducts(name_products) {
    try {
      const response = await fetch(`http://localhost:3001/${name_products}`);
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      return await response.json();
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getBasketProducts() {
    try {
      const response = await fetch("http://localhost:3001/basket");
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      return await response.json();
    } catch (error) {
      console.log(error.message);
    }
  }
  static async setBasketProduct(data) {
    try {
      const response = await fetch("http://localhost:3001/basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
  static async editBasketProduct(data, id) {
    try {
      const response = await fetch(`http://localhost:3001/basket/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteBasketProduct(id) {
    try {
      const response = await fetch(`http://localhost:3001/basket/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
}
