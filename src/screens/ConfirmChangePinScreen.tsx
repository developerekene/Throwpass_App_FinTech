import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Keyboard, Pressable, StyleProp, StyleSheet, Text, TextStyle, Vibration, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DismissKeyboard from '../components/DismissKeyboard';
import MainOTPInput, { MainOTPState } from '../components/elements/MainOTPInput';
import MyButton from '../components/elements/MyButton';
import LoadingOverlay from '../components/LoanElements/LoadingOverlay';
import ToastContext from '../components/context/ToastContext';
import { RootState } from '../redux/slices/store';
import { createPin, updatePin } from '../swr/profile';
import { ScanParams } from './ToSanwoPayScreen';

export interface ConfirmChangePinScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params?: { old_pin: string; }
    }>
}

const ConfirmChangePinScreen: React.FC<ConfirmChangePinScreenProps> = ({ navigation, route })=>{

    // Context
    const showToast = React.useContext(ToastContext);

    // State
    const [loading, setLoading] = React.useState<boolean>(false);
    const [pin, setPin] = React.useState<string>('');

    // Redux
    const { auth, user } = useSelector((state: RootState)=> state.auth);

    // Hooks
    const dispatch = useDispatch();

    // Validate input
    const inputIsValid = () =>{
        if (pin.length < 4) {
            Vibration.vibrate();
            Alert.alert(
                'Missing Field',
                `Complete the entry`,
                [
                    { text: 'OK' }
                ]
            );
            return false;
        }

        return true;
    }

    // Handlers
    const handleChange = (value: MainOTPState)=>{
        setPin(`${value.pin1}${value.pin2}${value.pin3}${value.pin4}`)
    }

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

    //let oldPin = route?.params.old_pin;

    const handleOnSubmit = async()=>{
        Keyboard.dismiss();
        if (inputIsValid()) {
            setLoading(true);
            console.log(user?.has_pin_set);
            const { data, error } = user?.has_pin_set ? 
            await updatePin(pin, user?.mobile, auth?.token) :
            await createPin(pin, auth?.token)

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
                    navigation?.navigate('ProfileHome');
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


        }
        //console.log(oldPin, pin);
    }
    
    return(
        <DismissKeyboard>
            <View style={styles.container}>
                <LoadingOverlay visible={loading}/>
                
                {/** Instruction */}
                <View style={styles.textbody}>
                    <Text style={styles.text} >
                        Enter New PIN
                    </Text>
                </View>

                {/** OTP Input */}
                <MainOTPInput onInputChange={handleChange}/>

                {/** Button */}
                <MyButton
                    text='UPDATE PIN'
                    onPress={handleOnSubmit}
                    style={{ marginTop: 32 }}
                />
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
    },

    textbody:{
        marginVertical: 30
    },

    text:{
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.75,
        color: 'black',
    },
})

export default ConfirmChangePinScreen;