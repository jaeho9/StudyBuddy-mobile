import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
const header = ({
  left,
  title,
  right,
  leftClick,
  rightClick,
  isDuplicate,
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
      <TouchableOpacity
        onPress={() => {
          if (onSave) {
            onSave(); // onSave가 존재할 때 호출
          } else if (rightClick) {
            navigation.navigate(rightClick); // rightClick가 존재할 때 네비게이션 이동
          }
        }}
      >
        {right ? (
          typeof right === "string" ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: isDuplicate ? "#bdbdbd" : "#FF7474", // isDuplicate 상태에 따라 색상 변경
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
export default header;
