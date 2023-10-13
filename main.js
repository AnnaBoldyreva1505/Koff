import "normalize.css";
import "./style.scss";
import Navigo from "navigo";
import { Header } from "./modules/Header/header";
import { Footer } from "./modules/Footer/footer";
import { Main } from "./modules/Main/main";
import { Order } from "./modules/Order/order";
import { ProductList } from "./modules/ProductList/productList";
import { ApiService } from "./modules/services/ApiService";
import { Catalog } from "./modules/Catalog/Catalog";
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
  const api = new ApiService();
  new Header().mount();
  new Main().mount();
  new Footer().mount();

  const router = new Navigo("/", { linkSelector: 'a[href^="/"]' });

  api.getProductCategories().then((data) => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  productSlider();

  router
    .on(
      "/",
      async () => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product);
        router.updatePageLinks();
      },
      {
        leave(done) {
            new ProductList().unmount();
          done();
        },
      },
      {
        already() {
          console.log("already");
        },
      }
    )
    .on(
      "/category",
      async ({ params: { slug } }) => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product, slug);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          done();
        },
      }
    )
    .on(
      "/favorite",
      async () => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product, "Избранное");
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          done();
        },
      }
    )
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
    .notFound(
      () => {
        new Main().element.innerHTML = `<h2>страница не найдена</h2>
      <p>Через <span id="countdown">5</span> секунд вы будете перенаправлены <a href="/" на главную страницу</a></p>`;

        function countDown(seconds) {
          const countdownElement = document.getElementById("countdown");

          (function updateCountdown() {
            countdownElement.textContent = seconds--;
            if (seconds >= 0) setTimeout(updateCountdown, 1000);
          })();
        }
        countDown(5);

        setTimeout(() => {
          router.navigate("/");
        }, 5000);
      },
      {
        leave(done) {
          new Main().element.innerHTML = "";
          done();
        },
      }
    );

  router.resolve();
};
init();
