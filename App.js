import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { NavigationContainer } from "@react-navigation/native";
import cartReducer from "./store/reducers/cart";
import ProductsReducer from "./store/reducers/product";
import { LogBox } from "react-native";

import ReduxThunk from "redux-thunk";
import OrdersReducer from "./store/reducers/Orders";
import AuthReducer from "./store/reducers/auth";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: cartReducer,
  orders: OrdersReducer,
  auth: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import { Provider } from "react-redux";

import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";

import ShopNavigator from "./navigation/ShopNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
