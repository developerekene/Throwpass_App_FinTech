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
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';
import BankModalField from '../elements/BankModalField';
import { isEmpty } from '../../utils/FormUtils';
import { fetchAcctName } from '../../swr/profile';

export interface ToBankFormState{
    bankName?: string;
    bankLabel?: string;
    acctNo?: string | number;
    acctName?: string;
    amount?: string | number
    pin?: string | number;
}

export interface ToSanwoPayFormProps{
    onSubmit?: (arg?: ToBankFormState)=> any;
    loadingCallback?: (isloading: boolean)=> any;
    name?: string;
}

const ToBankAccountForm: React.FC<ToSanwoPayFormProps> = ({
    onSubmit, loadingCallback, name
})=>{

    // Redux
    const { banks } = useSelector((state: RootState)=> state.thirdParty);

    // State
    const [state, setState] = React.useState<ToBankFormState>({
        bankName: '',
        bankLabel: '',
        acctNo: '',
        acctName: '',
        amount: '',
        pin: '',
    });
    const [inputsValid, setInputsValid] = React.useState<boolean>(false);

    // Value collectors
    const bankNameValueCollector = (value: any, label?: string) =>{
        setState((prevState)=>({
            ...prevState,
            bankName: value,
            bankLabel: label,
        }))
    }

    const acctNoValueCollector = async (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            acctNo: value
        }));

        if (value && value.toString().length === 10) {
            if (!state.bankName) {
                Vibration.vibrate();
                Alert.alert(
                    'Please select a bank',
                    '',
                    [
                        { text: 'OK' }
                    ]
                );
                setInputsValid(false);
                return;
            }
            loadingCallback && loadingCallback(true);
            const { data, error } = await fetchAcctName(value.toString(), state?.bankName);

            if (data && data.data) {
                acctNameValueCollector(data.data.account_name);
                loadingCallback && loadingCallback(false);
            }
    
            if (error){
                loadingCallback && loadingCallback(false);
                alertError(`Could not get beneficiary's name`);
            }
        }
    }
    const acctNameValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            acctName: value
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

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )
    const handleOnBlur = async ()=>{
        if (state?.acctNo && state.acctNo.toString().length === 10) {
            if (!state.bankName) {
                Vibration.vibrate();
                Alert.alert(
                    'Please select a bank',
                    '',
                    [
                        { text: 'OK' }
                    ]
                );
                setInputsValid(false);
                return;
            }
            loadingCallback && loadingCallback(true);
            const { data, error } = await fetchAcctName(state?.acctNo?.toString(), state?.bankName);

            if (data && data.data) {
                acctNameValueCollector(data.data.account_name);
                loadingCallback && loadingCallback(false);
            }
    
            if (error){
                loadingCallback && loadingCallback(false);
                alertError(`Could not get beneficiary's name`);
            }
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

    const inputs: IFormInput[] = [
        { 
            inputComponent: <BankModalField valueCollector={bankNameValueCollector} options={banks}/>,
            useCustombottomLabelComponent: true,
            label: "Bank Name",
        },
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} placeholder={'Enter Beneficiary Number'}
                valueCollector={acctNoValueCollector}
                //onBlur={handleOnBlur}
            />,
            useCustombottomLabelComponent: true,
            label: "Account Number"
        },
        { 
            inputComponent: <MainTextField editable={false} placeholder={''} 
                valueCollector={acctNameValueCollector} 
                value={state?.acctName}
                inputStyle={{ color: 'black' }}
            />,
            useCustombottomLabelComponent: true,
            label: "Account Name"
        },
        { 
            inputComponent: <MainTextField keyboardType={'phone-pad'} icon={NairaAdornment} placeholder={''}
                valueCollector={amountValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Amount"
        },
        { 
            inputComponent: <MainTextField secureTextEntry={true} keyboardType={'number-pad'} placeholder={''}
                valueCollector={pinValueCollector}
                autoCorrect={false}
                spellCheck={false}
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
            buttonText={'TRANSFER'}
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

export default ToBankAccountForm;