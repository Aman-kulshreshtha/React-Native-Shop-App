import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/CartItem";
import { REMOVE_FROM_CART } from "../actions/cart";
import { DELETE_PRODUCT } from "../actions/product";

// create an initial state
const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        items: {},
        totalAmount: 0,
      };

    case ADD_TO_CART:
      const addedProduct = action.product;
      const price = addedProduct.price;
      const productTitle = addedProduct.title;
      let updatedOrAdded;

      if (state.items[addedProduct.id]) {
        //already have item in the cart
        updatedOrAdded = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          addedProduct.price,
          addedProduct.title,
          state.items[addedProduct.id].sum + price
        );
      } else {
        updatedOrAdded = new CartItem(
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.price
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrAdded },
        totalAmount: state.totalAmount + addedProduct.price,
      };

    case REMOVE_FROM_CART:
      let updatedCartItem = { ...state.items };
      let productToRemove = action.product;
      console.log(productToRemove);
      const key = productToRemove.key;
      const quantity = productToRemove.quantity;

      if (quantity > 1) {
        let updated = new CartItem(
          quantity - 1,
          productToRemove.productPrice,
          productToRemove.productTitle,
          productToRemove.productPrice * (quantity - 1)
        );

        updatedCartItem = {
          ...updatedCartItem,
          [productToRemove.key]: updated,
        };
        console.log(updatedCartItem);

        return {
          ...state,
          items: { ...updatedCartItem },
          totalAmount: state.totalAmount - productToRemove.productPrice,
        };
      } else {
        delete updatedCartItem[key];
        return {
          ...state,
          items: { ...updatedCartItem },
          totalAmount: state.totalAmount - productToRemove.productPrice,
        };
      }

    case DELETE_PRODUCT:
      const updatedProduct = { ...state.items };
      if (!state.items[action.pid]) {
        return state;
      }
      const itemTotal = state.items[action.pid].sum;
      delete updatedProduct[action.pid];

      return {
        ...state,
        items: updatedProduct,
        totalAmount: state.totalAmount - itemTotal,
      };
  }

  return state;
};
