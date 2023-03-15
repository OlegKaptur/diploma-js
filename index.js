const storageCart = window.localStorage.getItem("cart");
const searchField = document.querySelector(".search");




let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const products = {
  product: [
    {
      id: "1",
      img: "https://basket-09.wb.ru/vol1269/part126963/126963650/images/c516x688/1.jpg",
      title: "OPPO Смартфон OPPO А57s 4+64 Гб",
      newPrice: "395",
      oldPrice: "416",
      description: "Смартфон",
    },
    {
      id: "2",
      img: "https://basket-09.wb.ru/vol1269/part126920/126920776/images/c516x688/1.jpg",
      title: "OPPO Смартфон А17 4+64 Гб",
      newPrice: "345",
      oldPrice: "354",
      description: "Смартфон",
    },
    {
      id: "3",
      img: "https://basket-08.wb.ru/vol1151/part115119/115119935/images/c516x688/1.jpg",
      title: "Realme С31 4/64Gb",
      newPrice: "334",
      oldPrice: "365",
      description: "Смартфон",
    },
    {
      id: "4",
      img: "https://basket-10.wb.ru/vol1413/part141396/141396283/images/c516x688/1.jpg",
      title: "Apple iPhone 14 128GB (США)",
      newPrice: "2750",
      oldPrice: "3026",
      description: "Смартфон",
    },
    {
      id: "5",
      img: "https://basket-05.wb.ru/vol995/part99532/99532385/images/c516x688/1.jpg",
      title: "Samsung Galaxy S21 FE 5G 128GB",
      newPrice: "1680",
      oldPrice: "1530",
      description: "Смартфон",
    },
    {
      id: "6",
      img: "https://basket-09.wb.ru/vol1210/part121026/121026730/images/c516x688/1.jpg",
      title: "VIVO Смартфон vivo V25e 8GB/128GB",
      newPrice: "866",
      oldPrice: "833",
      description: "Смартфон",
    },
  ],
  findById(id) {
    return this.product.find((product) => product.id === id);
  },

  filterByName(str) {
    return this.product.filter((productItem) => {
      return productItem.title.trim().toLowerCase().indexOf(str) > -1;
    });
  },

  showModal(productId) {
    const product = this.findById(productId);
    const modalContainer = document.querySelector(".modal");
    if (product) this.renderModal(product);
    modalContainer.classList.add("show");
    setTimeout(() => {
      modalContainer.classList.add("visible");
    });
  },
  hideModal() {
    const modalContainer = document.querySelector(".modal");
    const modal = document.querySelector(".modal__content");
    modalContainer.classList.remove("visible");
    setTimeout(() => {
      modalContainer.classList.remove("show");
    });
    modal.innerHTML = null;
    console.log("close");
  },

  renderModal(product) {
    const modal = document.querySelector(".modal__content");
    modal.innerHTML += `
  <article class="product__items">
     <img
     src="${product.img}"
     alt="telephone" data-id-foto=${product.id}/>
 <button class="product__bth" data-product-id=${product.id}>
   <i class="fas fa-shopping-cart"></i>
 </button>
 <div class="product__price">
   <span class="product__price-new">${product.newPrice}</span>
   <span class="product__price-old">${product.oldPrice}</span>
 </div>
 <h3 class="product__title">${product.title}</h3>
</article>
 `;
  },
};

const rennderProducts = () => {
  const section = document.querySelector(".products");
  section.innerHTML = null;
  products.product.forEach((product) => {
    section.innerHTML += `
     <article class="product__items">
        <img
        src="${product.img}"
        alt="telephone" data-id-foto=${product.id}/>

    <div class="product__action">
      <buttom href="" class="add-to-cart" data-product-id=${product.id}>Быстрый просмотр</buttom>
        </div>
    <button class="product__bth" data-product-id=${product.id}>
      <i class="fas fa-shopping-cart"></i>
    </button>
    <div class="product__price">
      <span class="product__price-new">${product.newPrice} р.</span>
      <span class="product__price-old">${product.oldPrice} р.</span>
    </div>
    <h3 class="product__title">${product.title}</h3>
  </article>
    `;
  });

};

