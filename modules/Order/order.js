import { addContainer } from "../Main/addContainer";

export class Order {
  static instance = null;

  constructor() {
    if (!Order.instance) {
      Order.instance = this;
      this.element = document.createElement("div");
      this.element.classList.add("order");
      this.containerElement = addContainer(this.element, "order__container");
      this.isMounted = false;
    }

    return Order.instance;
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    this.containerElement.insertAdjacentHTML("afterbegin", this.getHTML());

    const mainElement = document.querySelector("main");

    mainElement.appendChild(this.element);

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getHTML() {
    return `
            <div class="order__wrapper">
            <h3 class="order__title">Заказ успешно размещен</h3>
            <p class="order__price">20000 тенге</p>
            <p class="order__number">№75698</p>

            <table class="order__characteristics-table table">
              <caption class="table__title order__subtitle">
                Данные доставки
              </caption>
              <tr class="table__row">
                <td class "table__field">Получатель</td>
                <td class="table__value">Иван Иванович Иванов</td>
              </tr>
              <tr class="table__row">
                <td class="table__field">Телефон</td>
                <td class="table__value">+7707 258 25 87</td>
              </tr>
              <tr class="table__row">
                <td class="table__field">E-mail</td>
                <td class="table__value">qwerty@mail.kz</td>
              </tr>
              <tr class="table__row">
                <td class="table__field">Адрес доставки</td>
                <td class="table__value">Дом, улица</td>
              </tr>
              <tr class="table__row">
                <td class="table__field">Способ оплаты</td>
                <td class="table__value">Картой при получении</td>
              </tr>
              <tr class="table__row">
                <td class="table__field">Способ получения</td>
                <td class="table__value">Доставка</td>
              </tr>
            </table>

            <a href="/" class="order__link">На главную</a>
          </div>
      `;
  }
}
