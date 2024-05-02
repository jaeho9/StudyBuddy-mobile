import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const MiddleTab = ({ text, selected, onPress }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={onPress}
      >
        <Text style={styles.MiddleTabText}>{text}</Text>
      </TouchableOpacity>
      {selected ? (
        <Image
          source={require("assets/mypage/Line.png")}
          style={styles.Image}
        />
      ) : (
        <Image
          source={require("assets/mypage/emptyLine.png")}
          style={styles.Image}
        />
      )}
    </View>
  );
};

const styles = {
  MiddleTabText: {
    color: "#333",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  Image: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default MiddleTab;
