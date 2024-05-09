import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/Router";
import React from "react";
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;
