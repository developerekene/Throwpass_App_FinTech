import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration, 
} from 'react-native';
import { BillsResponseData } from '../../types/responses';
import { isEmpty } from '../../utils/FormUtils';
import BillPicker from '../elements/BillPicker';
import Form, { IFormInput } from '../elements/Form';
import MainPicker from '../elements/MainPicker';
import MainTextField from '../elements/MainTextField';


export interface DataSubscriptionFormState{
    phoneNumber?: string;
    amount?: string | number;
    pin?: string | number;
    package?: string;
    operator?: 'airtel' | 'mtn' | 'glo' | '9mobile';
}

export interface DataSubscriptionFormProps{
    onSubmit?: (arg?: DataSubscriptionFormState)=> any;
    options?: BillsResponseData[];
}

const DataSubscriptionForm: React.FC<DataSubscriptionFormProps> = ({
    onSubmit, options,
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<DataSubscriptionFormState>({
        phoneNumber: '',
        amount: '',
        pin: '',
        package :'',
    });

    // Value collectors
    const packageValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            package: value,
            amount: options?.find(item => item.biller_name === value)?.amount.toString() || ''
        }))
    }
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
            inputComponent: <BillPicker placeholder={'Select Package'} 
                valueCollector={packageValueCollector}
                options={options}
            />,
            useCustombottomLabelComponent: true,
            label: "Choose Package"
        },
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
                editable={false}
                value={options?.find(item => item.biller_name === state?.package)?.amount.toString() || ''}
                inputStyle={{ color: 'black' }}
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

export default DataSubscriptionForm;