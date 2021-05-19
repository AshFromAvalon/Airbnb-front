import React from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../assets/colors";

const FlatCard = ({ flat }) => {
  // const yellowStar = <FontAwesome name="star" size={24} color="#FFB100" />;
  // const greyStar = <FontAwesome name="star" size={24} color={colors.primary} />;
  const stars = [1, 2, 3, 4, 5];

  const renderStar = ({ item }) => {
    if (item === null) return;
    const starColor =
      Number(item) <= Number(flat.ratingValue) ? "#FFB100" : colors.secondary;
    return (
      <FontAwesome
        name="star"
        size={18}
        color={starColor}
        style={{ marginLeft: 5 }}
      />
    );
  };

  const {
    cardContainer,
    flatCover,
    flatPrice,
    priceText,
    flatInfoContainer,
    flatInfo,
    flatOwnerPic,
    flatTitle,
    statsContainer,
    flatReview,
  } = styles;

  return (
    <View style={cardContainer}>
      <View>
        <Image source={{ uri: flat.photos[0].url }} style={flatCover} />
        <View style={flatPrice}>
          <Text style={priceText}>{flat.price} €</Text>
        </View>
      </View>
      <View style={flatInfoContainer}>
        <View style={flatInfo}>
          <Text style={flatTitle} numberOfLines={1} ellipsizeMode="tail">
            {flat.title}
          </Text>
          <View style={statsContainer}>
            <View>
              <FlatList
                contentContainerStyle={{
                  alignItems: "center",
                }}
                horizontal={true}
                data={stars}
                keyExtractor={(item) => item}
                renderItem={(item) => renderStar(item)}
              />
            </View>
            <Text style={flatReview}>{flat.reviews} reviews</Text>
          </View>
        </View>
        <Image
          style={flatOwnerPic}
          source={{ uri: flat.user.account.photo.url }}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },

  flatCover: {
    height: 200,
    width: "100%",
  },

  flatPrice: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 60,
    backgroundColor: "black",
    position: "absolute",
    bottom: 5,
  },

  priceText: {
    color: "white",
  },

  flatInfoContainer: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  flatInfo: {
    flex: 1,
  },

  flatOwnerPic: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },

  flatTitle: {
    fontSize: 18,
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  flatReview: {
    color: colors.secondary,
    fontSize: 12,
    marginLeft: 5,
  },
});

export default FlatCard;
