import { productGroup, productTemplate } from "../core/selector";

export const createProduct = (product) => {
  const template = productTemplate.content.cloneNode(true);
  template
    .querySelector(".product-card")
    .setAttribute("product-id", product.id);
  template.querySelector(".product-img").src = product.image;
  template.querySelector(".product-title").innerText = product.title;
  template.querySelector(".product-description").innerText =
    product.description;
  template.querySelector(".product-price").innerText = product.price;
  template.querySelector(
    ".product-rating"
  ).innerText = `(${product.rating.rate}/${product.rating.count})`;

  const isExitedInCart = cartItemGroup.querySelector(
    `[cart-product-id="${product.id}"]`
  );

  // console.log(isExitedInCart);
  if (isExitedInCart) {
    template
      .querySelector(".product-add-cart-btn")
      .setAttribute("disabled", true);
    template.querySelector(".product-add-cart-btn").innerText = "Added";
  }

  // console.log(Math.round(product.rating.rate));

  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `     <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-4 h-4 ${
      i <= Math.round(product.rating.rate) ? "fill-gray-700" : "fill-gray-400"
    }"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>`;
  }

  template.querySelector(".product-star").innerHTML = stars;
  return template;
};

export const renderProduct = (products) => {
  productGroup.innerHTML = null;
  products.forEach((product) => productGroup.append(createProduct(product)));
};
