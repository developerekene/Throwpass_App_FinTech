import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration, 
} from 'react-native';
import Form, { IFormInput } from '../elements/Form';
import BankPicker from '../elements/BankPicker';
import MainTextField from '../elements/MainTextField';
import { isEmpty } from '../../utils/FormUtils';
import { fetchName } from '../../swr/profile';

export interface PersonalSavingsState{
    amount?: string | number
    pin?: string | number;
}

export interface PersonalSavingsFormProps{
    onSubmit?: (arg?: PersonalSavingsState)=> any;
    loadingCallback?: (isloading: boolean)=> any;
}

const PersonalSavingsForm: React.FC<PersonalSavingsFormProps> = ({
    onSubmit, loadingCallback
})=>{

    // State
    const [state, setState] = React.useState<PersonalSavingsState>({
        amount: '',
        pin: '',
    });

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

    // Error alert
    const alertError = (message: string = 'An unknown error occurred')=>{
        Vibration.vibrate();
        Alert.alert(
            'Error',
            message,
            [
                { text: 'OK' }
            ]
        );
    }
    // const handleOnBlur = async ()=>{
    //     if (state?.mobile && state.mobile.toString().length === 11){
    //         loadingCallback && loadingCallback(true);
    //         const { data, error } = await fetchName(state?.mobile.toString())
            
    //         if (data) {
    //             beneNameValueCollector(data.data.name);
    //             loadingCallback && loadingCallback(false);
    //         }

    //         if (error){
    //             loadingCallback && loadingCallback(false);
    //             alertError(`Could not get beneficiary's name`);
    //         }
    //     }
    // }

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    const inputs: IFormInput[] = [
        // { 
        //     inputComponent: <MainTextField keyboardType={'phone-pad'} placeholder={''} 
        //         valueCollector={mobileValueCollector}
        //         onBlur={handleOnBlur}
        //     />,
        //     useCustombottomLabelComponent: true,
        //     label: "Phone Number"
        // },
        // { 
        //     inputComponent: <MainTextField editable={false} placeholder={''} 
        //         valueCollector={beneNameValueCollector} 
        //         value={state.beneName}
        //     />,
        //     useCustombottomLabelComponent: true,
        //     label: "Beneficiary Name"
        // },
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} icon={NairaAdornment} placeholder={''}
                valueCollector={amountValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Amount"
        },
        { 
            inputComponent: <MainTextField secureTextEntry 
                keyboardType={'number-pad'} placeholder={''} 
                autoCorrect={false}
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

export default PersonalSavingsForm;