import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    createDrawerNavigator,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
    Avatar, Title, Caption,
    Paragraph, Drawer, Text,
    TouchableRipple, Switch
} from 'react-native-paper'
import { Alert, StyleSheet, Vibration, View } from 'react-native';
import LogoutSvg from '../../icons/logout';
import HomeSvg from '../../icons/home';
import TransactionSvg from '../../icons/transaction';
import WalletSvg from '../../icons/wallet';
import TabProfileSvg from '../../icons/tab-profile';
import SettingsSvg from '../../icons/settings';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';
import { clearAuth, setLoginStatus } from '../../redux/slices/authSlice';
import * as Keychain from 'react-native-keychain';
import LoadingOverlay from '../LoanElements/LoadingOverlay';
import { useNavigation } from '@react-navigation/native';
import LoadingContext from '../context/LoadingContext';

interface CustomDrawerContentProps extends DrawerContentComponentProps{}

function CustomDrawerContent(props: CustomDrawerContentProps){


    // Redux & hooks
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    // Context
    const { setLoading } = React.useContext(LoadingContext);

    // Redux
    const { user } = useSelector((state: RootState)=> state.auth);

    // Demo Logout
    const demoLogout = ()=>{
        dispatch(setLoginStatus(false));
    }
    const logout = ()=>{
        setLoading(true);
        Keychain.resetGenericPassword().then((isReset: boolean)=>{
            if (isReset) {
                dispatch(clearAuth());
            }
            else{
                setLoading(false);
                Vibration.vibrate();
                Alert.alert(
                    'Error',
                    'An error occurred while signing you in',
                    [
                        { text: 'OK' }
                    ]
                )
            }
        })
    }

    // Handlers
    const gotoHome = ()=>{
        navigation.navigate('Home');
    }
    const gotoHistory = ()=>{
        navigation.navigate('History');
    }
    const gotoWallet = ()=>{
        navigation.navigate('Wallet');
    }
    const gotoAccount = ()=>{
        navigation.navigate('Profile');
    }
    const gotoSettings = ()=>{
        navigation.navigate('Home', { screen: 'Settings' });
    }

    return(
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>

                {/** User Info Section */}
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={styles.avatarSection}>
                            <Avatar.Image
                                source={{
                                    uri: user?.profile_photo
                                }}
                                size={50}
                            />
                            <View style={styles.avatarDescription}>
                                <Title style={styles.title}>{`${user?.first_name} ${user?.last_name}`}</Title>
                            </View>
                        </View>
                    </View>
                </View>

                {/** Main Drawer Items */}
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Dashboard"
                        onPress={gotoHome} 
                        icon={({ color, size })=>(
                            <HomeSvg GProps={{ fill: color }}/>
                        )}
                        inactiveTintColor={'white'}
                    />
                    <DrawerItem
                        label="History"
                        onPress={gotoHistory} 
                        icon={({ color, size })=>(
                            <TransactionSvg pathProps={{ fill: color }}/>
                        )}
                        inactiveTintColor={'white'}
                    />
                    <DrawerItem
                        label="Wallet"
                        onPress={gotoWallet} 
                        icon={({ color, size })=>(
                            <WalletSvg GProps={{ fill: color }}/>
                        )}
                        inactiveTintColor={'white'}
                    />
                    <DrawerItem
                        label="Account"
                        onPress={gotoAccount} 
                        icon={({ color, size })=>(
                            <TabProfileSvg pathProps={{ fill: color }}/>
                        )}
                        inactiveTintColor={'white'}
                    />
                    <DrawerItem
                        label="Settings"
                        onPress={gotoSettings} 
                        icon={({ color, size })=>(
                            <SettingsSvg CircleProps={{ stroke: color }} pathProps={{ stroke: color }}/>
                        )}
                        inactiveTintColor={'white'}
                    />
                </Drawer.Section>

            </DrawerContentScrollView>

            {/** Logout button section */}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    label="Logout"
                    onPress={logout} 
                    icon={({ color, size })=>(
                        <LogoutSvg/>
                    )}
                    inactiveTintColor={'white'}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex: 1, 
        backgroundColor: '#0122AE',
    },

    drawerContent:{
        flex: 1
    },

    userInfoSection:{
        paddingLeft: 20,
    },

    avatarSection:{
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center'
    },

    avatarDescription:{
        marginLeft: 15,
    },

    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 3,
        color: 'white'
    },

    drawerSection:{
        marginTop: 15
    },

    section:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },

    bottomDrawerSection:{
        borderTopColor: "#f4f4f4",
        borderTopWidth: StyleSheet.hairlineWidth,
        marginBottom: 15
    },
})

export default CustomDrawerContent;
