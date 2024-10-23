import Services from "../services/services";

export function allProductsCount(basketProducts, price = false) {
  let amount = 0;
  let sum = 0;
  basketProducts.forEach((item) => {
    amount += item.count;
    sum += item.count * item.price;
  });
  return price ? sum : amount;
}

export function editProductsCount(flag, item, upload) {
  let newItem;
  if (flag) {
    newItem = { ...item, count: item.count + 1 };
  } else {
    newItem = { ...item, count: item.count - 1 };
  }
  Services.editBasketProduct(newItem, item.id).then(() => {
    upload.setDataFlag((prev) => !prev);
  });
}
