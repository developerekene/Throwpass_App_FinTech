import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration,
    View, 
} from 'react-native';
import CardSvg from '../../icons/card';
import { fetchName } from '../../swr/profile';
import { isEmpty } from '../../utils/FormUtils';
import ExpiryTextField from '../elements/ExpiryTextField';
import ExpiryWithCvvTextDisplay from '../elements/ExpiryWithCvvTextDisplay';
import Form, { IFormInput } from '../elements/Form';
import MainTextField from '../elements/MainTextField';
import LoadingOverlay from '../LoanElements/LoadingOverlay'


export interface TopUpWalletFormState{
    cardNumber?: string;
    expMonth?: string;
    expYear?: string;
    cvv?: string;
    cardName?: string;
}

export interface TopUpWalletFormProps{
    onSubmit?: (arg?: TopUpWalletFormState)=> any;
    loadingCallback?: (isloading: boolean)=> any;
    phoneNumber?: string;
    fromScan?: boolean;
}

const TopUpWalletForm: React.FC<TopUpWalletFormProps> = ({
    onSubmit, loadingCallback, phoneNumber, fromScan
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<TopUpWalletFormState>();
    const [inputsValid, setInputsValid] = React.useState<boolean>(false);

    // Value collectors
    const cardNameValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            cardName: value
        }))
    }
    const expiryDateValueCollector = (expMonth: any, expYear: any)=>{
        setState((prevState)=>({
            ...prevState,
            expMonth: expMonth,
            expYear: expYear
        }))
    }
    const cardNumberValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            cardNumber: value
        }))
    }
    const cvvValueCollector = (value: any)=>{
        setState((prevState)=>({
            ...prevState,
            cvv: value
        }))
    }

    const amountValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            amount: value
        }))
    }

    // Handlers
    const handleSubmit = () =>{
        console.log(state);
        validateInputs(state);
        if (inputsValid) {
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
            setInputsValid(false);
            return;
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
                    return;
                }
                
            }
        }

        setInputsValid(true);
    }

    const inputs: IFormInput[] = [
        { 
            inputComponent: <MainTextField placeholder={''}
                valueCollector={cardNameValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Card Holder Name"
        },
        { 
            inputComponent: <MainTextField placeholder={''} icon={<CardSvg/>}
                keyboardType={'phone-pad'}
                valueCollector={cardNumberValueCollector} 
            />,
            useCustombottomLabelComponent: true,
            label: "Card Number"
        },
        { 
            inputComponent:(
                <View style={styles.container}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.topLabel}>Expiry Date</Text>
                        <ExpiryTextField valueCollector={expiryDateValueCollector}/>
                    </View>
                    <View style={{ flex: 0.3, alignSelf: 'flex-end', width: '53%' }}>
                        <Text style={styles.topLabel}>CVV</Text>
                        <MainTextField placeholder={''}
                            keyboardType={'phone-pad'}
                            valueCollector={cvvValueCollector}
                            maxLength={3}
                            containerStyle={{ flex: 1, }} 
                        />
                    </View>
                </View>
            ),
        },
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} icon={NairaAdornment} placeholder={''}
                valueCollector={amountValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Amount"
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
            buttonText={'TOP UP'}
            onSubmit={handleSubmit}
        />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        width: '100%'
    },

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

export default TopUpWalletForm;