import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import withBadge, { WithBadgeOptions } from '../hocs/withBadge';
import { Pressable, StyleProp, TextStyle, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export interface NotificationBellProps{
    route?: RouteProp<ParamListBase, string>;
    navigation?: any;
};

const HamburgerNav: React.FC<NotificationBellProps> = ({
    navigation, route
})=>{

    const toggleDrawer = ()=>{
        navigation.toggleDrawer();
    }

    return(
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
}

export default HamburgerNav;