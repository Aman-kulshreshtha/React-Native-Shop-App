import React, { useState, useEffect, useCallback, useReducer } from "react";
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

const INPUT_UPDATE = "UPDATE";

// const formReducer = (state, action) => {
//   if (action.type === INPUT_UPDATE) {
//     console.log("Hi");
//     const updatedValue = {
//       ...state.inputValues,
//       [action.input]: action.value,
//     };

//     const updatedValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid,
//     };
//     console.log(updatedValue);

//     let formIsValid = true;

//     for (let key in updatedValidities) {
//       formIsValid = formIsValid && updatedValidities[key];
//     }

//     return {
//       inputValue: updatedValue,
//       inputValidities: updatedValidities,
//       formIsValid: formIsValid,
//     };
//   }
//   return state;
// };

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const prodId = props.route.params.pid;

  const [error, setError] = useState(false);
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  // const [formState, dispatchFormState] = useReducer(formReducer, {
  //   inputValues: {
  //     title: editedProduct ? editedProduct.title : "",
  //     imageUrl: editedProduct ? editedProduct.imageUrl : "",
  //     price: "",
  //     description: editedProduct ? editedProduct.description : "",
  //   },
  //   inputValidities: {
  //     title: editedProduct ? true : false,
  //     imageUrl: editedProduct ? true : false,
  //     price: editedProduct ? true : false,
  //     description: editedProduct ? true : false,
  //   },
  //   formIsValid: editedProduct ? true : false,
  // });

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");

  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const userId = useSelector((state) => state.auth.userId);

  // const textChangeHandler = (inputIdentifier, text) => {
  //   let isValid = false;
  //   if (text.trim().length > 0) {
  //     isValid = true;
  //   }
  //   dispatchFormState({
  //     type: INPUT_UPDATE,
  //     value: text,
  //     isValid: isValid,
  //     input: inputIdentifier,
  //   });
  // };

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
          if (!editedProduct) {
            try {
              await dispatch(
                addProduct(
                  new Date().toString(),
                  userId,
                  title,
                  imageUrl,
                  description,
                  +price
                )
              );

              props.navigation.goBack();
            } catch (err) {
              Alert.alert("An error occured", err.message, [{ title: "okay" }]);
            }
          } else {
            try {
              await dispatch(editProduct(prodId, title, imageUrl, description));
              props.navigation.goBack();
            } catch (err) {
              Alert.alert("An error occured", err.message, [{ title: "okay" }]);
            }
          }
        },
      },
    ]);
  };

  if (error) {
    return (
      <View>
        <Text>Something is not right</Text>
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
      <View style={styles.btn}>
        <Button title="confirm" onPress={showAlert} color={"#c2185b"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginVertical: 8,

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
    fontWeight: "700",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
