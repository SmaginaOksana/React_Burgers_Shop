import Services from "../services/services";

export function allProductsCount(basketProducts, price = false) {
  let count = 0;
  let sum = 0;
  basketProducts.forEach((item) => {
    count += item.count;
    sum += item.count * item.price;
  });
  return price ? sum : count;
}

export function editProductsCount(flag, item, upload) {
  let newItem;
  if (flag) {
    newItem = { ...item, count: item.count + 1 };
  } else {
    if (item.count === 1) {
      Services.deleteBasketProduct(item.id).then(() => {
        upload.setDataFlag((prev) => !prev);
      });
    } else {
      newItem = { ...item, count: item.count - 1 };
    }
  }
  Services.editBasketProduct(newItem, newItem.id).then(() => {
    upload.setDataFlag((prev) => !prev);
  });
}
