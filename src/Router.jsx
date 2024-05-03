import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomBottomTab from "./components/CustomBottomTab";
import Home from "./pages/Home/Home";
import Community from "./pages/Community";
import Archives from "./pages/Archives";
import Mypage from "./pages/Mypage";
import Alarm from "./pages/Home/Alarm";
import Splash from "./pages/Onboarding/Splash";
import Onboarding1 from "./pages/Onboarding/Onboarding1";
import Onboarding2 from "./pages/Onboarding/Onboarding2";
import Onboarding3 from "./pages/Onboarding/Onboarding3";
import Onboarding4 from "./pages/Onboarding/Onboarding4";
import Start from "./pages/SignupLogin/Start";
import Signup1 from "./pages/SignupLogin/Signup1";
import Signup2 from "./pages/SignupLogin/Signup2";
import Signup3 from "./pages/SignupLogin/Signup3";
import Login from "./pages/SignupLogin/Login";
import Account from "./pages/SignupLogin/Account";
import Password from "./pages/SignupLogin/Password";

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
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
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
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
};

export default Router;
