import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, Vibration, View } from 'react-native';
import DismissKeyboard from '../Components/DismissKeyboard';
import RegistrationForm, { RegistrationFormState } from '../Components/forms/RegistrationForm';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import ToastContext from '../components/context/ToastContext';
import { RootState } from '../redux/slices/store';
import { registerUser } from '../swr/profile';
import { useHeaderHeight } from '@react-navigation/elements';

interface RegistrationcreenProps extends NativeStackHeaderProps{}

const RegistrationScreen: React.FC<RegistrationcreenProps> = ({ 
    route, navigation, options, back 
})=>{
    // Context
    const showToast = React.useContext(ToastContext);

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Redux
    const { auth, cookies } = useSelector((state: RootState)=> state.auth);

    // Error alert
    const alertError = (message: string = 'An unknown error occurred')=>{
        Vibration.vibrate();
        Alert.alert(
            'Error',
            message,
            [
                { text: 'OK' }
            ]
        );
    }
    
    const handleOnSubmit = async (state?: RegistrationFormState)=>{
        Keyboard.dismiss();
        setLoading(true);

        const { data, error } = await registerUser(state, auth?.token);

        if (data) {
            if (data.status === false) {
                setLoading(false);
                Vibration.vibrate();
                Alert.alert(
                    'Error',
                    data.message,
                    [
                        { text: 'OK' }
                    ]
                );
            }
            else{
                setLoading(false);
                showToast && showToast('success', data.message);
                navigation.navigate('Login');
            }
        }

        if (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                alertError(error.response.data.message);
            }
            else{
                alertError();
            }
        }
    };
    
    const handleLoginPress = ()=>{
        navigation.navigate('Login');
    }
    const header = (
        <View style={styles.textBody}>
            <Text style={styles.baseText}>
                <Text style={styles.titleText}>
                    {`Let's Get Started `}
                    {"\n"}
                    {"\n"}
                </Text>
                <Text numberOfLines={5} style={styles.bodyText}>
                    {'Create an account with SanwoPay'}
                </Text>
            </Text>
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
                    <View style={styles.header}>
                        {header}
                    </View>
                    <RegistrationForm
                        onSubmit={handleOnSubmit}
                        onLoginPress={handleLoginPress}
                    />
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }

    return(
        <DismissKeyboard>
            <View style={styles.container}>
            <LoadingOverlay visible={loading} />
                <ScrollView>
                    <View style={styles.header}>
                        {header}
                    </View>
                    <RegistrationForm
                        onSubmit={handleOnSubmit}
                        onLoginPress={handleLoginPress}
                    />
                </ScrollView>
            </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingBottom: '10%',
        backgroundColor: '#FCFCFC',
    },

    header:{
        marginBottom: 25
    },

    textBody:{
        alignSelf: 'center',
    },

    baseText:{
        //fontFamily: 'Poppins',
        textAlign: 'center'
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

export default RegistrationScreen;