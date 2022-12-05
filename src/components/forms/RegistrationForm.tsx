import React from 'react';
import { Alert, Pressable, StyleProp, StyleSheet, Text, TextStyle, Vibration, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import CellPhoneSvg from '../../icons/cellphone';
import ProfileSvg from '../../icons/profile';
import { isEmpty } from '../../utils/FormUtils';
import BasePicker from '../elements/BasePicker';
import Form, { IFormInput } from '../elements/Form';
import PasswordTextField from '../elements/PasswordTextField';


export interface RegistrationFormState{
    fullname?: string;
    mobile?: string;
    password?: string;
    confirm_password?: string;
    profile_photo?: Asset;
    gender?: string;
}

export interface RegistrationFormProps{
    onSubmit?: (arg?: RegistrationFormState)=> any;
    onLoginPress?: (arg: any)=> any;
}


const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onLoginPress, onSubmit,
})=>{

    // State
    const [state, setState] = React.useState<RegistrationFormState>({
        fullname: '',
        mobile: '',
        password: '',
        confirm_password: '',
        gender: '',
    });
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [inputsValid, setInputsValid] = React.useState<boolean>(false);

    // Value collectors
    const nameValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            fullname: value
        }))
    }

    const mobileValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            mobile: value
        }))
    }
    const addressValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            address: value
        }))
    }
    const passwordValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            password: value
        }))
    }
    const genderValueCollector = (value: any)=>{
        setState((prevState)=>({
            ...prevState,
            gender: value
        }))
    }

    // Handlers
    const handleConfirmChange = (value: string)=>{
        setConfirmPassword(value);
        setState((prevState)=>({
            ...prevState,
            confirm_password: value
        }))
    }

    // Input validator
    const validateInputs = (obj: any)=>{
        if (!obj) {
            Vibration.vibrate();
            Alert.alert(
                'Missing Field',
                `Please fill in all the fields`,
                [
                    { text: 'OK' }
                ]
            );
            setInputsValid(false);
            return false;
        }
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
            
                if (isEmpty(element)) {
                    Vibration.vibrate();
                    Alert.alert(
                        'Missing Field',
                        `Please fill in all the fields`,
                        [
                            { text: 'OK' }
                        ]
                    );
                    setInputsValid(false);
                    return false;
                }
                
            }
        }

        setInputsValid(true);
        return true;
    }

    const handleSubmit = () =>{
        if (validateInputs(state)) {
            if (confirmPassword !== state?.password) {
                Vibration.vibrate();
                Alert.alert(
                    'Error',
                    `The confirm password doesn't match password provided`,
                    [
                        { text: 'OK' }
                    ]
                );
                setInputsValid(false);
                return;
            }
            onSubmit && onSubmit(state);
        }
    }

    const inputs: IFormInput[] = [
        { 
            placeholder: "Full Name", 
            icon: <ProfileSvg/>,
            useDefaultAdornment: true,
            valueCollector: nameValueCollector
        },
        { 
            placeholder: "Phone Number", valueCollector: mobileValueCollector,
            type: 'phone-pad',
            icon: <CellPhoneSvg/>,
            useDefaultAdornment: true
        },
        // { 
        //     placeholder: "Business Address", 
        //     icon: <LocationSvg/>,
        //     useDefaultAdornment: true,
        //     valueCollector: addressValueCollector,
        // },
        { 
            inputComponent: 
            <PasswordTextField placeholder="Password" valueCollector={passwordValueCollector}
            />,
            useCustombottomLabelComponent: true,
        },
        { 
            inputComponent: 
            <PasswordTextField placeholder="Confirm Password" value={confirmPassword}
                onChangeText={handleConfirmChange}
            />,
            useCustombottomLabelComponent: true,

        },
        { 
            inputComponent: <BasePicker 
                accessibilityLabel='Gender'
                placeholder='Gender'
                placeholderTextColor='#A0A3BD'
                valueCollector={genderValueCollector}
                options={
                    [
                        { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' },
                    ]
                }
            />,
            useCustombottomLabelComponent: true,
        },
    ];

    const pressableLogin = (
        <Pressable
            style={{ alignSelf: 'center'}}
            onPressOut={onLoginPress}
        >
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <Text style={[styles.signup, style]}>
                        Login here
                    </Text>
            )}}
        </Pressable>
    )

    const footerComponent = (
        <View style={styles.footer}>
            {/** Title */}
            <Text style={styles.footerTitle}>
                Already have an account?
            </Text>

            {/** Pressable Sign Up */}
            {pressableLogin}
        </View>
    );

    return(
        <Form 
            inputs={inputs}
            footerComponent={footerComponent}
            buttonStyle={{
                marginTop: 10
            }}
            buttonText={'SIGN UP'}
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

export default RegistrationForm;