import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
const Header = ({ left, title, right, leftClick, rightClick}) => {
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
        backgroundColor: "#ffffff",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate(leftClick)}>
        {left ? (
          <Image source={left} style={{ width: 24, height: 24 }} />
        ) : (
          <View style={{ width: 24, height: 24 }}></View>
        )}
      </TouchableOpacity>
      {title && typeof title === "string" && (
        <TouchableOpacity>
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
        </TouchableOpacity>
      )}
      {title && typeof title !== "string" && (
        <TouchableOpacity>
          <Image source={title} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      )}
      {right && (
        <TouchableOpacity onPress={() => navigation.navigate(rightClick)}>
          <Image source={right} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Header;
