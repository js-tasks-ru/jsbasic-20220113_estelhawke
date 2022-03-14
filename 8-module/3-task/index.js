export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product === null || product === undefined) return; // проверка на null/undefined товар

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (!cartItem) { // проверка есть ли товар в корзине 
      cartItem = {
        product,
        count : 1 // установление count : 1
      };
      this.cartItems.push(cartItem); //  добавление товара в корзину  
    } else {
      cartItem.count + 1;
    };
    this.onProductUpdate(cartItem);
  
}

updateProductCount(productId, amount) {

  let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;
    
     if (cartItem.count === 0) {
       this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);   // удаление товара
      };
      
     this.onProductUpdate(cartItem);
  }


  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    } else {
      return false;
    };
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, product) => totalCount + product.count, 0);
  }

  getTotalPrice() {
   return this.cartItems.reduce((totalPrice, product) => totalPrice + (product.product.price * product.count), 0);
 
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

