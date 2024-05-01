import React, { useRef } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

const homeOn = require("assets/icons/bottomtab/home_on.png");
const homeOff = require("assets/icons/bottomtab/home_off.png");
const communityOn = require("assets/icons/bottomtab/community_on.png");
const communityOff = require("assets/icons/bottomtab/community_off.png");
const bookmarkOn = require("assets/icons/bottomtab/bookmark_on.png");
const bookmarkOff = require("assets/icons/bottomtab/bookmark_off.png");
const mypageOn = require("assets/icons/bottomtab/mypage_on.png");
const mypageOff = require("assets/icons/bottomtab/mypage_off.png");

const CustomBottomTab = ({ state, navigation, insets, descriptors }) => {
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;

  const scaleAnimated = (value, animatedValue) =>
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 150,
    });
  const animatedValues = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
  };

  return (
    <View
      style={[
        styles.bottomTabBarWrapper,
        { paddingBottom: insets.bottom + 20 },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;
        const animatedOf = animatedValues[index];

        const iconFlag = (bool) => {
          switch (label) {
            case "Home":
              return bool ? homeOn : homeOff;
            case "Community":
              return bool ? communityOn : communityOff;
            case "Archives":
              return bool ? bookmarkOn : bookmarkOff;
            default:
              return bool ? mypageOn : mypageOff;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          scaleAnimated(1, animatedOf).start(({ finished }) => {
            if (finished) {
              scaleAnimated(0, animatedOf).start();
            }
          });
        };
        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Animated.Image
              source={iconFlag(isFocused)}
              style={{
                width: 24,
                height: 24,
                transform: [
                  {
                    scale: animatedOf.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.9],
                    }),
                  },
                ],
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    zIndex: 10,
  },
});

export default CustomBottomTab;
