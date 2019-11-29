import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";

const SignInScreen = ({ setToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const req = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.herokuapp.com/api/user/log_in",
        {
          email: email,
          password: password
        }
      );
      const userId = response.data._id;
      setId(userId);
      const userToken = response.data.token;
      setToken(userToken);

      // const userId = response.data._id
    } catch (error) {
      alert("Mauvais mot de passe");
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons name="md-home" size={120} color={"#DFDFDF"} />
      </View>
      <View style={styles.welcome}>
        <Text style={styles.welcomeMessage}>Welcome</Text>
      </View>
      <View style={styles.placeHolder}>
        <TextInput
          style={styles.placeHolderInput}
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text.toLocaleLowerCase());
          }}
        />
        <TextInput
          style={styles.placeHolderInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={req}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        style={{ marginTop: 10 }}
      >
        <Text style={{ textDecorationLine: "underline" }}>
          Don't have an account ? Click here !
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#F8585D",
    paddingHorizontal: 30,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logo: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 30
  },

  welcome: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 120
  },
  welcomeMessage: {
    fontWeight: "300",
    fontSize: 45,
    color: "#FFFFFF"
  },

  placeHolder: {
    alignItems: "flex-start",

    justifyContent: "center",
    marginBottom: 40
  },

  placeHolderInput: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    width: 300,
    paddingLeft: 18
  },

  buttonContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30
  },

  button: {
    paddingVertical: 15,
    paddingHorizontal: 45,
    fontSize: 24,
    fontWeight: "300",
    color: "#FF767A"
  }
});

export default SignInScreen;
