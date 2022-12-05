import React from 'react'
import 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
 

 
import
MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  NavigationContainer, ParamListBase, RouteProp
} from '@react-navigation/native';
import {
  createStackNavigator, Header
} from '@react-navigation/stack';

import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import Bills from '../BottomHomeScreens/Bills';
import History from '../BottomHomeScreens/History';
import Home from '../BottomHomeScreens/Home';
import Profile from '../BottomHomeScreens/Profile';
import HomeStack from './HomeStack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import AccountIcon from '../../icons/AccountIcon';
import TransactionSvg from '../../icons/Transaction';
import HomeSvg from '../../icons/Home';
import { Platform, View } from 'react-native';
import WalletSvg from '../../icons/Wallet';
import DollarMoneyShoppinCard from '../../icons/DollarMoneyShoppingCard'
import TabProfileSvg from '../../icons/tabProfile';
import ProfileScreen from '../navigators/ProfileStack';

export interface BottomTabNavigatorProps{
  route?: RouteProp<ParamListBase, string>;
  navigation?: any;
};

const HomeBottomNavigation : React.FC<BottomTabNavigatorProps> = ({
  navigation, route
})=> {
  
  //   <NavigationContainer>
  //     <Tab.Navigator
  //       initialRouteName="Home"
  //       screenOptions={({route})=>({
  //           tabBarActiveTintColor: '#0122AE',
  //           tabBarInactiveTintColor: '#828282',
  //       })}>
  //       <Tab.Screen
  //         name="Homestack"
  //         component={HomeStack}
        
  //         options={{
  //           headerShown:false,
  //           tabBarLabel: 'Home',
  //           tabBarIcon: ({ color, size }) => (
  //             // <MaterialCommunityIcons
  //             //   name="home"
  //             //   color={color}
  //             //   size={size}
  //             // />
  //             <HomeSvg/>
  //           ),
  //         }}  />
  //       <Tab.Screen
  //         name="History"
  //         component={History}
  //         options={{
  //           // tabBarLabel: 'History',
  //           tabBarIcon: ({ color, size }) => (
  //             // <MaterialCommunityIcons
  //             //   name="history"
  //             //   color={color}
  //             //   size={size}
  //             // />
  //             <TransactionSvg/>
  //           ),
  //           headerTitle:"History",
  //           headerRight: ()=> (
  //             <View style={{marginLeft: 10}}>
  //               <FontAwesome name='bell-o' color={'#DADADA'} size={22}/>

  //             </View>
  //           ),
  //           headerLeft: ()=> (
  //             <View style={{marginRight: 10}}>
  //               <Ionicons name='arrow-back' color={'#6E7191'} size={22}/>

  //             </View>
  //           ),
  //           headerTitleAlign:'center',
  //           headerShown:true,
  //           headerTintColor: '#000000', 
  //           headerStyle:{
  //            elevation:25
             
              
              
  //           }
            
            
  //         }} />
  //          <Tab.Screen
  //         name="Bills"
  //         component={Bills}
  //         options={{
  //           tabBarLabel: 'Bills',
  //           tabBarIcon: ({ color, size }) => (
  //             <MaterialCommunityIcons
  //               name="wallet-outline"
  //               color={color}
  //               size={size}
  //             />
  //           ),
            
  //         }} />
  //         <Tab.Screen
  //         name="Profile"
  //         component={Profile}
  //         options={{
  //           tabBarLabel: 'Profile',
  //           tabBarIcon: ({ color, size }) => (
  //           //   <MaterialCommunityIcons
  //           //   name="wallet-outline"
  //           //   color={color}
  //           //   size={size}
  //           // />
  //           <AccountIcon pathProps={{ fill:color}}/>
  //           )
  //           ,
  //           headerLeft: ()=> (
  //             <View style={{marginRight: 10}}>
  //               <Ionicons name='arrow-back' color={'#6E7191'} size={22}/>

  //             </View>
  //           ),
  //           headerTitleAlign:'center',
  //           headerShown:true,
  //           headerTintColor: '#000000', 
  //           headerStyle:{
  //            elevation:25
             
              
              
  //           }
            
              
            
  //         }} />
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // )

  return(
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route })=>({
      tabBarActiveTintColor: "#0122AE",
      tabBarLabelStyle:{
        fontSize: 12,
        letterSpacing: 0.75,
        fontWeight: '500',
        paddingBottom: Platform.OS === 'android' ? 4 : 0
      },
      headerShown: false,
      tabBarHideOnKeyboard: true,


      tabBarIcon: ({ focused, color, size })=>{

        let HomeIcon = focused ? <HomeSvg GProps={{ fill: '#0122AE' }}/> : <HomeSvg/>
        let HistoryIcon = focused ? <TransactionSvg pathProps={{ fill: '#0122AE' }}/> : <TransactionSvg/>
        let WalletIcon = focused ? <DollarMoneyShoppinCard PathProps={{ fill: '#0122AE' }}/> : <DollarMoneyShoppinCard/>
        let ProfileIcon = focused ? <TabProfileSvg pathProps={{ fill: '#0122AE' }}/> : <TabProfileSvg/>


        if (route.name === "Home") {
          return HomeIcon;
        }
        if (route.name === 'History') {
          return HistoryIcon;
        }
        if (route.name === 'Bills') {
          return WalletIcon;
        }
        if (route.name === 'Profile') {
          return ProfileIcon;
        }
      },
    })}
  >
      <Tab.Screen name="Home" component={HomeStack}
    
      />
      <Tab.Screen name="History" component={History}/> 
      <Tab.Screen name="Bills" component={Bills}/> 
      <Tab.Screen name="Profile" component={ProfileScreen}/> 
  </Tab.Navigator>
  </NavigationContainer>
)
}

export default HomeBottomNavigation