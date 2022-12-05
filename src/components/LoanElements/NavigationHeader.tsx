import { RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text, Pressable, StyleProp, TextStyle } from 'react-native';
import BellSvg from '../../icons/bell';
import HamburgerSvg from '../../icons/hamburger';
import withBadge from './../hocs/withBadge';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import NotificationBell from './../elements/NotificationBell';
import { ParamListBase } from '@react-navigation/native';

export interface NavigationHeaderProps{
    navigation?: any;
    route?:RouteProp<ParamListBase, string>;
}


const NavigatorHeader: React.FC<NavigationHeaderProps> = ({ navigation, route }) =>{

    const toggleDrawer = ()=>{
        navigation.toggleDrawer();
    }

    const hamburgerMenu = (
        <Pressable onPress={toggleDrawer}>
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[style]}>
                        <EntypoIcon
                            name="menu"
                            size={25}
                        />
                    </View>
            )}}
        </Pressable>
    )

    const headerText = (
        <View style={styles.textDiv}>
            <Text style={styles.headerText}>
                Welcome John!
            </Text>
        </View>
    )

    const BadgedBell = withBadge(1)(<BellSvg/>);

    return(
        <View style={styles.container}>
            { hamburgerMenu }
            { headerText }
           <NotificationBell navigation={navigation} route={route}/>
        </View>
    )
}

export default NavigatorHeader

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 12
    },

    textDiv:{
        flex: 1,
        backgroundColor: 'red'
    },

    headerText:{
        fontWeight: '600',
        fontSize: 20,
        letterSpacing: 0.75,
        textAlign: 'center'
    }
})