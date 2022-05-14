import PRODUCTS from "../../data/dummy-data.js";
import Product from "../../models/product.js";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from "../actions/product.js";

import { SET_PRODUCTS } from "../actions/product.js";
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === "u1"),
      };

    case ADD_PRODUCT:
      const newP = action.product;
      const newProduct = new Product(
        newP.id,
        newP.ownerId,
        newP.title,
        newP.imageUrl,
        newP.description,
        newP.price
      );

      const newAvailableProducts = [...state.availableProducts, newProduct];
      const newUserProducts = newAvailableProducts.filter(
        (prod) => prod.ownerId === "u1"
      );
      return {
        ...state,
        availableProducts: newAvailableProducts,
        userProducts: newUserProducts,
      };

    case EDIT_PRODUCT:
      const updated = [...state.availableProducts];

      const title = action.product.title;
      const id = action.product.id;
      const imageUrl = action.product.imageUrl;
      const description = action.product.description;

      for (var i in updated) {
        if (updated[i].id == id) {
          updated[i].title = title;
          updated[i].imageUrl = imageUrl;
          updated[i].description = description;
          break; //Stop this loop, we found it!
        }
      }

      const updatedUser = updated.filter((prod) => prod.ownerId === "u1");

      return {
        ...state,
        availableProducts: updated,
        userProducts: updatedUser,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
