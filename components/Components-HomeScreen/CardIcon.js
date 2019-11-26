import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CardIcon = props => {
  return (
    <>
      <Ionicons
        name="ios-star"
        size={14}
        color={props.item > 0 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={14}
        color={props.item > 1 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={14}
        color={props.item > 2 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={14}
        color={props.item > 3 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={14}
        color={props.item > 4 ? "gold" : "grey"}
      />
    </>
  );
};

export default CardIcon;
