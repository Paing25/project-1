import Swal from "sweetalert2";
import {
  countCartItem,
  createCartItem,
  updateCartItem,
  updateCartTotal,
} from "../app/cart";
import { renderProduct } from "../app/products";
import { products } from "./data";
import { cartItemGroup, openDrawer, productGroup } from "./selector";

export const categoryHandler = (event) => {
  if (event.target.classList.contains("cat-btn")) {
    const currentCategory = event.target.innerText;
    document.querySelector(".cat-btn.active")?.classList.remove("active");

    const currentCategoryBtn = event.target;
    currentCategoryBtn.classList.add("active");

    renderProduct(
      products.filter(
        (el) => el.category === currentCategory || currentCategory === "All"
      )
    );
  }
};

export const cartItemGroupHandler = (event) => {
  if (event.target.classList.contains("product-add-cart-btn")) {
    // console.log(event.target);
    const currentBtn = event.target;
    currentBtn.setAttribute("disabled", true);
    currentBtn.innerText = "Added";
    const currentProductCard = event.target.closest(".product-card");
    const currentProductCardId = parseInt(
      currentProductCard.getAttribute("product-id")
    );
    const currentProduct = products.find(
      (product) => product.id === currentProductCardId
    );

    const currentProductCardImg =
      currentProductCard.querySelector(".product-img");

    // console.log(currentProductCardImg);

    const animateImg = new Image();

    animateImg.src = currentProductCardImg.src;
    animateImg.style.position = "fixed";
    animateImg.style.top =
      currentProductCardImg.getBoundingClientRect().top + "px";
    animateImg.style.left =
      currentProductCardImg.getBoundingClientRect().left + "px";
    animateImg.style.width =
      currentProductCardImg.getBoundingClientRect().width + "px";
    animateImg.style.height =
      currentProductCardImg.getBoundingClientRect().height + "px";

    document.body.append(animateImg);
    const keyframes = [
      {
        top: currentProductCardImg.getBoundingClientRect().top + "px",
        left: currentProductCardImg.getBoundingClientRect().left + "px",
      },
      {
        top: openDrawer.getBoundingClientRect().top + "px",
        left: openDrawer.getBoundingClientRect().left + "px",
        width: "0px",
        height: "0px",
        transform: "rotate(2turn)",
      },
    ];
    const duration = 500;

    // console.log(animateImg);
    const addToChartAnimation = animateImg.animate(keyframes, duration);

    const handleAnimationFinish = () => {
      animateImg.remove();
      openDrawer.classList.add("animate__heartBeat");
      openDrawer.addEventListener("animationend", () => {
        openDrawer.classList.remove("animate__heartBeat");
      });
      updateCartItem();
      updateCartTotal();
    };

    addToChartAnimation.addEventListener("finish", handleAnimationFinish);

    cartItemGroup.append(createCartItem(currentProduct, 1));

    // countCartItem();
  }
};

export const cartItemDeleteHandler = (event) => {
  if (event.target.classList.contains("cart-item-remove")) {
    const currentCart = event.target.closest(".cart-item");
    const currentProductId = currentCart.getAttribute("cart-product-id");
    const currentProduct = productGroup.querySelector(
      `[product-id='${currentProductId}']`
    );

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        currentCart.remove();

        const currentProductAddCartBtn = currentProduct.querySelector(
          ".product-add-cart-btn"
        );
        currentProductAddCartBtn.removeAttribute("disabled");
        currentProductAddCartBtn.innerText = "Add cart";
        updateCartItem();
        updateCartTotal();
      }
    });
  } else if (event.target.classList.contains("cart-q-add")) {
    const currentCart = event.target.closest(".cart-item");
    const currentPrice = currentCart.querySelector(".cart-item-price");
    const currentCost = currentCart.querySelector(".cart-item-cost");
    const currentQuantity = currentCart.querySelector(".cart-quantity");

    currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
    currentCost.innerText = currentQuantity.innerText * currentPrice.innerText;
    updateCartTotal();

    // console.log("cart-add");
  } else if (event.target.classList.contains("cart-q-sub")) {
    const currentCart = event.target.closest(".cart-item");
    const currentPrice = currentCart.querySelector(".cart-item-price");
    const currentCost = currentCart.querySelector(".cart-item-cost");
    const currentQuantity = currentCart.querySelector(".cart-quantity");

    if (currentQuantity.innerText > 1) {
      currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
      currentCost.innerText =
        currentQuantity.innerText * currentPrice.innerText;
      updateCartTotal();
    }

    // console.log("cart-sub");
  }
};
