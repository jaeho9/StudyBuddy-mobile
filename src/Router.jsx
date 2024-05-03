import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomBottomTab from "components/Tab/CustomBottomTab";
import Home from "pages/Home/Home";
import Community from "pages/Community/Community";
import Archives from "pages/Archives/Archives";
import Mypage from "pages/MyPage/Mypage";
import Alarm from "pages/Home/Alarm";
import Add from "pages/Home/Add";
import Book from "pages/Home/Book";
import Search from "pages/Home/Search";
import SearchResult from "pages/Home/SearchResult";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = (props) => <CustomBottomTab {...props} />


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
      <Tab.Screen name="Mypage" component={Mypage} />
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
      <Stack.Screen name="Alarm" component={Alarm} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
    </Stack.Navigator>
  );
};

export default Router;
