import initialRender from "../core/intialRender";
import listener from "../core/listener";

class Shop {
  init() {
    console.log("Shop App Start");
    initialRender();
    listener();

  }
}

export default Shop;
