import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Keyboard, Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import MainOTPInput, { MainOTPState } from '../components/elements/MainOTPInput';
import MyButton from '../components/elements/MyButton';

export interface ConfirmChangePinScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params: any;
    }>
}

const ChangePinScreen: React.FC<ConfirmChangePinScreenProps> = ({ route, navigation })=>{

    const [pin, setPin] = React.useState<string>('');

    // Handlers
    const handleChange = (value: MainOTPState)=>{
        setPin(`${value.pin1}${value.pin2}${value.pin3}${value.pin4}`)
    }
    const handleOnSubmit = ()=>{
        Keyboard.dismiss();
        navigation?.navigate('ConfirmPinScreen', { old_pin: pin });
    }
    
    return(
        <DismissKeyboard>
            <View style={styles.container}>
                
                {/** Instruction */}
                <View style={styles.textbody}>
                    <Text style={styles.text} >
                        Enter Old PIN
                    </Text>
                </View>

                {/** OTP Input */}
                <MainOTPInput onInputChange={handleChange}/>

                {/** Button */}
                <MyButton
                    text='CONTINUE'
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

export default ChangePinScreen;