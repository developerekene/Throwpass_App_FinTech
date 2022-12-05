import React from 'react';
import { 
    StyleSheet, 
    Text, 
} from 'react-native';
import Form, { IFormInput } from '../elements/Form';
import BasePicker from '../elements/BasePicker';
import MainTextField from '../elements/MainTextField';

export interface InstallmentlSavingsState{
    mobile?: string | number;
    beneName?: string;
    subject?: string;
    amount?: string | number
    pin?: string | number;
}

export interface InstallmentSavingsFormProps{
    onSubmit?: (arg?: InstallmentlSavingsState)=> any;
}

const InstallmentSavingsForm: React.FC<InstallmentSavingsFormProps> = ({
    onSubmit
})=>{

    // State
    const [state, setState] = React.useState<InstallmentlSavingsState>();

    // Value collectors
    const beneNameValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            beneName: value
        }))
    }

    const mobileValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            mobile: value
        }))
    }

    const subjectValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            subject: value
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

    // Handlers
    const handleSubmit = () =>{
        onSubmit && onSubmit(state)
    }

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    const inputs: IFormInput[] = [
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} placeholder={''} 
                valueCollector={mobileValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Phone Number"
        },
        { 
            inputComponent: <MainTextField editable={false} placeholder={''} valueCollector={beneNameValueCollector} />,
            useCustombottomLabelComponent: true,
            label: "Beneficiary Name"
        },
        { 
            inputComponent: 
            <BasePicker valueCollector={subjectValueCollector} placeholderTextColor={'#a0a3bd'}
                backgroundColor={'#EFF0F7'} accessibilityLabel="Select Subject"
                placeholder="Select Subject" borderWidth={0} borderRadius={8}
            />,
            useCustombottomLabelComponent: true,
            label: "Subject",
        },
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} icon={NairaAdornment} placeholder={''}
                valueCollector={amountValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Amount"
        },
        { 
            inputComponent: <MainTextField secureTextEntry keyboardType={'phone-pad'} placeholder={''}
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
            buttonText={'SAVE'}
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

export default InstallmentSavingsForm;