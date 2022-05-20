import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const items = props.items;

  const itemsArray = [];

  for (let key in items) {
    itemsArray.push({ item: items[key], key });
  }

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>On way</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.btn}>
        <Button
          color={"#c2185b"}
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
      </View>
      {showDetails && (
        <View style={styles.detailItems}>
          <FlatList
            data={itemsArray}
            renderItem={(itemData) => (
              <CartItem
                showDelete={false}
                key={itemData.item.item.productId}
                qty={itemData.item.item.quantity}
                amount={itemData.item.item.sum}
                title={itemData.item.item.productTitle}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginVertical: 8,
  },
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,

    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
