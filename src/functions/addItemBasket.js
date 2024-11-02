import { updateBasket, updateBasketProduct } from "../services/FB_server";

export function addItemBasket(item, upload, basketProducts, urlImg) {
  const newItemProduct = { ...item, urlImg };
  let activeIndex;
  const findItemInBasket = basketProducts.find((elem, index) => {
    activeIndex = index;
    return elem.id === newItemProduct.id;
  });
  if (!findItemInBasket) {
    updateBasket(newItemProduct).then(() => {
      upload.setDataFlag((prev) => !prev);
    });
    return;
  }
  const newItem = {
    ...findItemInBasket,
    count: findItemInBasket.count + 1,
  };
  updateBasketProduct(newItem, upload.dataKeys[activeIndex]).then(() => {
    upload.setDataFlag((prev) => !prev);
    return;
  });
}
