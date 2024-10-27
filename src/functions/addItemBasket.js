import Services from "../services/services";

export function addItemBasket(item, upload, basketProducts) {
  const findItemInBasket = basketProducts.find((elem) => {
    return elem.id === item.id;
  });

  if (!findItemInBasket) {
    Services.setBasketProduct(item).then(() => {
      upload.setDataFlag((prev) => !prev);
    });
    return;
  }
  // const newItem = {
  //   ...findItemInBasket,
  //   count: findItemInBasket.count + 1,
  // };

  findItemInBasket.count += 1;
  // Services.editBasketProduct(newItem, newItem.id).then(() => {
  Services.editBasketProduct(findItemInBasket, findItemInBasket.id).then(() => {
    upload.setDataFlag((prev) => !prev);
    return;
  });
}
