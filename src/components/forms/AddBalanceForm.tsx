import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration,
    View, 
} from 'react-native';
import CardSvg from '../../icons/card';
import { isEmpty } from '../../utils/FormUtils';
import ExpiryTextField from '../elements/ExpiryTextField';
import Form, { IFormInput } from '../elements/Form';
import MainTextField from '../elements/MainTextField';


export interface AddBalanceFormState{
   amount?: string
}

export interface TopUpWalletFormProps{
    onSubmit?: (arg?: AddBalanceFormState)=> any;
}

const AddBalanceForm: React.FC<TopUpWalletFormProps> = ({
    onSubmit,
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<AddBalanceFormState>({
        amount: ''
    });

    // Value collectors
    const amountValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            amount: value
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

export default AddBalanceForm;