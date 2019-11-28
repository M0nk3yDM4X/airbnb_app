import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import axios from "axios";

import ImageSwipe from "../components/Components-RoomScreen/ImageSwipe.js";
import RoomInfos from "../components/Components-RoomScreen/RoomInfos.js";
import MapDisplay from "../components/Components-RoomScreen/MapDisplay.js";

const RoomScreen = () => {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState({});

  const fetchData = async () => {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room/" + params.roomId
    );
    setRoom(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <View style={styles.generalContainer}>
          <ActivityIndicator size={"large"} color="#FF5B60" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ImageSwipe photos={room.photos} price={room.price} />
          </View>
          <View style={styles.wrapperContent}>
            <RoomInfos room={room} />
            <MapDisplay loc={room.loc} />
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

  wrapperContent: {
    flex: 2,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF"
  }
});

export default RoomScreen;
