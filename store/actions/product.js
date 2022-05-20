import product from "../../models/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const ADD_PRODUCT = "ADD_PRODUCT";

export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        "https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products.json",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("something is not right");
      }
      const respData = await response.json();

      const loadedProducts = [];

      for (let key in respData) {
        loadedProducts.push(
          new product(
            key,
            respData[key].ownerId,
            respData[key].title,
            respData[key].imageUrl,
            respData[key].description,
            respData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userId: userId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.token;

    const response = await fetch(
      `https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something is not right");
    }
    const respData = await response.json();

    dispatch({ type: DELETE_PRODUCT, pid: productId, userId: userId });
  };
};

export const editProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.token;
    // console.log(
    //   `https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`
    // );

    const response = await fetch(
      `https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.log(errData);
      throw new Error("Unable to update product");
    }

    const respData = await response.json();

    dispatch({
      type: EDIT_PRODUCT,
      product: { id, title, imageUrl, description, userId: userId },
    });
  };
};

export const addProduct = (
  id,
  ownerId,
  title,
  imageUrl,
  description,
  price
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const userId = getState().auth.token;

    const response = await fetch(
      `https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId,
          title,
          imageUrl,
          description,
          price,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to Add product");
    }

    const respData = await response.json();
    fetchProducts();

    dispatch({
      type: ADD_PRODUCT,
      product: {
        id: respData.name,
        ownerId,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};
