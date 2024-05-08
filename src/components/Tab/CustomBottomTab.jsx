import React, { useRef } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

const homeOn = require("assets/bottomtab/home_on.png");
const homeOff = require("assets/bottomtab/home_off.png");
const communityOn = require("assets/bottomtab/community_on.png");
const communityOff = require("assets/bottomtab/community_off.png");
const bookmarkOn = require("assets/bottomtab/bookmark_on.png");
const bookmarkOff = require("assets/bottomtab/bookmark_off.png");
const mypageOn = require("assets/bottomtab/mypage_on.png");
const mypageOff = require("assets/bottomtab/mypage_off.png");

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
          <View
            key={route.key}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
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
                resizeMode={"contain"}
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
          </View>
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
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#EEE",
    backgroundColor: "#FFF",
    paddingTop: 12,
    zIndex: 10,
  },
});

export default CustomBottomTab;
