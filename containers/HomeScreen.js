import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { Button, StyleSheet, Text, View } from "react-native";
import Card from "../components/Components-HomeScreen/Card.js";

const HomeScreen = () => {
  const navigation = useNavigation();

  // Etat pour gérer la question du load des éléments obtenus lors de la requête axios
  const [isLoading, setIsLoading] = useState(true);

  // Etat pour stocker la data récupérée lors de la requête axios, pour ensuite l'utiliser
  const [products, setProducts] = useState([]);

  // Fonction fetchData qui nous permet de faire l'appel axios

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
      );
      setProducts(response.data.rooms);
      setIsLoading(false);
    } catch (error) {
      alert("Erreur");
    }
  };

  // useEffect qui nous permet de faire l'appel de la fonction fetchData, une seule fois, au chargement de la page, et ce grâce au tableau vide.

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <Text>Loading...</Text>
      ) : (
        // Appel du composant Card afin d'en afficher son contenu
        // Transmission de la valeur de l'etat product. Valeur qui est actualisée suite à l'appel de la fonction fetchData dans le useEffect.

        <Card products={products} />
      )}

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15
  }
});

export default HomeScreen;
