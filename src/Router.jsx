import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomBottomTab from "components/CustomBottomTab";

import Home from "pages/Home/Home";
import Alarm from "pages/Home/Alarm";
import Community from "pages/Community/Community";
import Archives from "pages/Archives/Archives";
import Archives_Firebase from "pages/Archives/Archives_Firebase";
import MyPage from "pages/MyPage/MyPage";
import Post from "pages/Archives/Post";
import Post_Firebase from "pages/Archives/Post_Firebase";
import AddPost from "pages/Archives/AddPost";
import CommentEdit from "pages/Archives/CommentEdit";
import PostEdit from "pages/Archives/PostEdit";
import comments from "pages/Archives/comments";
import commentss from "pages/Archives/commentss";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = (props) => <CustomBottomTab {...props} />;

const ArchivesTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Archives" component={Archives} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

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
      {/* <Tab.Screen name="ArchivesTab" component={ArchivesTab} /> */}
      <Tab.Screen name="Archives" component={Archives_Firebase} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Post_Firebase" component={Post_Firebase} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="CommentEdit" component={CommentEdit} />
      <Stack.Screen name="PostEdit" component={PostEdit} />
    </Stack.Navigator>
  );
};

export default Router;
