import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Tab
import CustomBottomTab from "components/Tab/CustomBottomTab";

// Splash, Onboarding
import Splash from "pages/Splash";
import Onboarding from "pages/Onboarding";

// Login
import Start from "pages/Login/Start";
import Signup1 from "pages/Login/Signup1";
import Signup2 from "pages/Login/Signup2";
import Signup3 from "pages/Login/Signup3";
import Login from "pages/Login/Login";
import Account from "pages/Login/Account";
import Password from "pages/Login/Password";

// Home
import Home from "pages/Home/Home";
import Alarm from "pages/Home/Alarm";
import Search from "pages/Home/Search";
import SearchResult from "pages/Home/SearchResult";

// Community
import Community from "pages/Community/Community";
import CommunityPost from "pages/Community/CommunityPost";
import CommunityAdd from "pages/Community/CommunityAdd";
import CommunitySearch from "pages/Community/CommunitySearch";

// Add
import Add from "pages/Add/Add";
import Book from "pages/Add/Book";

// Archives
import Archives from "pages/Archives/Archives";
import CommentEdit from "pages/Archives/CommentEdit";
import Post from "pages/Archives/Post";
import PostEdit from "pages/Archives/PostEdit";
import PostEditBook from "pages/Archives/PostEditBook";

// MyPage
import Mypage from "pages/MyPage/Mypage";
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
      <Tab.Screen name="MyPage" component={Mypage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* Login */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Signup1" component={Signup1} />
      <Stack.Screen name="Signup2" component={Signup2} />
      <Stack.Screen name="Signup3" component={Signup3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Password" component={Password} />

      {/* MainTab */}
      <Stack.Screen name="MainTab" component={MainTab} />
      {/* Home */}
      <Stack.Screen name="Alarm" component={Alarm} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      {/* Add */}
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Book" component={Book} />
      {/* Community */}
      <Stack.Screen name="CommunityPost" component={CommunityPost} />
      <Stack.Screen name="CommunityAdd" component={CommunityAdd} />
      <Stack.Screen name="CommunitySearch" component={CommunitySearch} />
      {/* Archives */}
      <Stack.Screen name="CommentEdit" component={CommentEdit} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="PostEdit" component={PostEdit} />
      <Stack.Screen name="PostEditBook" component={PostEditBook} />
      {/* MyPage */}
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
};

export default Router;
