import { useSelector } from "react-redux";
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useDispatch } from "react-redux";
import * as cartAction from "../../store/actions/cart";
import { useCallback, useEffect } from "react";
import { fetchProducts } from "../../store/actions/product";
import { useState } from "react";
import { useInsertionEffect } from "react";

export default function ProductsOverviewScreen(props) {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadData = useCallback(async () => {
    setIsError(false);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setIsError(true);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsError, setIsRefreshing]);

  //will be run only when the component is loaded and would fetch the list of products from server
  useEffect(() => {
    try {
      setIsLoading(true);
      loadData().then(() => setIsLoading(false));
    } catch (err) {
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
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              title: itemData.item.title,
            });
          }}
        >
          <View style={style.action}>
            <Button
              color={"#c2185b"}
              title="View Detail"
              onPress={() => {
                props.navigation.navigate("ProductDetail", {
                  productId: itemData.item.id,
                  title: itemData.item.title,
                });
              }}
            />
            <Button
              color={"#c2185b"}
              title="Add to Cart"
              onPress={() => {
                dispatch(cartAction.addToCart(itemData.item));
              }}
            />
          </View>
        </ProductItem>
      )}
    />
  );
}

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
