import React from "react";
import Swiper from "react-native-swiper";
import { Image, StyleSheet, Text } from "react-native";

const ImageSwipe = props => {
  const array = [];
  const photos = props.photos;

  for (let i = 0; i < photos.length; i++) {
    array.push(
      <Image key={i} style={styles.roomImage} source={{ uri: photos[i] }} />
    );
  }

  return (
    <>
      <Swiper horizontal={true} showsButtons={true} showsPagination={false}>
        {array}
      </Swiper>
      <Text style={styles.price}>{props.price} €</Text>
    </>
  );
};

const styles = StyleSheet.create({
  roomImage: { flex: 1, width: "100%" },
  price: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: 5,
    backgroundColor: "black",
    color: "white",
    fontWeight: "600"
  }
});

export default ImageSwipe;
