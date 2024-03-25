import { products } from "./src/core/data";
import { categoryTemplate } from "./src/core/selector";
import Shop from "./src/js/Shop";
import "./style.css";

import "flowbite";

const shop = new Shop();
shop.init();
// console.log(categoryTemplate);

// console.log(products.filter((el) => el.category === "electronics"));
