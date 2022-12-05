import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration, 
} from 'react-native';
import { fetchName } from '../../swr/profile';
import { isEmpty } from '../../utils/FormUtils';
import Form, { IFormInput } from '../elements/Form';
import MainTextField from '../elements/MainTextField';

export interface PersonalWithdrawalState{
    // mobile?: string;
    // beneName?: string;
    amount?: string | number
    pin?: string | number;
}

export interface PersonalWithdrawalFormrops{
    onSubmit?: (arg?: PersonalWithdrawalState)=> any;
    loadingCallback?: (isloading: boolean)=> any;
}

const PersonalWithdrawalForm: React.FC<PersonalWithdrawalFormrops> = ({
    onSubmit, loadingCallback
})=>{

    // State
    const [state, setState] = React.useState<PersonalWithdrawalState>({
        amount: '',
        pin: '',
    });
    const [inputsValid, setInputsValid] = React.useState<boolean>(false);

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

    // Handlers
    const handleSubmit = () =>{
        console.log(state);
        if (validateInputs(state)) {
            onSubmit && onSubmit(state)
        }
    }
    // const handleOnBlur = async ()=>{
    //     loadingCallback && loadingCallback(true);
    //     const { data, error } = await fetchName(state?.mobile)
        
    //     if (data) {
    //         beneNameValueCollector(data.data.name);
    //         loadingCallback && loadingCallback(false);
    //     }

    //     if (error){
    //         loadingCallback && loadingCallback(false);
    //     }
    
    // }

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
                    setInputsValid(false);
                    return false;
                }
                
            }
        }

        setInputsValid(true);
        return true;
    }

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
        //         value={state?.beneName}
        //     />,
        //     useCustombottomLabelComponent: true,
        //     label: "Beneficiary Name",
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
            buttonText={'WITHDRAW'}
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

export default PersonalWithdrawalForm;