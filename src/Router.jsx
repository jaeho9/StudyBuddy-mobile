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

import Splash from "pages/Splash";
import Onboarding1 from "pages/Onboarding/Onboarding1";
import Onboarding2 from "pages/Onboarding/Onboarding2";
import Onboarding3 from "pages/Onboarding/Onboarding3";
import Onboarding4 from "pages/Onboarding/Onboarding4";
import Start from "pages/Start";
import Signup1 from "pages/Login/Signup1";
import Signup2 from "pages/Login/Signup2";
import Signup3 from "pages/Login/Signup3";
import Login from "pages/Login/Login";
import Account from "pages/Login/Account";
import Password from "pages/Login/Password";
import EditProfile from "pages/MyPage/EditProfile";
import Settings from "pages/MyPage/Settings";
import Library from "pages/MyPage/Library";
import Camera from "pages/MyPage/Camera";
import Onboarding from "pages/Onboarding";


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
      <Tab.Screen name="MyPage" component={Mypage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Onboarding4" component={Onboarding4} />
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Signup1" component={Signup1} />
      <Stack.Screen name="Signup2" component={Signup2} />
      <Stack.Screen name="Signup3" component={Signup3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Alarm" component={Alarm} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
};

export default Router;
