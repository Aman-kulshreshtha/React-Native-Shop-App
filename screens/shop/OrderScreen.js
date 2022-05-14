import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import { useState, useCallback, useEffect } from "react";
import { fetchOrders } from "../../store/actions/Order";
const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const [isError, setIsError] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsError(false);
    setIsRefreshing(true);
    try {
      await dispatch(fetchOrders());
    } catch (err) {
      setIsError(true);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsError, setIsRefreshing]);

  // console.log("current state of orders ", orders);
  useEffect(() => {
    try {
      setIsLoading(true);
      loadOrders().then(() => setIsLoading(false));
    } catch (err) {
      setIsError(true);
    }
  }, [loadOrders, setIsError, setIsLoading]);

  if (isError) {
    return (
      <View style={style.center}>
        <Text>Something went wrong</Text>
        <View style={style.btn}>
          <Button title="Try Again !" color={"#c2186b"} onPress={loadOrders} />
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={style.center}>
        <ActivityIndicator color={"#c2185b"} size="large" />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={style.center}>
        <Text>You currently don't have any orders</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadOrders}
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const style = StyleSheet.create({
  btn: {
    margin: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 16,
    marginLeft: 16,
  },
});

export default OrderScreen;
