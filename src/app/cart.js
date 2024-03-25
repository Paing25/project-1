import { products } from "../core/data";
import {
  cartCount,
  cartItemCount,
  cartItemGroup,
  cartTemplate,
  cartTotal,
} from "../core/selector";

export const createCartItem = (product, quantity) => {
  const template = cartTemplate.content.cloneNode(true);
  template
    .querySelector(".cart-item")
    .setAttribute("cart-product-id", product.id);
  template.querySelector(".cart-item-img").src = product.image;
  template.querySelector(".cart-item-title").innerText = product.title;
  template.querySelector(".cart-item-price").innerText = product.price;
  template.querySelector(".cart-item-cost").innerText =
    product.price * quantity;

  template.querySelector(".cart-quantity").innerText = quantity;

  return template;
};

export const countCartItem = () => {
  const totalCartItem = document.querySelectorAll(".cart-item");
  // console.log(totalCartItem);
  return totalCartItem.length;
};

export const updateCartItem = () => {
  const currentCount = countCartItem();
  cartItemCount.innerText = currentCount;
  cartCount.innerText = currentCount;
};

export const calculateTotal = () => {
  const total = [...document.querySelectorAll(".cart-item-cost")]
    .reduce((pv, cv) => pv + parseFloat(cv.innerText), 0)
    .toFixed(2);
  return total;
};

export const updateCartTotal = () => {
  const total = calculateTotal();
  cartTotal.innerText = total;
};
