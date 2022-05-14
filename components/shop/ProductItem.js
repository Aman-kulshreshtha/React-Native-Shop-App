import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProductItem(props) {
  return (
    <View style={style.box}>
      <View style={style.container}>
        <TouchableOpacity onPress={props.onViewDetail}>
          <Image style={style.image} source={{ uri: props.image }} />
        </TouchableOpacity>
      </View>

      <View style={style.desc}>
        <Text style={style.text}>{props.title}</Text>
        <Text style={style.text}>$ {props.price.toFixed(2)}</Text>
      </View>
      {props.children}
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
  },
  box: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    width: "90%",
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    height: 180,
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  desc: {
    fontSize: 24,
    flexDirection: "column",
    padding: 8,
  },
});
