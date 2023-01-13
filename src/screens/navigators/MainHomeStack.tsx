import react from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeBottomNavigation from "./HomeBottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./LoginStack";

const HomeStack = createStackNavigator();

const HomeMainStack: React.FC<any> = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="LoginScreens">
        
        <HomeStack.Screen
          name="LoginScreens"
          component={LoginStack}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="BottomScreens"
          component={HomeBottomNavigation}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeMainStack;
