import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CartItem(props) {
  console.log(props);
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.qty} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </Text>

      <View style={styles.itemData}>
        <Text style={styles.mainText}>
          {Math.round(props.amount.toFixed(2) * 100) / 100}
        </Text>
        {props.showDelete && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.delete_button}
          >
            <Ionicons name={"md-trash"} size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
    marginHorizontal: 20,
    flexDirection: "row",
  },

  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },

  quantity: {
    color: "#888",
    fontSize: 16,
  },

  mainText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  delete_button: {
    maginLeft: 20,
  },
});
