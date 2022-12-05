import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import CellPhoneSvg from '../../icons/cellphone';
import Form, { IFormInput } from '../elements/Form';
import PasswordTextField from '../elements/PasswordTextField';
import SInfo from "react-native-sensitive-info";

export interface LoginState{
    mobile?: string | number;
    password?: string;
}

export interface LoginFormProps{
    onSubmit?: (arg?: LoginState)=> any;
    onForgotPassword?: (arg: any)=> any;
    onSignUp?: (arg: any)=> any;
}


const LoginForm: React.FC<LoginFormProps> = ({
    onForgotPassword, onSubmit, onSignUp
})=>{

    // Ref
    // To track if component is mounted
    const mountedRef =  React.useRef(false);

    // State
    const [state, setState] = React.useState<LoginState>();

    // Value collectors
    const mobileValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            mobile: value
        }))
    }

    const passwordValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            password: value,
        }))
    }

    // Handlers
    const handleSubmit = ()=>{
        onSubmit && onSubmit(state);
    }

    // Effect
    React.useEffect(()=>{
        mountedRef.current = true;
        SInfo.getItem("mobile",{
            sharedPreferencesName: "SanwoSharedPrefs",
            keychainService: "SanwoKeychain",
        })
        .then((mobile)=>{
            if (mountedRef.current) {
                console.log(mobile);
                setState((prevState)=> ({ ...prevState, mobile }))
            }
        })

        return ()=>{
            mountedRef.current = false;
        }
    },[])

    const inputs: IFormInput[] = [
        { 
            placeholder: "Phone Number", 
            type: "phone-pad",
            icon: <CellPhoneSvg/>,
            useDefaultAdornment: true,
            valueCollector: mobileValueCollector,
            value: state?.mobile,
            testID: "phone_number",
            accessibilityLabel: "phone_number",
            accessible: true
        },
        { 
            inputComponent: <PasswordTextField valueCollector={passwordValueCollector} />,
            useCustombottomLabelComponent: true,
            testID: 'password',
            accessibilityLabel: 'password',
            accessible: true
        }
    ];

    const bottomLabelComponent = (
        <Pressable
            style={styles.pressable}
            onPressOut={onForgotPassword}
        >
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <Text style={[styles.bottomLabel, style]}>
                        Forgot Password?
                    </Text>
            )}}
        </Pressable>
    );

    const pressableSignup = (
        <Pressable
            style={{ alignSelf: 'center'}}
            onPressOut={onSignUp}
        >
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <Text style={[styles.signup, style]}>
                        Sign Up
                    </Text>
            )}}
        </Pressable>
    )

    const footerComponent = (
        <View style={styles.footer}>
            {/** Title */}
            <Text style={styles.footerTitle}>
                Don't have an account?
            </Text>

            {/** Pressable Sign Up */}
            {pressableSignup}
        </View>
    );

    return(
        <Form 
            inputs={inputs}
            bottomLabelComponent={bottomLabelComponent}
            footerComponent={footerComponent}
            buttonStyle={{
                marginTop: 10
            }}
            onSubmit={handleSubmit}
        />
    )
}

const styles = StyleSheet.create({
    bottomLabel:{
        textAlign: 'right',
        color: '#6E7191',
    },

    footer:{
        marginTop: 40,
    },

    signup:{
        color: '#0122AE',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: 0.75,
        lineHeight: 24,
    },

    footerTitle:{
        color: '#6E7191',
        textAlign: 'center'
    },

    pressable:{
        marginTop: 10,
        alignSelf: 'flex-end',
    },
})

export default LoginForm;