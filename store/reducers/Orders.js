import ADD_ORDER from "../actions/Order";
import Order from "../../models/Order";

import { SET_ORDERS } from "../actions/Order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  const orders = state.orders;

  switch (action.type) {
    // updating the orders state with the latest orders
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    // adding the new order to the state
    case "ADD_ORDER":
      const newOrder = new Order(
        action.id,
        action.items,
        action.amount,
        action.date
      );

      orders.push(newOrder);

      const newState = {
        orders: [...orders],
      };

      return newState;
  }

  return state;
};
