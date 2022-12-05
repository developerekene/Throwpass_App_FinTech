import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { 
    Keyboard, KeyboardAvoidingView, Platform, 
    ScrollView, StyleSheet, Text, View,
    Vibration, Alert 
} from 'react-native';
import { useSelector } from 'react-redux';
import DismissKeyboard from '../components/DismissKeyboard';
import KycForm, { KycFormState } from '../components/forms/KYCForm';
import NewUserRegistrationForm, { NewUserRegistrationFormState } from '../components/forms/NewUserRegistrationForm';
import LoadingOverlay from '../components/LoanElements/LoadingOverlay';
import ToastContext from '../components/context/ToastContext';
import { RootState } from '../redux/slices/store';
import { createUser } from '../swr/profile';
import { ParamListBase } from '@react-navigation/native';

interface RegistrationcreenProps extends NativeStackScreenProps<ParamListBase>{}

const KycScreen: React.FC<RegistrationcreenProps> = ({ 
    route, navigation,
})=>{

    // Context
    const showToast = React.useContext(ToastContext);

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Redux
    const { auth, cookies } = useSelector((state: RootState)=> state.auth);
    
    const handleOnSubmit = async (state?: KycFormState)=>{
        console.log("KYC: " + state);
        Keyboard.dismiss();
        // setLoading(true);

        // const { data, error } = await createUser(state, auth?.token);

        // if (data) {
        //     if (data.status === false) {
        //         setLoading(false);
        //         Vibration.vibrate();
        //         Alert.alert(
        //             'Error',
        //             data.message,
        //             [
        //                 { text: 'OK' }
        //             ]
        //         );
        //     }
        //     else{
        //         setLoading(false);
        //         showToast && showToast('success', data.message);
        //         navigation.navigate('Main');
        //     }
        // }

        // if (error) {
        //     setLoading(false);
        //     Vibration.vibrate();
        //     Alert.alert(
        //         'Error',
        //         'Unexpected error occured',
        //         [
        //             { text: 'OK' }
        //         ]
        //     );
        // }
    };
    

    return(
        <DismissKeyboard>
            <View style={styles.container}>
            <LoadingOverlay visible={loading} />
                <ScrollView>
                    <View>
                        <KycForm onSubmit={handleOnSubmit}/>
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

export default KycScreen;