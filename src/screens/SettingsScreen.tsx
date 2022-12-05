import { ParamListBase } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';
import SettingsBox from '../components/LoanElements/SettingsBox';
import AccountSvg from '../icons/account';
import FileSvg from '../icons/file';

export interface SettingsScreenProps extends NativeStackHeaderProps{
}
const SettingsScreen: React.FC<NativeStackScreenProps<ParamListBase>>= ({ navigation })=>{

    // Handlers
    const gotoChangePassword = ()=>{
        navigation.navigate('ChangePassword');
    }
    const gotoEditProfile = ()=>{
        navigation.navigate('EditProfile');
    }

    const renderTouchableStep = (label: string, onPress: () => void) =>{
        return(
            <View style={styles.step}>
               <SettingsBox label={label} onPress={onPress}/>
           </View>
            
        )
    }
    

    const account = (
        <View style={styles.account}>
            <View style={styles.accountHeading}>
                <AccountSvg/>
                <Text style={styles.header}>Account</Text>
            </View>
            <View>
                { renderTouchableStep('Edit Profile', gotoEditProfile) }
                { renderTouchableStep('Change Password', gotoChangePassword) }
            </View>
        </View>
    )

    const more = (
        <View>
            <View style={styles.accountHeading}>
                <FileSvg/>
                <Text style={styles.header}>More</Text>
            </View>
            <View>
                { renderTouchableStep('Privacy Policy', ()=>{}) }
                <SettingsBox label="Night-Mode" variant="switch"/>
            </View>
        </View>
    )

    return(
        <View style={styles.container}>
            { account }
            { more }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: '5%',
        backgroundColor: '#FCFCFC'
    },

    header:{
        fontWeight: '600',
        fontSize: 18,
        letterSpacing: 0.75,
        lineHeight: 32,
        color: '#14142B',
        marginLeft: 12
    },

    account:{
        marginBottom: 20,
    },

    accountHeading:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    step:{
        marginBottom: 2
    },
})


export default SettingsScreen;