import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import colors from "../assets/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

const FlatCard = ({ flat, description, slider }) => {
  const [showDescription, setShowDescription] = useState(false);
  const navigation = useNavigation();
  const stars = [1, 2, 3, 4, 5];

  const renderStar = ({ item }) => {
    if (item === null) return;
    const starColor =
      Number(item) <= Number(flat.ratingValue) ? "#FFB100" : colors.secondary;
    return (
      <FontAwesome
        key={item}
        name="star"
        size={18}
        color={starColor}
        style={{ marginLeft: 5 }}
      />
    );
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
    // marginBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: "lightgrey",
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
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
