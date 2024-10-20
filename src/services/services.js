export default class Services {
  static async getAllProducts() {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      return await response.json();
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("done");
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
    } finally {
      console.log("done");
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
}
