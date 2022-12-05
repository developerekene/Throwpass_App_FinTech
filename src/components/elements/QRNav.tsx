import React from 'react';
import { Pressable, StyleProp, TextStyle, View } from 'react-native';
import QRSvg from '../../icons/qr';
import { NotificationBellProps } from './NotificationBell';

const QRNav: React.FC<NotificationBellProps> = ({
    navigation, route
})=>{

    const gotoScanToPay = ()=>{
        navigation?.navigate('ScanToPay');
    }

    return(
        <Pressable onPress={gotoScanToPay}>
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[style]}>
                        <QRSvg/>
                    </View>
            )}}
        </Pressable>
    )
}

export default QRNav;