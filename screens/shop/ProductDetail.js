import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as cartAction from "../../store/actions/cart";

export default ProductDetail = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const product = products.filter(
    (prod) => prod.id == props.route.params.productId
  );

  return (
    <ScrollView>
      <View style={style.imageContainer}>
        <Image style={style.image} source={{ uri: product[0].imageUrl }} />
      </View>

      <View style={style.detailContainer}>
        <Text style={style.heading}>{product[0].title}</Text>

        <Text style={style.desc}>{product[0].description}</Text>

        <View style={style.btn_container}>
          <Button
            color={"#c2185b"}
            title={"Add to Cart"}
            onPress={() => {
              Alert.alert("Success", "item added to cart", [{ title: "okay" }]);
              dispatch(cartAction.addToCart(product[0]));
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  detailContainer: {
    elevation: 5,
    margin: 16,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 10,
  },
  btn_container: {
    margin: 30,
    alignItems: "center",
  },
  desc: {
    marginHorizontal: 20,
    padding: 10,
    fontSize: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  imageContainer: {
    height: 300,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
