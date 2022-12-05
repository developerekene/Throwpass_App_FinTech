import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { 
    Keyboard, KeyboardAvoidingView, Platform, 
    ScrollView, StyleSheet, Text, View,
    Vibration, Alert 
} from 'react-native';
import { useSelector } from 'react-redux';
import DismissKeyboard from '../Components/DismissKeyboard';
import NewUserRegistrationForm, { NewUserRegistrationFormState } from '../Components/forms/NewUserRegistrationForm';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import ToastContext from '../components/context/ToastContext';
import { RootState } from '../redux/slices/store';
import { createUser } from '../swr/profile';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useHeaderHeight } from '@react-navigation/elements';

interface RegistrationcreenProps extends NativeStackHeaderProps{}

const NewUserRegistrationScreen: React.FC<RegistrationcreenProps> = ({ 
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
    
    const handleOnSubmit = async (state?: NewUserRegistrationFormState)=>{
        Keyboard.dismiss();
        setLoading(true);

        const { data, error } = await createUser(state, auth?.token);

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
                navigation.navigate('Main');
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
                        <NewUserRegistrationForm onSubmit={handleOnSubmit}/>
                    </View>
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }
    

    return(
        <DismissKeyboard>
            <View style={styles.container}>
            <LoadingOverlay visible={loading} />
                <ScrollView>
                    <View>
                        <NewUserRegistrationForm onSubmit={handleOnSubmit}/>
                    </View>
                </ScrollView>
            </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 10,
        flexDirection: 'column',
        //justifyContent: 'center',
        paddingVertical: '5%',
    },

    formContainer:{
        paddingVertical: '5%'
    }
})

export default NewUserRegistrationScreen;