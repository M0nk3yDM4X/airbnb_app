import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

const MapDisplay = props => {
  return (
    <View style={styles.mapContainer}>
      {/* MapView, composant react qui nous permet l'affichage d'une map, initial region étant une zone indiquant un cercle proche de l'endroit qui sera indiqué par le marker  */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09
        }}
      >
        {/* Marker qui nous permet la localisation exacte du bien via l'utilisation de la latitude et longitude récupérée lors de l'appel à l'API */}
        <MapView.Marker
          coordinate={{ latitude: props.loc[1], longitude: props.loc[0] }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  }
});

export default MapDisplay;
