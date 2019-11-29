import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const SignUpScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const req = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.herokuapp.com/api/user/sign_up",
        {
          email: email,
          username: username,
          password: password
        }
      );
      const userToken = response.data.token;
      props.setToken(userToken);

      const userId = response.data._id;
      props.setId(userId);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>email address</Text>
        <TextInput
          style={{ backgroundColor: "grey" }}
          value={email}
          onChangeText={text => {
            setEmail(text.toLowerCase());
          }}
        />
      </View>
      <View>
        <Text>password</Text>
        <TextInput
          style={{ backgroundColor: "grey" }}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
      </View>
      <View>
        <Text>username</Text>
        <TextInput
          style={{ backgroundColor: "grey" }}
          value={username}
          onChangeText={text => {
            setUsername(text.toLowerCase());
          }}
        />
      </View>
      <TouchableOpacity onPress={req}>
        <Text>Create account</Text>
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
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SignUpScreen;
