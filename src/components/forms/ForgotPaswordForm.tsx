import React from 'react';
import { Pressable, StyleProp, TextStyle, Text, StyleSheet } from 'react-native';
import Form, { IFormInput } from '../elements/Form';

export interface RegistrationFormProps{
    onSubmit?: (arg: any)=> any;
    onResend?: (arg: any)=> any;
}

const inputs: IFormInput[] = [
    { 
        placeholder: "Phone Number", 
        type: "phone-pad" ,
        bottomLabel: "Resend",
        useCustombottomLabelComponent: true,
    },
];

const ForgotPasswordForm: React.FC<RegistrationFormProps> = ({ onSubmit, onResend })=>{

    const bottomLabelComponent = (
        <Pressable
            style={styles.pressable}
            onPressOut={onResend}
        >
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <Text style={[styles.bottomLabel, style]}>
                        Resend
                    </Text>
            )}}
        </Pressable>
    );

    return(
       <Form
        inputs={inputs}
        buttonStyle={{
            marginTop: 10
        }}
        onSubmit={onSubmit}
        buttonText="Request OTP"
        bottomLabelComponent={bottomLabelComponent}
       />
    )
}

const styles = StyleSheet.create({
    pressable:{
        marginTop: 10,
        alignSelf: 'flex-end',
    },

    bottomLabel:{
        textAlign: 'right',
        color: '#6E7191',
    },
})

export default ForgotPasswordForm;