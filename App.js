import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import MapListScreen from "./containers/MapListScreen.js";
import RoomScreen from "./containers/RoomScreen.js";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SignUpScreen from "./containers/SignUpSreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  const setId = async id => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        {isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={() => null} />
        ) : userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" options={{ header: () => null }}>
              {() => <SignInScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ header: () => null }}>
              {() => <SignUpScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in
          <Stack.Screen name="Tab" options={{ header: () => null }}>
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => {
                  return {
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === "Settings") {
                        iconName = `ios-options`;
                      } else if (route.name === "Profile") {
                        iconName = "md-person";
                      } else if (route.name === "MapList") {
                        iconName = "ios-map";
                      } else {
                        iconName = `ios-home`;
                      }
                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    title: route.name === "undefined" ? "Home" : route.name // known issue : route.name shouldn't be undefined
                  };
                }}
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray"
                }}
              >
                <Tab.Screen>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "MonAirbnb",
                          headerStyle: {
                            backgroundColor: "#FF5B60"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "400",
                            fontSize: 25
                          }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                          headerStyle: {
                            backgroundColor: "#FF5B60"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "400",
                            fontSize: 25
                          }
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="MapList">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="MapList"
                        options={{
                          title: "MapList",
                          headerStyle: {
                            backgroundColor: "#FF5B60"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "400",
                            fontSize: 25
                          }
                        }}
                      >
                        {() => <MapListScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Profile">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                          headerStyle: {
                            backgroundColor: "#FF5B60"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "400",
                            fontSize: 25
                          }
                        }}
                      >
                        {() => (
                          <ProfileScreen
                            userId={userId}
                            userToken={userToken}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                          headerStyle: {
                            backgroundColor: "#FF5B60"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "400",
                            fontSize: 25
                          }
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
