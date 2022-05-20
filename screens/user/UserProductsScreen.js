import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  Text,
  ActivityIndicator,
  Button,
  View,
  Alert,
  StyleSheet,
} from "react-native";

import ProductItem from "../../components/shop/ProductItem";
import { useDispatch } from "react-redux";
import * as cartAction from "../../store/actions/cart";
import { deleteProduct } from "../../store/actions/product";
import { fetchProducts } from "../../store/actions/product";
export default function UserProductScreen(props) {
  const products = useSelector((state) => {
    console.log("state: ", state);
    return state.products.userProducts;
  });
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsError(false);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setIsError(true);
      console.log(err);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsError, setIsRefreshing]);

  //will be run only when the component is loaded and would fetch the list of products from server
  useEffect(() => {
    try {
      setIsLoading(true);
      loadData().then(() => setIsLoading(false));
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }, [loadData, setIsError]);

  if (isError) {
    return (
      <View style={style.center}>
        <Text>Something went wrong</Text>
        <View style={style.btn}>
          <Button title="Try Again !" color={"#c2186b"} onPress={loadData} />
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

  if (!isLoading && products.length === 0) {
    return (
      <View style={style.center}>
        <Text>No Products as of Now. Why Not start by adding some !!</Text>
        <View style={style.btn}>
          <Button title="Refresh" color={"#c2186b"} onPress={loadData} />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadData}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        >
          <View style={style.action}>
            <Button
              color={"#c2185b"}
              title="   Edit    "
              onPress={() => {
                props.navigation.navigate("EditScreen", {
                  pid: itemData.item.id,
                  title: "Edit Product",
                });
              }}
            />
            <Button
              color={"#c2185b"}
              title="Delete"
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you wish to delete this item?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        dispatch(deleteProduct(itemData.item.id));
                      },
                    },
                  ]
                );
              }}
            />
          </View>
        </ProductItem>
      )}
    />
  );
}

const style = StyleSheet.create({
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 16,
    marginLeft: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    margin: 12,
  },
});
