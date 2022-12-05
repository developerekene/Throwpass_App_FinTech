import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { 
    Keyboard, KeyboardAvoidingView, Platform, 
    ScrollView, StyleSheet, Text, View,
    Vibration, Alert 
} from 'react-native';
import { useSelector } from 'react-redux';
import DismissKeyboard from '../components/DismissKeyboard';
import LoadingOverlay from '../components/LoanElements/LoadingOverlay';
import ToastContext from '../components/context/ToastContext';
import { RootState } from '../redux/slices/store';
import { changePassword, createUser } from '../swr/profile';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useHeaderHeight } from '@react-navigation/elements';
import ChangePasswordForm, { ChangePasswordFormState } from '../components/forms/ChangePasswordForm';
import { ParamListBase } from '@react-navigation/native';

interface ChangePasswordScreenProps extends NativeStackScreenProps<ParamListBase>{}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ 
    route, navigation,
})=>{

    // Context
    const showToast = React.useContext(ToastContext);

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Redux
    const { auth } = useSelector((state: RootState)=> state.auth);

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
    
    const handleOnSubmit = async (state?: ChangePasswordFormState)=>{
        Keyboard.dismiss();
        setLoading(true);

        const { data, error } = await changePassword(state, auth?.token);

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
                navigation.navigate('ProfileHome');
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
                        <ChangePasswordForm onSubmit={handleOnSubmit}/>
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
                        <ChangePasswordForm onSubmit={handleOnSubmit}/>
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

export default ChangePasswordScreen;