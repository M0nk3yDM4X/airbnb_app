import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import { useRoute } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageSwipe from "../components/Components-RoomScreen/ImageSwipe.js";

import MapView from "react-native-maps";

import axios from "axios";

import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import CardIcon from "../components/Components-HomeScreen/CardIcon.js";

const RoomScreen = () => {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState({});
  // const [pictures, setPictures] = useState([]);
  const [descriptionLength, setDescriptionLength] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room/" + params.roomId
    );
    setRoom(response.data);
    // setPictures(response.data.photos);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const array = [];

  if (isLoading === false) {
    let photos = room.photos;
    for (let i = 0; i < photos.length; i++) {
      array.push(
        <Image key={i} style={styles.roomImage} source={{ uri: photos[i] }} />
      );
    }
  }

  return (
    <>
      {isLoading === true ? (
        <View style={styles.generalContainer}>
          <ActivityIndicator size={"large"} color="#FF5B60" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* <ImageSwipe photos={room.photos} /> */}
          <Swiper horizontal={true} showsButtons={true}>
            {array}
          </Swiper>

          <View style={styles.wrapperContent}>
            <View style={{ height: "60%", padding: 0 }}>
              <View style={styles.infosAndAvatar}>
                <View style={styles.infos}>
                  <Text style={styles.title} numberOfLines={1}>
                    {room.title}
                  </Text>
                  <View style={styles.advice}>
                    <CardIcon item={room.ratingValue} />
                    <Text style={styles.reviews}>{room.reviews} reviews</Text>
                  </View>
                </View>

                <View>
                  <Image
                    style={styles.avatar}
                    source={{ uri: room.user.account.photos[0] }}
                  />
                </View>
              </View>

              <View style={styles.description}>
                <TouchableOpacity
                  onPress={() => {
                    setDescriptionLength(!descriptionLength);
                  }}
                >
                  <Text
                    style={styles.textDescription}
                    numberOfLines={descriptionLength === false ? 3 : null}
                  >
                    {room.description}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.mapContainer}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: 48.856614,
                  longitude: 2.3522219,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09
                }}
              >
                <MapView.Marker
                  coordinate={{ latitude: room.loc[1], longitude: room.loc[0] }}
                />
              </MapView>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  roomImage: { flex: 1, width: "100%" },

  wrapperContent: {
    height: "60%",
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF"
  },

  infosAndAvatar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  infos: {
    flex: 1,
    marginRight: 5
  },

  title: {
    fontSize: 21,
    fontWeight: "300"
  },

  advice: {
    flexDirection: "row",
    marginTop: 5
  },

  reviews: {
    marginLeft: 10
  },

  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40
  },

  description: {
    flex: 1
  },

  textDescription: {
    fontSize: 15,
    fontWeight: "300"
  },

  mapContainer: {
    height: "40%",
    backgroundColor: "yellow"
  }
});

export default RoomScreen;
