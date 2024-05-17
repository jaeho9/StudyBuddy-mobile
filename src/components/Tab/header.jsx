import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const Header = ({
  left,
  title,
  right,
  leftClick,
  rightClick,
  isDuplicate,
  isReadyToBook,
  deleteMode,
  onSave,
}) => {
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
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity onPress={leftClick}>
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

      <TouchableOpacity
        // onPress={() => {
        //   if (onSave) {
        //     onSave();
        //     navigation.goBack();
        //   } else if (rightClick) {
        //     return rightClick;
        //   }
        // }}
        onPress={
          onSave
            ? () => {
                onSave();
                navigation.goBack();
              }
            : rightClick
        }
      >
        {right ? (
          typeof right === "string" ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color:
                  !isDuplicate || isReadyToBook || deleteMode
                    ? "#FF7474"
                    : "#bdbdbd", // isDuplicate 상태에 따라 색상 변경
              }}
            >
              {right}
            </Text>
          ) : (
            <Image source={right} style={{ width: 24, height: 24 }} />
          )
        ) : (
          <View style={{ width: 24, height: 24 }}></View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Header;
