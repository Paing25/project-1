import {
  cartItemDeleteHandler,
  cartItemGroupHandler,
  categoryHandler,
} from "./handler";
import { cartItemGroup, categoryGroup, productGroup } from "./selector";

export const listener = () => {
  categoryGroup.addEventListener("click", categoryHandler);
  productGroup.addEventListener("click", cartItemGroupHandler);
  cartItemGroup.addEventListener("click", cartItemDeleteHandler);
};

export default listener;
