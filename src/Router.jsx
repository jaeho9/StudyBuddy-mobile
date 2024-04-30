import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomBottomTab from "./components/CustomBottomTab";
import Home from "pages/Home/Home";
import Community from "./pages/Community";
import Archives from "./pages/Archives";
import MyPage from "pages/MyPage/MyPage";
import Alarm from "pages/Home/Alarm";

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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Archives" component={Archives} />
      <Tab.Screen name="MyPage" component={MyPage} />
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
      {/* <Stack.Screen name="Home" component={Home} /> */}
      {/* <Stack.Screen name="MyPage" component={MyPage} /> */}
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Alarm" component={Alarm} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
};

export default Router;
