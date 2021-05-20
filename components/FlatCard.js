import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import colors from "../assets/colors";

const FlatCard = ({ flat, description, slider }) => {
  const [showDescription, setShowDescription] = useState(false);

  const renderStars = (numOfStars, ratingValue) => {
    if (numOfStars === null || typeof numOfStars != "number") return;

    const stars = [];

    for (let i = 1; i <= numOfStars; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={18}
          color={i <= Number(ratingValue) ? "#FFB100" : colors.secondary}
          style={{ marginLeft: 5 }}
        />
      );
    }
    return stars;
  };

  const renderTriangle = () => {
    return (
      <Octicons
        name={showDescription ? "triangle-up" : "triangle-down"}
        size={16}
        color={colors.primary}
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
    showMoreBtn,
    showMoreText,
  } = styles;

  return (
    <View style={cardContainer}>
      <View>
        {slider ? (
          <SwiperFlatList
            index={2}
            showPagination
            paginationDefaultColor={colors.secondary}
            index={0}
            paginationStyleItem={{ height: 10, width: 10 }}
            data={flat.photos}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                style={flatCover}
                key={item.picture_id}
              />
            )}
          />
        ) : (
          <Image source={{ uri: flat.photos[0].url }} style={flatCover} />
        )}

        <View style={flatPrice}>
          <Text style={priceText}>{flat.price} €</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: description ? 15 : 0 }}>
        <View style={flatInfoContainer}>
          <View style={flatInfo}>
            <Text style={flatTitle} numberOfLines={1} ellipsizeMode="tail">
              {flat.title}
            </Text>
            <View style={statsContainer}>
              <View style={{ flexDirection: "row" }}>
                {renderStars(5, flat.ratingValue)}
              </View>
              <Text style={flatReview}>{flat.reviews} reviews</Text>
            </View>
          </View>
          <Image
            style={flatOwnerPic}
            source={{ uri: flat.user.account.photo.url }}
          ></Image>
        </View>
        {description ? (
          <View>
            <Text numberOfLines={showDescription ? null : 3}>
              {flat.description}
            </Text>
            <TouchableOpacity
              style={showMoreBtn}
              onPress={() => setShowDescription(!showDescription)}
            >
              <Text style={showMoreText}>Show more</Text>
              {renderTriangle()}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },

  flatCover: {
    height: 200,
    width: width,
  },

  flatPrice: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 80,
    backgroundColor: "black",
    position: "absolute",
    bottom: 10,
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
    paddingRight: 10,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  flatReview: {
    color: colors.secondary,
    fontSize: 12,
    marginLeft: 5,
  },

  showMoreText: {
    color: colors.primary,
    fontSize: 12,
    marginRight: 5,
  },

  showMoreBtn: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default FlatCard;
