import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration, 
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';
import { useDstvBills } from '../../swr/bills';
import { BillsResponseData } from '../../types/responses';
import { isEmpty } from '../../utils/FormUtils';
import BillPicker from '../elements/BillPicker';
import Form, { IFormInput } from '../elements/Form';
import MainPicker from '../elements/MainPicker';
import MainTextField from '../elements/MainTextField';


export interface TvSubscriptionFormState{
    phoneNumber?: string;
    amount?: string | number;
    pin?: string | number;
    cardNumber?: string | number;
    plan?: string;
    package?: string;
}

export interface TvSubscriptionFormProps{
    onSubmit?: (arg?: TvSubscriptionFormState)=> any;
    dstvOptions?: BillsResponseData[];
    gotvOptions?: BillsResponseData[];
    starTimesOptions?: BillsResponseData[];
}

const TvSubscriptionForm: React.FC<TvSubscriptionFormProps> = ({
    onSubmit, dstvOptions, gotvOptions, starTimesOptions
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<TvSubscriptionFormState>({
        phoneNumber: '',
        amount: '',
        pin: '',
        cardNumber: '',
        plan: '',
        package: '',
    });
    const [options, setOptions] = React.useState<BillsResponseData[]>([]);
    const [inputsValid, setInputsValid] = React.useState<boolean>(false);

    // Value collectors
    const phoneNumberValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            phoneNumber: value
        }))
    }
    const CardNumberValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            cardNumber: value
        }))
    }
    const planValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            plan: value,
            amount: options?.find(item => item.biller_name === value)?.amount.toString() || ''
        }))
    }
    const packageValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            package: value
        }));
        switch (value) {
            case 'dstv':
                setOptions(dstvOptions || []);
                break;

            case 'gotv':
                setOptions(gotvOptions || []);
                break;

            case 'starTimes':
                setOptions(starTimesOptions || []);
                break;
        
            default:
                break;
        }
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
            inputComponent: <MainTextField placeholder={'Enter card Number'} keyboardType={'phone-pad'}
                valueCollector={CardNumberValueCollector} 
            />,
            useCustombottomLabelComponent: true,
            label: "Card Number"
        },
        { 
            inputComponent: <MainPicker placeholder={'Select Package'} 
                valueCollector={packageValueCollector} 
                options={[
                    { label: 'DSTV', value: 'dstv' },
                    { label: 'GOTV', value: 'gotv' },
                    { label: 'Star Times', value: 'starTimes' },
                ]}
            />,
            useCustombottomLabelComponent: true,
            label: "Choose Package"
        },
        { 
            inputComponent: <BillPicker placeholder={'Select Plan'}
                valueCollector={planValueCollector}
                options={options}
            />,
            useCustombottomLabelComponent: true,
            label: "Choose TV Plan"
        },
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} icon={NairaAdornment} placeholder={''}
                valueCollector={amountValueCollector} editable={false}
                value={options?.find(item => item.biller_name === state?.plan)?.amount.toString() || ''}
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

export default TvSubscriptionForm;