const basket = {
  basketList: [],
  groupedCart: {},
  updateCount() {
    const count = document.querySelector(".header__quantity");
    count.innerHTML = this.basketList.length;
  },
  addToCart(productId) {
    const product = products.findById(productId);
    console.log(product);
    this.basketList.push(product);
    this.updateCount();
    this.saveToStorage();
    this.groupById();
    this.rennderBasket();

  },
  updateCart(products) {
    this.basketList = products;
    this.updateCount();
    this.groupById();
  },
  groupById() {
    this.groupedCart = this.basketList.reduce((group, product) => {
      const { id } = product;
      group[id] = group[id] ?? [];
      group[id].push({
        image: product.img,
        title: product.title,
        price: product.newPrice,
      });

      return group;
    }, {});
  },
  calcTotal() {
    let summ = 0;
    this.basketList.forEach((product) => {
      summ += Number(product.newPrice);
    });
    return summ;
  },
  rennderBasket() {
    const section = document.querySelector(".basket-list");
    section.innerHTML = null;
    Object.values(this.groupedCart).forEach((product) => {
      section.innerHTML += `
    <div class="basket-item">
      <span class="basket-name">${product[0].title}</span>
      <span class="basket-count">${product.length}</span>
      <span class="basket-price">${
        product.length * Number(product[0].price)
      } р.</span>
    </div>
    `;
    });
    section.innerHTML += `<div class="basket-total"><b>Итого</b>: ${this.calcTotal()} р.</div>`;
  },


cleanToStorage() {
  window.localStorage.removeItem("cart", JSON.stringify(this.basketList));
},

  saveToStorage() {
    window.localStorage.setItem("cart", JSON.stringify(this.basketList));
  },
};



const basket_bt = document.querySelector(".header__bth");
const basket_container = document.querySelector(".basket-container");
basket_bt.addEventListener("click", function () {
  basket_container.classList.toggle("active-basket");
});



rennderProducts();

const search = {
  renderItems(items) {
    const section = document.querySelector(".search-result");
    section.innerHTML = null;
    items.forEach((product) => {
      section.innerHTML += `
      <div class="search-item">
        <img
        src="${product.img}"
        alt="telephone" data-id-foto=${product.id}/>
      <div class="search-title">${product.title}</div>
      <div class="search-price">
      <span class="product__price-new">${product.newPrice} р.</span>
      <button class="product__bth" data-product-id=${product.id}>
        <i class="fas fa-shopping-cart"></i>
      </button>
      </div>
      </div>
      `;
    });
  },
};

searchField.addEventListener("keyup", () => {
  const searchString = searchField.value.toLowerCase();
  if (searchString.length >= 3) {
    const searchResult = products.filterByName(searchString);
    if (searchResult.length) {
      search.renderItems(searchResult);
    } else {
      search.renderItems([]);
    }
  } else {
    search.renderItems([]);
  }
});

document.addEventListener("click", (e) => {
  let productId = e.target.dataset.productId;
  const showModal = e.target.closest(".add-to-cart");
  const closeModal = e.target.closest(".modal__close");
  const addCartButton = e.target.closest(".product__bth");
  const clearBasket = e.target.closest(".basket-container__deleteAll");
  

  if (e.target.closest('.fa-shopping-cart')) {
    productId = e.target.offsetParent.dataset.productId;

    
}


  if (clearBasket) {
    basket.updateCart([]);
    basket.rennderBasket()
    basket.cleanToStorage();
  }
  if (showModal) {
    products.showModal(productId);
  }
  if (closeModal) {
    products.hideModal();
  }
  if (addCartButton) {
    basket.addToCart(productId);
  }
});

if (storageCart) {
  basket.updateCart(JSON.parse(storageCart));
  basket.rennderBasket(JSON.parse(storageCart));
}


