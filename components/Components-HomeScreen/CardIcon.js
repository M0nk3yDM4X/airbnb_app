import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CardIcon = props => {
  const array = [];
  // On fait une boucle permettant de gérer l'affichage des étoiles, colorées en dorée ou en gris.
  for (let i = 0; i < 5; i++) {
    // Si i inférieur à rating value, alors l'étoile sera colorée en dorée et push dans un tableau vide.
    if (i < props.item) {
      array.push(<Ionicons key={i} name="ios-star" size={14} color={"gold"} />);
      // Si non, alors l'étoile sera colorée en gris et push dans un tableau vide.
    } else {
      array.push(<Ionicons key={i} name="ios-star" size={14} color={"grey"} />);
    }
  }

  return <>{array}</>;
};

export default CardIcon;
