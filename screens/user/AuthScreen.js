import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { signup } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth";
import { refreshState } from "../../store/actions/auth";

const AuthScreen = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        setIsLoading(false);
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationTime } = transformedData;
      const expiryTime = new Date(expirationTime);
      if (expiryTime <= new Date() || !token || !userId) {
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        dispatch(refreshState(userId, token));
      }
    };
    tryLogin();
  }, []);

  const emailChangeHandler = (text) => {
    setEmail(text);
  };

  const passwordChangeHandler = (text) => {
    setPassword(text);
  };

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);

    if (isSignUp) {
      console.log("let's try");
      dispatch(signup(email, password))
        .then(() => {
          Alert.alert("Success", "You can now log in ", [{ title: "Okay" }]);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      dispatch(login(email, password))
        .then(() => {})
        .catch((error) => {
          setError(error);
        });
    }

    setIsLoading(false);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error Occured", error.message, [{ title: "okay" }]);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={emailChangeHandler}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={passwordChangeHandler}
          secureTextEntry
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size={"large"} color={"#c2185b"} />
      ) : (
        <>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={authHandler} style={styles.btn}>
              <Text style={styles.btnText}>
                {isSignUp ? "Sign Up" : "Log In "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsSignUp((previousState) => !previousState);
              }}
              style={[styles.btn, styles.btnOutline]}
            >
              <Text style={styles.btnOutlineText}>
                {isSignUp ? "Switch to Log In" : "Switch to Sign up"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  // return (
  //   <KeyboardAvoidingView
  //     behavior="padding"
  //     style={{
  //       marginTop: 20,
  //       paddingHorizontal: 16,
  //       flex: 1,
  //     }}
  //   >
  //     <ScrollView>
  //       <View style={styles.form}>
  //         <View style={styles.formControl}>
  //           <Text style={styles.label}>Email</Text>
  //           <TextInput
  //             style={styles.input}
  //             value={email}
  //             onChangeText={emailChangeHandler}
  //           />
  //         </View>
  //         <View style={styles.formControl}>
  //           <Text style={styles.label}>Password</Text>
  //           <TextInput
  //             secureTextEntry
  //             style={styles.input}
  //             value={password}
  //             onChangeText={passwordChangeHandler}
  //           />
  //         </View>
  //       </View>
  // {isLoading ? (
  //   <ActivityIndicator size={"large"} color={"#c2185b"} />
  // ) : (
  //   <>
  //     <View style={styles.btn}>
  //       <Button
  //         title={isSignUp ? "Sign Up" : "Log In "}
  //         onPress={authHandler}
  //         color={"#c2185b"}
  //       />
  //     </View>
  //     <View style={styles.btn}>
  //       <Button
  //         title={isSignUp ? "Switch to Log In" : "Switch to Sign up"}
  //         onPress={() => {
  //           setIsSignUp((previousState) => !previousState);
  //         }}
  //         color={"#c2185b"}
  //       />
  //     </View>
  //   </>
  //       )}
  //     </ScrollView>
  //   </KeyboardAvoidingView>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#c2185b",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#c2185b",
    borderWidth: 2,
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  btnOutlineText: {
    color: "#c2185b",
    fontWeight: "700",
    fontSize: 16,
  },
});
export default AuthScreen;
