import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import { addProduct, editProduct } from "../../store/actions/product";

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const prodId = props.route.params.pid;
  const [error, setError] = useState(false);
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const showAlert = () => {
    Alert.alert("Confirmation", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            if (!editedProduct) {
              try {
                await dispatch(
                  addProduct(
                    new Date().toString(),
                    "u1",
                    title,
                    imageUrl,
                    description,
                    +price
                  )
                );
              } catch (err) {
                () => {
                  setError(true);
                };
              }
            } else {
              try {
                await dispatch(
                  editProduct(prodId, title, imageUrl, description)
                );
              } catch (err) {
                setError(true);
              }
            }
            props.navigation.goBack();
          } catch (error) {
            console.log("error");
          }
        },
      },
    ]);
  };

  if (error) {
    return (
      <View>
        <Text>SOmething is not right</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>

      <Button title="confirm" onPress={showAlert} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
