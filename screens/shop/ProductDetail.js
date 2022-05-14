import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
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

      <Text style={style.heading}>{product[0].title}</Text>

      <Text style={style.desc}>{product[0].description}</Text>

      <View style={style.btn_container}>
        <Button color = {"#c2185b"} title={"Add to Cart"} onPress={()=> dispatch(cartAction.addToCart(product[0]))} />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn_container: {
    marginVertical: 10,
    alignItems: "center",
  },
  desc: {
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 24,
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
