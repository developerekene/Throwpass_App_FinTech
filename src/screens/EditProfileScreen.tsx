import {NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { 
    Keyboard, KeyboardAvoidingView, Platform, 
    ScrollView, StyleSheet, Text, View,
    Vibration, Alert 
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';
import DismissKeyboard from '../components/DismissKeyboard';
import EditProfileForm, { EditProfileFormState } from '../components/forms/EditProfileForm';
import NewUserRegistrationForm, { NewUserRegistrationFormState } from '../Components/forms/NewUserRegistrationForm';
import LoadingOverlay from '../components/LoanElements/LoadingOverlay';
import ToastContext from '../components/context/ToastContext';
import { RootState } from '../redux/slices/store';
import { createUser, editUser } from '../swr/profile';
import { basePath } from '../swr/transaction';
import { ParamListBase } from '@react-navigation/native';

interface EditProfileScreenProps extends NativeStackScreenProps<ParamListBase>{}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ 
    route, navigation,
})=>{

    // Context
    const showToast = React.useContext(ToastContext);

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Redux
    const { auth, cookies, user } = useSelector((state: RootState)=> state.auth);

    // Hooks
    const config = useSWRConfig();
    
    const handleOnSubmit = async (state?: EditProfileFormState)=>{
        Keyboard.dismiss();
        console.log(state);
        setLoading(true);

        const { data, error } = await editUser(state, auth?.token);

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
                config.mutate(`${basePath}/user/profile/`, true);
                showToast && showToast('success', data.message);
                navigation.navigate('ProfileHome');
            }
        }

        if (error) {
            setLoading(false);
            Vibration.vibrate();
            Alert.alert(
                'Error',
                'Unexpected error occured',
                [
                    { text: 'OK' }
                ]
            );
        }
    };
    

    return(
        <DismissKeyboard>
            <View style={styles.container}>
            <LoadingOverlay visible={loading} />
                <ScrollView>
                    <View>
                        <EditProfileForm onSubmit={handleOnSubmit} user={user}/>
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

export default EditProfileScreen;