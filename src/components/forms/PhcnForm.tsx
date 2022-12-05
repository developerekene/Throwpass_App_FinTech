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


export interface PhcnFormState{
    phoneNumber?: string;
    amount?: string | number;
    pin?: string | number;
    meterNumber?: string | number;
    disco?: string;
}

export interface PhcnFormProps{
    onSubmit?: (arg?: PhcnFormState)=> any;
    options?: BillsResponseData[];
}

const PhcnForm: React.FC<PhcnFormProps> = ({
    onSubmit, options
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<PhcnFormState>({
        phoneNumber: '',
        amount: '',
        pin: '',
        meterNumber: '',
        disco: ''
    });

    // Value collectors
    const phoneNumberValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            phoneNumber: value
        }))
    }
    const MeterNumberValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            meterNumber: value
        }))
    }
    const discoValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            disco: value
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
            inputComponent: <MainTextField placeholder={'Enter meter number'} keyboardType={'phone-pad'}
                valueCollector={MeterNumberValueCollector} 
            />,
            useCustombottomLabelComponent: true,
            label: "Meter Number"
        },
        { 
            inputComponent: <BillPicker placeholder={'Select Disco'}
                valueCollector={discoValueCollector}
                options={options} withoutAmount
            />,
            useCustombottomLabelComponent: true,
            label: "Choose Disco"
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

export default PhcnForm;