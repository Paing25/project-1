import { renderCategory } from "../app/category";
import { renderProduct } from "../app/products";
import { categories, products } from "./data";

const initialRender = () => {
  renderCategory(categories);
  renderProduct(products);
};

export default initialRender;
