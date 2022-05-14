import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/orders/u1.json",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("something is not right");
      }
      const respData = await response.json();

      console.log(respData);
      const loadedOrders = [];

      for (let key in respData) {
        loadedOrders.push(
          new Order(
            key,
            respData[key].items,
            respData[key].amount,
            new Date(respData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export default function addOrder(cartItems, totalAmount) {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          amount: totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something is not right");
    }

    const respData = await response.json();

    dispatch({
      id: respData.name,
      type: ADD_ORDER,
      items: cartItems,
      amount: totalAmount,
      date: date,
    });
  };
}
