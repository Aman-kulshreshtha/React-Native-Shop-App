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
import { useState } from "react";

export default function UserProductScreen(props) {
  const products = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const showAlert = () => {};

  if (products.length === 0) {
    return (
      <View style={style.center}>
        <Text>No Products found. Add some to see them here</Text>
      </View>
    );
  }

  return (
    <FlatList
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
                        dispatch(deleteProduct(itemData.item.id)).then();
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
