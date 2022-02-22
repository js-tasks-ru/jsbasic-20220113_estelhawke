import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`<div class="products-grid"></div>`);
    this.elemGridInner = createElement(`<div class="products-grid__inner"></div>`);
    this.elem.append(this.elemGridInner);
    this.createCards(products);
  }

  createCards(products) { // отрисовка продуктов из массива с помощью класса ProductCard(6 module 2 task)
    
    this.elemGridInner.innerHTML = '';
    console.log(this.elemGridInner)
    for(let i = 0; i < products.length; i++){
     let card = new ProductCard(products[i]);
     this.elemGridInner.append(card.elem);
    }
  }
  

 updateFilter(filters) {

  this.filters = {...this.filters, ...filters} // прибавляем категории фильтра
  console.log(this.filters);

  let filteredProducts = this.products;

  if (this.filters.noNuts) { // фильтр по NoNuts
    filteredProducts = filteredProducts.filter(item => item.nuts != this.filters.noNuts);
  };

  if (this.filters.vegeterianOnly) { // фильтр по vegeterianOnly
    filteredProducts = filteredProducts.filter(item => item.vegeterian == this.filters.vegeterianOnly);
  };

  if (this.filters.maxSpiciness) { // фильтр по maxSpiciness
    filteredProducts = filteredProducts.filter(item => item.spiciness <= this.filters.maxSpiciness);
  };

  if (this.filters.category) { //фильтр по category
    filteredProducts = filteredProducts.filter(item => item.category == this.filters.category);
  };
    console.log(filteredProducts);

    return this.createCards(filteredProducts)
};


 elem () {
  return this.elem;
}



}
