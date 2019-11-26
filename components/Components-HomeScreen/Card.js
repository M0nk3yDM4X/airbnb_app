import React from "react";
import { Image, StyleSheet, FlatList, Text, View } from "react-native";

import CardIcon from "./CardIcon.js";

const Card = props => {
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
          <View style={styles.card}>
            {/* View contenant l'image */}
            <View>
              <Image style={styles.image} source={{ uri: item.photos[0] }} />
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
          </View>
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
