function cards() {
  //Использование классов для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 90; //курс
      this.changeToRub();
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    }

    changeToRub() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
          `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${usr}, status: ${res.status}`);
    }

    return await res.json();
  };

  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // getResource("http://localhost:3000/menu").then((data) => createCard(data));

  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement("div");

  //     element.classList.add("menu__item");

  //     element.innerHTML = `
  //     <img src=${img} alt=${altimg} />
  //     <h3 class="menu__item-subtitle">${title}</h3>
  //     <div class="menu__item-descr">
  //       ${descr}
  //     </div>
  //     <div class="menu__item-divider"></div>
  //     <div class="menu__item-price">
  //       <div class="menu__item-cost">Цена:</div>
  //       <div class="menu__item-total"><span>${price}</span> руб/день</div>
  //     </div>
  //     `;
  //     document.querySelector(".menu .container").append(element);
  //   });
  // }

  // new MenuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   "Меню 'Фитнес'",
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: большe свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   3,
  //   ".menu .container",
  //   "menu__item",
  //   "big"
  // ).render();

  // new MenuCard(
  //   "img/tabs/elite.jpg",
  //   "elite",
  //   "Меню “Премиум”",
  //   "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
  //   7,
  //   ".menu .container",
  //   "menu__item",
  //   "big"
  // ).render();

  // new MenuCard(
  //   "img/tabs/post.jpg",
  //   "post",
  //   "Меню 'Постное'",
  //   "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
  //   5,
  //   ".menu .container",
  //   "menu__item",
  //   "big"
  // ).render();
}

module.exports = cards;
