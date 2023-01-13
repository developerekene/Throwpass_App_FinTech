import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../BottomHomeScreens/Home";
import PayWithCreditCardScreen from "../PayWithCreditCardScreen";
import ScanQrCode from "../ScanQrCode";
import BookFlight from "../BookFlight";
import TransportPays from "../TransportPays";
import SendMoney from "../SendMoney";
import GetTransportCard from "../GetTransportCard";
import CardTypeScreen from "../CardTypeScreen";
import CardDesignScreen from "../CardDesignScreen";
import CardCreated from "../CardCreated";
import SendMoneyMain from "../SendMoneyMain";
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="paycredit"
        component={PayWithCreditCardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ScanQrCode"
        component={ScanQrCode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookFlight"
        component={BookFlight}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="TransportPays"
        component={TransportPays}
        options={{
          headerShown: true,
          headerTitle: "Transports Pays",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="SendMoney"
        component={SendMoneyMain}
        options={{
          headerShown: true,
          headerTitle: "Send Money",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="getTransportCard"
        component={GetTransportCard}
        options={{
          headerShown: false,
          // headerTitle:'Send Money',
          // headerTitleAlign:'center'
        }}
      />
      <Stack.Screen
        name="CardTypeScreen"
        component={CardTypeScreen}
        options={{
          headerShown: false,
          // headerTitle:'Send Money',
          // headerTitleAlign:'center'
        }}
      />

      <Stack.Screen
        name="CardDesignScreen"
        component={CardDesignScreen}
        options={{
          headerShown: false,
          // headerTitle:'Send Money',
          // headerTitleAlign:'center'
        }}
      />
      <Stack.Screen
        name="CardCreated"
        component={CardCreated}
        options={{
          headerShown: false,
          // headerTitle:'Send Money',
          // headerTitleAlign:'center'
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
