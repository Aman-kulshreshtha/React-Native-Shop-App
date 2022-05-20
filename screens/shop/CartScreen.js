import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import CartItem from "../../components/shop/CartItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/actions/cart";
import addOrder from "../../store/actions/Order";
import { useState } from "react";

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  let updatedCartItem = [];

  const addOrd = async () => {
    setIsLoading(true);
    try {
      await dispatch(addOrder(cart, total));
    } catch (err) {
      Alert.alert(
        "Something went wrong ",
        "unable to add your orders right now",
        [{ title: "okay" }]
      );
      console.log(err);
    }

    setIsLoading(false);
    Alert.alert(
      "Woohooo",
      "Your order is on it's way and will be delievered to you shortly",
      [{ title: "okay" }]
    );
  };

  let keys = Object.keys(cart);

  for (let key in cart) {
    updatedCartItem.push({
      key: key,
      productPrice: cart[key].productPrice,
      productTitle: cart[key].productTitle,
      quantity: cart[key].quantity,
      amount: cart[key].sum,
    });
  }

  updatedCartItem.sort((a, b) => (a.key > b.key ? 1 : -1));

  return (
    <View>
      <View style={style.summary}>
        <View style={style.total}>
          <Text style={style.heading}>Total: </Text>
          <Text style={style.amount}>${total.toFixed(2)}</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginHorizontal: 16 }}
            size={"small"}
            color={"#c3185b"}
          />
        ) : (
          <Button
            color={"#c2185b"}
            title={"order now"}
            disabled={cart.length === 0}
            onPress={addOrd}
          />
        )}
      </View>

      <FlatList
        data={updatedCartItem}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => (
          <CartItem
            showDelete={true}
            qty={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.amount}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#c2185b",
  },
  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 8,
    alignItems: "center",
    backgroundColor: "white",
    margin: 8,
    padding: 8,
    borderRadius: 10,
    height: 70,
    marginTop: 16,
  },
});

export default CartScreen;
