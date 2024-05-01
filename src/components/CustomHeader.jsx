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
  id,
  item,
  comment,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("id!!", id);
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
      <TouchableOpacity
        onPress={() =>
          leftClick ? navigation.navigate(leftClick) : navigation.goBack()
        }
      >
        {left ? (
          typeof left === "string" ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#bdbdbd",
              }}
            >
              {left}
            </Text>
          ) : (
            <Image source={left} style={{ width: 24, height: 24 }} />
          )
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
        onPress={
          () =>
            rightClick && item
              ? navigation.navigate(rightClick, {
                  commentId: id,
                  item: item,
                  commentEdit: comment,
                })
              : navigation.goBack()

          // rightClick && navigation.navigate(rightClick)
        }
      >
        {right ? (
          typeof right === "string" ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#bdbdbd",
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
