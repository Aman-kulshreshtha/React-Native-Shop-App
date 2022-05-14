import ADD_ORDER from "../actions/Order";
import Order from "../../models/Order";
import { useSelector } from "react-redux";
import { SET_ORDERS } from "../actions/Order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  const orders = state.orders;

  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
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
