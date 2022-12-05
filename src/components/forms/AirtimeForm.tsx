import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration, 
} from 'react-native';
import { isEmpty } from '../../utils/FormUtils';
import Form, { IFormInput } from '../elements/Form';
import MainTextField from '../elements/MainTextField';


export interface AirtimeFormState{
    phoneNumber?: string;
    amount?: string | number;
    pin?: string | number;
    operator?: 'airtel' | 'mtn' | 'glo' | '9mobile';
}

export interface AirtimeFormProps{
    onSubmit?: (arg?: AirtimeFormState)=> any;
}

const AirtimeForm: React.FC<AirtimeFormProps> = ({
    onSubmit
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<AirtimeFormState>({
        phoneNumber: '',
        amount: '',
        pin: '',
    });

    // Value collectors
    const phoneNumberValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            phoneNumber: value
        }))
    }
    const amountValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            amount: value
        }))
    }
    const pinValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            pin: value
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
                    return false;
                }
                
            }
        }

        return true;
    }

    // Handlers
    const handleSubmit = () =>{
        if (validateInputs(state)) {
            onSubmit && onSubmit(state)
        }
    }

    const inputs: IFormInput[] = [
        { 
            inputComponent: <MainTextField placeholder={'Enter Number'} keyboardType={'phone-pad'}
                valueCollector={phoneNumberValueCollector} 
            />,
            useCustombottomLabelComponent: true,
            label: "Phone Number"
        },
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} icon={NairaAdornment} placeholder={''}
                valueCollector={amountValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Amount"
        },
        { 
            inputComponent: <MainTextField secureTextEntry={true} 
                keyboardType={'phone-pad'} placeholder={''} autoCorrect={false}
                spellCheck={false}
                valueCollector={pinValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Pin"
        },

    ];


    return(
        <Form 
            inputs={inputs}
            labelStyle={styles.topLabel}
            buttonStyle={{
                marginTop: 20
            }}
            buttonText={'CONFIRM'}
            onSubmit={handleSubmit}
        />
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

export default AirtimeForm;