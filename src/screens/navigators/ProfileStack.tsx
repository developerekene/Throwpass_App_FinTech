import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import NotificationBell from "../../components/elements/NotificationBell";
import HamburgerNav from "../../components/elements/HamburgerNav";
import ProfileScreen from "../../screens/ProfileScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import ChangePinScreen from "../../screens/ChangePinScreen";
import ConfirmChangePinScreen from "../../screens/ConfirmChangePinScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import KycScreen from "../../screens/KycScreen";
import ChangePasswordScreen from "../../screens/ChangePasswordScreen";


const ProfileStack = createNativeStackNavigator();

const ProfileScreens = () =>(
    <ProfileStack.Navigator>
       <ProfileStack.Screen name="ProfileHome" component={ProfileScreen}
          options={({ navigation, route })=>({
            headerTitleAlign: "center",
            title: "Profile",
            headerRight: (props)=>{ return <NotificationBell navigation={navigation} route={route}/>},
            headerLeft: (props)=>{ return <HamburgerNav navigation={navigation} route={route} />}
          })}
        />
        <ProfileStack.Screen name="Settings" component={SettingsScreen}
          options={({ navigation, route })=>({
            headerTitleAlign: "center",
            title: "Settings",
            headerRight: (props)=>{ return <NotificationBell navigation={navigation} route={route}/>},
          })}
        />
        <ProfileStack.Screen name="ChangePinScreen" component={ChangePinScreen}
        options={({ navigation, route })=>({
          title: 'Change PIN',
          headerTitleAlign: "center",
          headerRight: (props)=>{ return <NotificationBell navigation={navigation} route={route}/>},
        })}
        />
        <ProfileStack.Screen name="ConfirmPinScreen" component={ConfirmChangePinScreen}
        options={({ navigation, route })=>({
          title: 'Change PIN',
          headerTitleAlign: "center",
          headerRight: (props)=>{ return <NotificationBell navigation={navigation} route={route}/>},
        })}
        />
        <ProfileStack.Screen name="EditProfile" component={EditProfileScreen}
        options={({ navigation, route })=>({
          title: 'Edit Profile',
          headerTitleAlign: "center",
          headerRight: (props)=>{ return <NotificationBell navigation={navigation} route={route}/>},
        })}
        />
        <ProfileStack.Screen name="KycScreen" component={KycScreen}
        options={({ navigation, route })=>({
          title: 'KYC Registration',
          headerTitleAlign: "center",
          headerRight: (props)=>{ return <NotificationBell navigation={navigation} route={route}/>},
        })}
        />
        <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen}
        options={({ navigation, route })=>({
          title: 'Change Password',
          headerTitleAlign: "center",
          headerRight: (props)=>{ return <NotificationBell navigation={navigation} route={route}/>},
        })}
        />
    </ProfileStack.Navigator>
)

export default ProfileScreens;

