import { API_URL } from '../../const';
import { addContainer } from "../Main/addContainer";

export class ProductList {
  static instance = null;

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;
      this.element = document.createElement("section");
      this.element.classList.add("goods");
      this.containerElement = addContainer(this.element, "goods__container");
      this.isMounted = false;

      this.addEvents();
    }

    return ProductList.instance;
  }

  mount(parent, data, title) {
    this.containerElement.textContent = "";
    const titleElem = document.createElement("h2");
    titleElem.textContent = title ? title : "Список товаров";
    titleElem.className = title
      ? "goods__title"
      : "goods__title visually-hidden";

    this.containerElement.append(titleElem);

    this.updateListElem(data);

    if (this.isMounted) {
      return;
    }

    parent.appendChild(this.element);

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  addEvents() {}
  updateListElem(data = []) {
    const listElem = document.createElement("ul");
    listElem.classList.add("goods__list");

    const listItems = data.map((item) => {
      const listItemElem = document.createElement("li");
      listItemElem.classList.add("goods__item");
      listItemElem.innerHTML = this.getHTMLTemplateListItem(item);
      return listItemElem;
    });
    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  getHTMLTemplateListItem({id, price, name: title, images: [image]}) {
    return `
    <article class="goods__card card">
                <a href="/product/${id}" class="card__link card__link_img"
                  ><img
                    src="${API_URL}${image}"
                    alt="${title}"
                    class="card__img"
                /></a>

                <div class="card__info">
                  <h3 class="card__title">
                    <a href="/product/${id}" class="card__link">
                      ${title}
                    </a>
                  </h3>
                  <p class="card__price">${price.toLocaleString()}₸</p>
                </div>

                <button class="card__btn" data-id="${id}">В корзину</button>
                <button class="card__favorite" data-id="${id}">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.41325 13.8736C8.18658 13.9536 7.81325 13.9536 7.58659 13.8736C5.65325 13.2136 1.33325 10.4602 1.33325 5.79356C1.33325 3.73356 2.99325 2.06689 5.03992 2.06689C6.25325 2.06689 7.32658 2.65356 7.99992 3.56023C8.67325 2.65356 9.75325 2.06689 10.9599 2.06689C13.0066 2.06689 14.6666 3.73356 14.6666 5.79356C14.6666 10.4602 10.3466 13.2136 8.41325 13.8736Z"
                      fill="white"
                      stroke="#1C1C1C"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </article>
    `;
  }
}
