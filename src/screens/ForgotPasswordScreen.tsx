import React from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import DismissKeyboard from '../Components/DismissKeyboard';
import ForgotPasswordForm from '../components/forms/ForgotPaswordForm';
import { StartScreenProps } from './StartScreen';

interface ForgotPasswordScreenProps extends StartScreenProps{}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ route, navigation })=>{
   
    const handleOnSubmit = ()=>{
        Keyboard.dismiss();
        navigation?.navigate('OTP');
    }
    
    return(
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={styles.textbody}>
                    <Text numberOfLines={5} style={styles.text} >
                        Please enter your registered phone 
                        number and a comfirmation OTP 
                        code will be sent to you.
                    </Text>
                </View>
                <ForgotPasswordForm onSubmit={handleOnSubmit} />
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
        backgroundColor: '#fff',
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
    }
})

export default ForgotPasswordScreen;