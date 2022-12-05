import React from 'react';
import { Alert, NativeSyntheticEvent, Pressable, StyleProp, StyleSheet, Text, TextInputChangeEventData, TextStyle, Vibration, View } from 'react-native';
import CellPhoneSvg from '../../icons/cellphone';
import ProfileSvg from '../../icons/profile';
import Form, { IFormInput } from '../elements/Form';
import MainPicker from '../elements/BankPicker';
import PasswordTextField from '../elements/PasswordTextField';
import BasePicker from '../elements/BasePicker';
import ImagePicker from '../elements/ImagePicker';
import EmployeeSvg from '../../icons/employee';
import LocationSvg from '../../icons/location';
import { Asset } from 'react-native-image-picker';
import { isEmpty } from '../../utils/FormUtils';

export interface NewUserRegistrationFormState{
    fullname?: string;
    mobile?: string;
    occupation?: string;
    address?: string;
    wallet_pin?: string;
    profile_photo?: Asset;
    gender?: string;
}

export interface NewUserRegistrationFormProps{
    onSubmit?: (arg?: NewUserRegistrationFormState)=> any;
}

const NewUserRegistrationForm: React.FC<NewUserRegistrationFormProps> = ({
    onSubmit,
})=>{

        // State
        const [state, setState] = React.useState<NewUserRegistrationFormState>({
            fullname: '', mobile: '', occupation: '',
            address: '', wallet_pin: '', gender: ''
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
        const occupationValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                occupation: value
            }))
        }
        const addressValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                address: value
            }))
        }
        const pinValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                wallet_pin: value
            }))
        }
        const photoValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                profile_photo: value
            }))
        }
        const genderValueCollector = (value: any)=>{
            setState((prevState)=>({
                ...prevState,
                gender: value
            }))
        }

        // Handlers
        const handleSubmit = () =>{
            // Validate the inputs
            validateInputs(state);
            
            if (inputsValid) {
                if (confirmPassword !== state?.wallet_pin) {
                    Vibration.vibrate();
                    Alert.alert(
                        'Error',
                        `The confirm pin doesn't match pin provided`,
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
        const handleConfirmChange = (value: string)=>{
            setConfirmPassword(value);
        }

        // Input validator
        const validateInputs = (obj: any)=>{
            if (isEmpty(confirmPassword)) {
                Vibration.vibrate();
                Alert.alert(
                    'Missing Field',
                    `Please fill in all the fields`,
                    [
                        { text: 'OK' }
                    ]
                );
                setInputsValid(false);
                return;
            }
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                    if (key === 'profile_photo') {
                        if (!obj[key] ||  isEmpty(obj[key].fileName)) {
                            Vibration.vibrate();
                            Alert.alert(
                                'Missing Field',
                                `Please choose an image`,
                                [
                                    { text: 'OK' }
                                ]
                            );
                            setInputsValid(false);
                            return;
                        }
                    }
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
                        return;
                    }
                    
                }
            }

            setInputsValid(true);
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
        { 
            placeholder: "Occupation", 
            icon: <EmployeeSvg/>,
            useDefaultAdornment: true,
            valueCollector: occupationValueCollector
        },
        { 
            placeholder: "Business Address", 
            icon: <LocationSvg/>,
            useDefaultAdornment: true,
            valueCollector: addressValueCollector,
        },
        { 
            inputComponent: <PasswordTextField placeholder="Pin" valueCollector={pinValueCollector}/>,
            useCustombottomLabelComponent: true,
        },
        { 
            inputComponent: 
            <PasswordTextField placeholder="Confirm Pin" value={confirmPassword}
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
        { 
            inputComponent: <ImagePicker valueCollector={photoValueCollector}/>,
            useCustombottomLabelComponent: true,
        },
    ];

    return(
        <Form 
            inputs={inputs}
            buttonStyle={{
                marginTop: 10
            }}
            buttonText={'REGISTER'}
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

export default NewUserRegistrationForm;