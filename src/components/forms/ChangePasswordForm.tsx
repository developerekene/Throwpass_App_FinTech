import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration,
    View, 
} from 'react-native';

import { isEmpty } from '../../utils/FormUtils';
import Form, { IFormInput } from '../elements/Form';
import MainPasswordTextField from '../elements/MainPasswordTextField';


export interface ChangePasswordFormState{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export interface ChangePasswordFormProps{
    onSubmit?: (arg?: ChangePasswordFormState)=> any;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
    onSubmit,
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<ChangePasswordFormState>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [inputsValid, setInputsValid] = React.useState<boolean>(false);

    // Value collectors
    const oldPasswordValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            oldPassword: value
        }))
    }

    const newPasswordValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            newPassword: value
        }))
    }
    const confirmPasswordValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            confirmPassword: value
        }))
    }

    // Handlers
    const handleSubmit = () =>{
        if (validateInputs(state)) {
            onSubmit && onSubmit(state)
        }
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
                    return false
                }
                
            }
        }
        return true;
    }

    const inputs: IFormInput[] = [
        { 
            inputComponent: <MainPasswordTextField placeholder={''}
                valueCollector={oldPasswordValueCollector} 
            />,
            useCustombottomLabelComponent: true,
            label: "Current Password"
        },
        { 
            inputComponent: <MainPasswordTextField placeholder={''}
                valueCollector={newPasswordValueCollector} 
            />,
            useCustombottomLabelComponent: true,
            label: "New Password"
        },
        { 
            inputComponent: <MainPasswordTextField placeholder={''}
                valueCollector={confirmPasswordValueCollector} 
            />,
            useCustombottomLabelComponent: true,
            label: "Confirm New Password"
        },

    ];

    return(
        <React.Fragment>
            <Form 
            inputs={inputs}
            labelStyle={styles.topLabel}
            buttonStyle={{
                marginTop: 20
            }}
            buttonText={'CHANGE PASSWORD'}
            onSubmit={handleSubmit}
        />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    topLabel:{
        color: '#6E7191',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: 0.75,
    },

    amount:{
        fontSize: 20,
    },
})

export default ChangePasswordForm;