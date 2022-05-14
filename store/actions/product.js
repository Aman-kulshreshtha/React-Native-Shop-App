import product from "../../models/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const ADD_PRODUCT = "ADD_PRODUCT";

export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
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
            "u1",
            respData[key].title,
            respData[key].imageUrl,
            respData[key].description,
            respData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something is not right");
    }
    const respData = await response.json();

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const editProduct = (id, title, imageUrl, description) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products/${id}.json`,
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

    const respData = await response.json();

    dispatch({
      type: EDIT_PRODUCT,
      product: { id, title, imageUrl, description },
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
  return async (dispatch) => {
    const response = await fetch(
      "https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
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

    const respData = await response.json();

    console.log(respData);
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
