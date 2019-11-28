import React from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useNavigation } from "@react-navigation/core";

import CardIcon from "./CardIcon.js";

const Card = props => {
  const navigation = useNavigation();

  return (
    <FlatList
      // On récupère la data en props
      data={props.products}
      keyExtractor={element => {
        return String(element._id);
      }}
      // On boucle sur la data afin de récupérer les éléments à disposition
      renderItem={({ item }) => {
        return (
          // View contenant l'ensemble de la card
          <TouchableOpacity
            style={styles.card}
            // onPress qui nous dirige vers le screen room
            onPress={() => {
              // Transmission de l'id de la room, qui est donc nommée roomId
              navigation.navigate("Room", { roomId: item._id });
            }}
          >
            {/* View contenant l'image */}
            <View>
              <Image style={styles.image} source={{ uri: item.photos[0] }} />
              <Text style={styles.price}>{item.price} €</Text>
            </View>

            {/* View contenant les informations et profile pictures en dessous de l'image */}
            <View style={styles.announceInfos}>
              {/* View contenant seulement les informations */}
              <View style={{ flex: 1 }}>
                {/* Première ligne de texte #TITLE */}
                <Text style={styles.description} numberOfLines={1}>
                  {item.title}
                </Text>

                {/* View comprenant ratings et nombre de reviews */}
                <View style={styles.advice}>
                  {/* Composant qui gère l'affichage des étoiles en fonction de la moyenne de reviews */}
                  <CardIcon item={item.ratingValue} />
                  <Text style={styles.reviews}>{item.reviews} Reviews</Text>
                </View>
              </View>

              {/* View comprenant la profile picture */}
              <View>
                <Image
                  style={{ height: 80, width: 80, borderRadius: 40 }}
                  source={{ uri: item.user.account.photos[0] }}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
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

  price: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: 5,
    backgroundColor: "black",
    color: "white",
    fontWeight: "600"
  },

  announceInfos: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },

  advice: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },

  reviews: { marginLeft: 10 }
});

export default Card;
