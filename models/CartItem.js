class CartItem {
  constructor(quantity, productPrice, productTitle, sum, id) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.productId = id;
  }
}

export default CartItem;
