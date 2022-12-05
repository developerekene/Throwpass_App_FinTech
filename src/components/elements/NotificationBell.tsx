import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';
import { DrawerHeaderProps} from '@react-navigation/drawer';
import React from 'react';
import withBadge, { WithBadgeOptions } from '../hocs/withBadge';
import { Pressable, StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface NotificationBellProps{
    route?: RouteProp<ParamListBase, string>;
    navigation?: any;
};

const NotificationBell: React.FC<NotificationBellProps> = ({
    navigation, route
})=>{


    return(
        <Pressable>
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;
                let majorStyle = {
                    marginRight: 0
                }

                let BellIcon = withBadge(0, { containerStyle: [majorStyle] })(
                    <Icon name="bell-outline" size={26} style={style}/>
                )

                return <BellIcon/>
            }}
        </Pressable>
    )
}

export default NotificationBell;