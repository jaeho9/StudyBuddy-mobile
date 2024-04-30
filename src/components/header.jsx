import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
const header = ({ left, title, right, leftClick, rightClick }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("rightClick", typeof rightClick);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate(leftClick)}>
        {left ? (
          <Image source={left} style={{ width: 24, height: 24 }} />
        ) : (
          <View style={{ width: 24, height: 24 }}></View>
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        {typeof title === "string" ? (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              lineHeight: 40,
              color: "#FF7474",
            }}
          >
            {title}
          </Text>
        ) : (
          <Image source={title} style={{ width: 40, height: 40 }} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={rightClick}>
        {right ? (
          <Image source={right} style={{ width: 24, height: 24 }} resizeMode="contain" />
        ) : (
          <View style={{ width: 24, height: 24 }}></View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default header;
