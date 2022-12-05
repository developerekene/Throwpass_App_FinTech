import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { formatAmount, formatDate, getInitials } from '../utils/GeneralUtils';
import { ConfirmScreenProps } from './ConfirmScreen';
import { Avatar, Caption, List, Title } from 'react-native-paper'
import TabProfileSvg from '../icons/tab-profile';
import PadlockSvg from '../icons/padlock';
import SettingsSvg from '../icons/settings';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/store';
import AlertInfoSvg from '../icons/alert-info';


const ProfileScreen: React.FC<NativeStackScreenProps<ParamListBase>> = ({ navigation, route })=>{

    const { user } = useSelector((state: RootState)=> state.auth);
    let name = user ? user?.first_name + " " + user?.last_name : '';
    let initials = getInitials(name);

    // Handlers
    const gotoSettings = ()=>{
        navigation?.navigate('Settings');
    }
    const gotoChangePin = () =>{
        navigation.navigate('ConfirmPinScreen');
    }
    const gotoEditProfile = ()=>{
        navigation.navigate('EditProfile');
    }
    const gotoKycRegistration = ()=>{
        navigation.navigate('KycScreen');
    }

    const listSection = (
        <View style={styles.listDetails}>
            <List.Section>
                <List.Item 
                    title="Edit Profile" 
                    left={({ color, style })=>(
                        <View style={[style, styles.listIcon]}>
                            <TabProfileSvg pathProps={{ fill: color }}/>
                        </View>
                    )}
                    onPress={gotoEditProfile}
                    
                />
                <List.Item
                    title="Change Pin"
                    left={({ color, style })=>(
                        <View style={[style, styles.listIcon]}>
                            <PadlockSvg rectProps={{ stroke: color }}/>
                        </View>
                    )}
                    onPress={gotoChangePin}
                />
                <List.Item
                    title="Kyc Registration"
                    left={({ color, style })=>(
                        <View style={[style, styles.listIcon]}>
                            <AlertInfoSvg 
                                CircleProps={{ stroke: color }} 
                                pathProps={{ stroke: color }}
                            />
                        </View>
                    )}
                    onPress={gotoKycRegistration}
                />
                <List.Item
                    title="Settings"
                    left={({ color, style })=>(
                        <View style={[style, styles.listIcon]}>
                            <SettingsSvg 
                                CircleProps={{ stroke: color }} 
                                pathProps={{ stroke: color }}
                            />
                        </View>
                    )}
                    onPress={gotoSettings}
                />
            </List.Section>
        </View>
    );

    const avatarSection = (
        <View style={styles.avatarArea}>
            <Avatar.Image
                source={{
                    uri: user?.profile_photo
                }}
                size={80}
                style={styles.avatar}
            />
            <View style={styles.avatarCaption}>
                <Title 
                    numberOfLines={1} 
                    ellipsizeMode="tail" 
                    style={styles.title}>
                    {name}
                </Title>
                <Caption style={styles.caption} >{`${user?.user_type.toUpperCase() || ''}`}</Caption>
            </View>
        </View>
    )

    
    return(
        <View style={styles.container}>
            <View>
                { avatarSection }
                { listSection }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: '12%',
        backgroundColor: '#F5F5F5',
    },

    listIcon:{
        paddingTop: 3,
    },

    item:{
        fontSize: 16
    },

    avatar:{
        backgroundColor: '#0122AE'
    },

    avatarCaption:{
        marginTop: '5%'
    },

    title:{
        fontSize: 18,
        fontWeight: '600',
        marginTop: 3,
        letterSpacing: 0.75,
        lineHeight: 28,
        width: '100%',
        color: '#333333',
    },

    caption:{
        letterSpacing: 0.75,
        color: '#333333',
        textAlign: 'center',
        fontSize: 14,
    },

    avatarArea:{
        alignItems: 'center'
    },

    amountLabel:{
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
        color: '#14142B',
        fontSize: 14,
    },

    listDetails:{
        marginTop: '15%'
    },
})


export default ProfileScreen;