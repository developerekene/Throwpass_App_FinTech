import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../BottomHomeScreens/Home';
import PayWithCreditCardScreen from '../PayWithCreditCardScreen';
import ScanQrCode from '../ScanQrCode';
import BookFlight from '../BookFlight';
import TransportPays from '../TransportPays';
import SendMoney from '../SendMoney';
const Stack = createStackNavigator()

const HomeStack = () => {
    return (
       
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown:false
              }}
              
             
            />
            <Stack.Screen
              name="paycredit"
              component={PayWithCreditCardScreen}
              options={{
                headerShown:false
              }}
              
             
            />
             <Stack.Screen
              name="ScanQrCode"
              component={ScanQrCode}
              options={{
                headerShown:false
              }}
              
              
             
            />
             <Stack.Screen
              name="BookFlight"
              component={BookFlight}
              options={{
                headerShown:true,
                headerTitle:''
              }}
              
              
             
            />
            <Stack.Screen
              name="TransportPays"
              component={TransportPays}
              options={{
                headerShown:true,
                headerTitle:'Transports Pays',
                headerTitleAlign:'center'
              }}
              
              
             
            />
            <Stack.Screen
              name="SendMoney"
              component={SendMoney}
              options={{
                headerShown:true,
                headerTitle:'Send Money',
                headerTitleAlign:'center'
              }}
              
              
             
            />
            
          </Stack.Navigator>
       
      );
}

export default HomeStack
