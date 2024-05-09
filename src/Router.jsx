import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomBottomTab from "./components/Tab/CustomBottomTab";
import Archives_Firebase from "pages/Archives/Archives_Firebase";
import Post_Firebase from "pages/Archives/Post_Firebase";
import CommentEdit from "pages/Archives/CommentEdit";
import PostEdit from "pages/Archives/PostEdit";
import comments from "pages/Archives/comments";
import commentss from "pages/Archives/commentss";

import EditProfile from "pages/MyPage/EditProfile";
import Settings from "pages/MyPage/Settings";
import Library from "pages/MyPage/Library";
import Camera from "pages/MyPage/Camera";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = (props) => <CustomBottomTab {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={comments} />
      <Tab.Screen name="Community" component={commentss} />
      <Tab.Screen name="Archives" component={Archives_Firebase} />
      <Tab.Screen name="MyPage" component={comments} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Post_Firebase" component={Post_Firebase} />
      <Stack.Screen name="PostEdit" component={PostEdit} />
      <Stack.Screen name="CommentEdit" component={CommentEdit} />
    </Stack.Navigator>
  );
};

export default Router;
