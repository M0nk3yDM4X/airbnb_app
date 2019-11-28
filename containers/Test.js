import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View
} from "react-native";

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
    <ScrollView>
      <View style={styles.container}>
        {isLoading === true ? (
          <Text>Loading...</Text>
        ) : (
          products.map((element, index) => {
            return (
              <View key={index} style={styles.card}>
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: element.photos[0] }}
                  />
                </View>
                <Text style={styles.description}>{element.description}</Text>
                <Text style={styles.reviews}>{element.reviews} reviews</Text>
              </View>
            );
          })
        )}

        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25
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

  description: {
    marginVertical: 10
  }
});

export default HomeScreen;

const array = [];
const photos = room.photos;

for (let i = 0; i < photos.length; i++) {
  array.push(
    <Image key={i} style={styles.roomImage} source={{ uri: photo }} />
  );
}

{
  pictures.map((element, index) => {
    tab = [];
    tab.push(
      <Image key={index} style={styles.roomImage} source={{ uri: element }} />
    );
    return <Swiper horizontal={true}>{tab}</Swiper>;
  });
}

{
  pictures.map((element, index) => {
    return <Swiper key={index} horizontal={true} image={element} />;
  });
}

const array = [];

if (isLoading === false) {
  let photos = room.photos;
  for (let i = 0; i < photos.length; i++) {
    array.push(
      <Image key={i} style={styles.roomImage} source={{ uri: photos[i] }} />
    );
  }
}

<Swiper horizontal={true} showsButtons={true}>
  {array}
</Swiper>;

{
  /* <View style={{ flex: 1 }}>
<ImageSwipe photos={room.photos} />
</View>
<View style={styles.wrapperContent}>
<View style={{ flex: 1, padding: 0 }}>
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
</View> */
}
