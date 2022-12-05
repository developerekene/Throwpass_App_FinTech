import React from 'react';
import { 
    Image, Keyboard, StyleSheet, Text, 
    View, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import DismissKeyboard from '../Components/DismissKeyboard';
import LoginForm, { LoginState } from '../Components/forms/LoginForm';
import LoginSvg from '../icons/login';
import { StartScreenProps } from './StartScreen';
import { useDispatch } from 'react-redux';
import { setAuth, setCookies, setLoginStatus } from '../redux/slices/authSlice';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import Spinner from 'react-native-loading-spinner-overlay';
import { authenticateUser } from '../swr/auth';
import * as Keychain from 'react-native-keychain';
import { ScrollView } from 'native-base';
import SInfo from "react-native-sensitive-info";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useHeaderHeight } from '@react-navigation/elements';
const LoginImage = require('../../assets/login_image.png');

const DEFAULT_IMAGE = Image.resolveAssetSource(LoginImage).uri

interface LoginScreenProps extends StartScreenProps{}

const LoginScreen: React.FC<LoginScreenProps> = ({ route, navigation })=>{

    // State
    const [loading, setIsLoading] = React.useState(false);

    // Redux
    const dispatch  = useDispatch();

    // DemoLogin function
    const demoLogin = ()=>{
        setIsLoading(true);

        setTimeout(()=>{
            setIsLoading(false);
            dispatch(setLoginStatus(true));
        }, 1500)
    }


    const handleOnSignUpPress = ()=>{
        navigation?.navigate('Get Started');
    }

    const handleOnForgotPasswordPress = ()=>{
        navigation?.navigate('Forgot Password');
    }

    const handleOnSubmit = async (state?: LoginState)=>{
        Keyboard.dismiss();
        //demoLogin();
        setIsLoading(true);
        const { data, error, response } = await authenticateUser(state);

        // If agent
        if (data && !data.status) {
            setIsLoading(false);
            Alert.alert(
                'UNAUTHORIZED',
                data.message,
                [
                    { text: 'OK' }
                ]
            )
        }

        // Set token
        if (data && data.data) {
            Keychain.setGenericPassword(data.data.mobile, data.data.token);
            
            // Store phone number
            if (state?.mobile) {
                const savingMobileData = await SInfo.setItem("mobile", state.mobile.toString(), {
                    sharedPreferencesName: "SanwoSharedPrefs",
                    keychainService: "SanwoKeychain",
                });

                if (savingMobileData) {
                    dispatch(setAuth({ mobile: data.data.mobile, token: data.data.token }));
                }
            }
            

            // let cookieArray: string[] = response.headers['set-cookie'][0].split(/;|,/);
            // console.log(cookieArray);
            // let cookie1 = cookieArray[0];
            // let cookie2 = cookieArray[6];
            // let cookies = cookie1 + "; " + cookie2;
            // console.log(cookies);
            // const savingCookiesData = await SInfo.setItem("cookies", cookies, {
            //     sharedPreferencesName: "SanwSharedPrefs",
            //     keychainService: "SanwoKeychain",
            // });

            // if (savingCookiesData) {
            //     console.log(savingCookiesData);
            //     // dispatch(setCookies(cookies));
            //     dispatch(setAuth({ mobile: data.data.mobile, token: data.data.token }));
            // }
        }

        if (error) {
            console.log(error.response?.status)
            if (error.response?.status === 400) {
                setIsLoading(false);
                Alert.alert(
                    'INVALID DETAILS',
                    'Please enter the correct mobile number and/or password',
                    [
                        { text: 'OK' }
                    ]
                )
            }
            else{
                setIsLoading(false);
                Alert.alert(
                    'UNEXPECTED ERROR OCCURED',
                    `An unexpected error occured while signing you in.`,
                    [
                        { text: 'OK' }
                    ]
                )
            }
        }

    }

    const header = ( 
        <View style={styles.header}>
            {/** Image */}
            <View style={styles.image}>
                <LoginSvg/>
            </View>

            {/** Text Body */}
            <View style={styles.textBody}>
                <Text style={styles.baseText}>
                    <Text style={styles.titleText}>
                        {'Welcome back!'}
                        {"\n"}
                        {"\n"}
                    </Text>
                    <Text numberOfLines={5} style={styles.bodyText}>
                        {'Log into your account'}
                    </Text>
                </Text>
            </View>

        </View>
    );

    if (Platform.OS === 'ios') {
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.container}
                keyboardVerticalOffset={getStatusBarHeight() + useHeaderHeight()}
            >
                <LoadingOverlay visible={loading} />
                <ScrollView>
                    <View>
                        {header}
                    </View>
                    <View>
                        <LoginForm
                            onSignUp={handleOnSignUpPress}
                            onForgotPassword={handleOnForgotPasswordPress}
                            onSubmit={handleOnSubmit}
                        />
                    </View>
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }

    return(
        <DismissKeyboard>
            <View style={styles.container}>
                <LoadingOverlay visible={loading}/>
                <ScrollView>
                    <View>
                        {header}
                    </View>
                    <View>
                        <LoginForm
                            onSignUp={handleOnSignUpPress}
                            onForgotPassword={handleOnForgotPasswordPress}
                            onSubmit={handleOnSubmit}
                        />
                    </View>
                </ScrollView>
            </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container:{
        //justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        backgroundColor: '#FCFCFC',
        paddingTop: '12%'
    },

    spinnerTextStyle: {
        color: '#FFF'
    },

    header:{
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 25,
    },

    image:{
        marginBottom: 19
    },

    textBody:{
        alignSelf: 'flex-start',
    },

    baseText:{
        //fontFamily: 'Poppins',
    },

    titleText:{
        fontWeight: '600',
        fontSize: 24,
        letterSpacing: 0.75,
        color: 'black',
    },

    bodyText:{
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.75,
        lineHeight: 28,
        color: '#6E7191'
    },
})

export default LoginScreen;