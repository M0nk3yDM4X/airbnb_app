import React, { useState } from "react";
import CardIcon from "../Components-HomeScreen/CardIcon.js";
import { Image, StyleSheet, Text, View } from "react-native";

const RoomInfos = props => {
  // Creation d'un state concernant la description --> true: pas de limite de lignes, false: limite de 3 lignes
  const [descriptionLength, setDescriptionLength] = useState(false);

  return (
    // View comprenant l'ensemble des informations de la room: titre, note, nombre de reviews, avatar du propriétaire et description du bien.

    <View style={styles.generalInfos}>
      {/* View comprenant titre, note, nombre de reviews, et avatar du propriétaire */}

      <View style={styles.infosAndAvatar}>
        {/* View comprenant titre, note, et nombre de reviews  */}

        <View style={styles.infos}>
          <Text style={styles.title} numberOfLines={1}>
            {props.room.title}
          </Text>
          <View style={styles.advice}>
            <CardIcon item={props.room.ratingValue} />
            <Text style={styles.reviews}>{props.room.reviews} reviews</Text>
          </View>
        </View>

        {/* View comprenant l'avatar du propriétaire  */}

        <View>
          <Image
            style={styles.avatar}
            source={{ uri: props.room.user.account.photos[0] }}
          />
        </View>
      </View>

      {/* View comprenant la description du bien  */}

      <View style={styles.description}>
        <Text
          style={styles.textDescription}
          // onPress qui permet l'actualisation de l'état déclaré, par l'inverse de la valeur précédemment enregistré #TrueOrFalse
          onPress={() => {
            setDescriptionLength(!descriptionLength);
          }}
          // numberOfLines en ternaire indiquant que, si false il y aura 3 lignes d'affichées, sinon l'ensemble de la description
          numberOfLines={descriptionLength === false ? 3 : null}
        >
          {props.room.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  generalInfos: {
    padding: 0,
    marginTop: 5
  },

  infosAndAvatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5
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

  textDescription: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 15
  }
});

export default RoomInfos;
