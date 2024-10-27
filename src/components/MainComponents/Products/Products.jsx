import "./Products.scss";
import ProductItem from "../ProductItem/ProductItem";

export default function Product({
  productAll,
  upload,
  basketProducts,
  activeTab,
}) {
  return productAll.map((item, index) => {
    return (
      <ProductItem
        item={item}
        key={index}
        upload={upload}
        basketProducts={basketProducts}
        index={index}
        activeTab={activeTab}
      />
    );
  });
}
