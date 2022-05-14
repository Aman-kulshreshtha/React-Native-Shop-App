import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetail from "../screens/shop/ProductDetail";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderScreen from "../screens/shop/OrderScreen";
import Order from "../models/Order";
import UserProductScreen from "../screens/user/UserProductsScreen";
const Stack = createStackNavigator();
import EditProductScreen from "../screens/user/EditProductScreen";
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      options={{
        title: "Home",
      }}
    >
      <Drawer.Screen
        name="Home Screen"
        component={ShopNavigator}
        options={{
          headerShown: false,
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-home" size={23} color={"#c2185b"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          headerShown: false,

          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-list" size={23} color={"#c2185b"} />
          ),
        }}
      />

      <Drawer.Screen
        name="User Products"
        component={AdminNavigation}
        options={{
          headerShown: false,
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-person" size={23} color={"#c2185b"} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function OrderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Header"
                iconName="menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),

          title: "Orders",
          headerStyle: {
            backgroundColor: "#c2185b",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
}

function AdminNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User Product"
        component={UserProductScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Header"
                iconName="menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Header"
                iconName="md-pencil"
                onPress={() => {
                  navigation.navigate("EditScreen", {
                    title: "Add New Product",
                  });
                }}
              />
            </HeaderButtons>
          ),

          title: "User Products",
          headerStyle: {
            backgroundColor: "#c2185b",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />

      <Stack.Screen
        name="EditScreen"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: "#c2185b",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item title="Header" iconName="checkmark-circle" />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function ShopNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Header"
                iconName="menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Header"
                iconName="cart"
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),

          title: "All Products",
          headerStyle: {
            backgroundColor: "#c2185b",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: "#c2185b",
          },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item title="Header" iconName="md-checkbox" onPress={() => {}} />
            </HeaderButtons>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Cart",
          headerStyle: {
            backgroundColor: "#c2185b",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
