import React from "react";
import Swiper from "react-native-swiper";
import { Image, StyleSheet, View } from "react-native";

const ImageSwipe = props => {
  const array = [];
  const photos = props.photos;

  for (let i = 0; i < photos.length; i++) {
    array.push(
      <Image key={i} style={styles.roomImage} source={{ uri: photos[i] }} />
    );
  }

  return (
    <Swiper horizontal={true} showsButtons={true}>
      {array}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  roomImage: { flex: 1, width: "100%" }
});

export default ImageSwipe;
