import React from 'react';
import { StyleSheet, View } from 'react-native';
import NotificationBell, { NotificationBellProps } from './elements/NotificationBell';
import QRNav from './elements/QRNav';

const HeaderRight: React.FC<NotificationBellProps> = (props)=>{

    return(
        <View style={styles.container}>
            <View style={styles.qrArea}>
            <QRNav {...props} />
            </View>
            <NotificationBell {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    qrArea:{
        marginRight: 5
    }
});

export default HeaderRight;