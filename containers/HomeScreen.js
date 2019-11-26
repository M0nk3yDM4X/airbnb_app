import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { Button, Image, StyleSheet, FlatList, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    setProducts(response.data.rooms);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={element => {
            return String(element._id);
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.photos[0] }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.description} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5
                      }}
                    >
                      <Ionicons
                        name="ios-star"
                        size={14}
                        color={item.ratingValue > 0 ? "gold" : "grey"}
                      />
                      <Ionicons
                        name="ios-star"
                        size={14}
                        color={item.ratingValue > 1 ? "gold" : "grey"}
                      />
                      <Ionicons
                        name="ios-star"
                        size={14}
                        color={item.ratingValue > 2 ? "gold" : "grey"}
                      />
                      <Ionicons
                        name="ios-star"
                        size={14}
                        color={item.ratingValue > 3 ? "gold" : "grey"}
                      />
                      <Ionicons
                        name="ios-star"
                        size={14}
                        color={item.ratingValue > 4 ? "gold" : "grey"}
                      />
                      <Text style={styles.reviews}>{item.reviews} Reviews</Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={{ height: 80, width: 80, borderRadius: 40 }}
                      source={{ uri: item.user.account.photos[0] }}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15
  },

  card: {
    paddingVertical: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: "grey"
  },

  image: {
    width: 370,
    height: 218,
    resizeMode: "cover"
  },
  reviews: { marginLeft: 10 }
});

export default HomeScreen;
