import React from 'react';
import { Keyboard, Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import DismissKeyboard from '../Components/DismissKeyboard';
import MyButton from '../Components/elements/MyButton';
import OTPInput from '../Components/elements/OTPInput';
import ForgotPasswordForm from '../components/forms/ForgotPaswordForm';

const OTPScreen: React.FC<any> = ()=>{

    const handleOnSubmit = ()=>{
        Keyboard.dismiss();
    }

    const handleOnResend = ()=>{
        Keyboard.dismiss();
    }
    
    return(
        <DismissKeyboard>
            <View style={styles.container}>
                
                {/** Instruction */}
                <View style={styles.textbody}>
                    <Text numberOfLines={5} style={styles.text} >
                    Please enter your registered phone 
                    number and a comfirmation OTP 
                    code will be sent to you.
                    </Text>
                </View>

                {/** OTP Input */}
                <OTPInput/>

                {/** Footer asrea */}
                <View style={styles.footer}>
                    <Text style={styles.footerTextBase}>
                        Didn’t receive OTP? 
                    </Text>
                    <Pressable onPressOut={handleOnResend}>
                        {
                            ({ pressed }) =>{
                                let pressedStyle: StyleProp<TextStyle> = {
                                    opacity: 0.5
                                }
                
                                let style = pressed ? pressedStyle : null;
                
                                return(
                                    <Text style={[styles.footerSpan, style]}> Resend</Text>
                                )
                            }   
                        }
                    </Pressable>
                </View>

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

    footer:{
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    footerTextBase:{
        color: '#6E7191',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: 0.75,
        textAlign: 'center'
    },

    footerSpan:{
        color: '#0122AE'
    }
})

export default OTPScreen;