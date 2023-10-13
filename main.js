import "normalize.css";
import "./style.scss";
import Navigo from "navigo";
import { Header } from "./modules/Header/header";
import { Footer } from "./modules/Footer/footer";
import { Main } from "./modules/Main/main";
import { Order } from "./modules/Order/order";

const productSlider = () => {
  Promise.all([
    import("swiper/modules"),
    import("swiper"),
    import("swiper/css"),
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {
    const swiper = new Swiper.default(".product__slider-thumbnails", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    const swiper2 = new Swiper.default(".product__slider-main", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".product__arrow_next",
        prevEl: ".product__arrow_prev",
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiper,
      },
    });
  });
};

productSlider();

const init = () => {
  new Header().mount();
  new Main().mount();
  new Footer().mount();
  productSlider();

  const router = new Navigo("/", { linkSelector: 'a[href^="/"]' });

  router
    .on("/", () => {
      console.log("главная");
    })
    .on("/category", () => {
      console.log("category");
    })
    .on("/favorite", () => {
      console.log("favorite");
    })
    .on("/search", () => {
      console.log("search");
    })
    .on("/product/:id", (obj) => {
      console.log("obj", obj);
    })
    .on("/cart", () => {
      console.log("cart");
    })
    .on("/order", () => {
      new Order().mount();
    })
    .notFound(() => {
      document.body.innerHTML = "<h2>страница не найдена</h2>";
    });

  router.resolve();
};
init();
