import React from 'react';
import { 
    Alert,
    StyleSheet, 
    Text,
    Vibration,
    View, 
} from 'react-native';
import { fetchName } from '../../swr/profile';
import { isEmpty } from '../../utils/FormUtils';
import Form, { IFormInput } from '../elements/Form';
import MainTextField from '../elements/MainTextField';
import LoadingOverlay from '../LoanElements/LoadingOverlay';


export interface ToSanwoFormState{
    phoneNumber?: string;
    fullName?: string;
    amount?: string | number
    pin?: string | number;
}

export interface ToSanwoPayFormProps{
    onSubmit?: (arg?: ToSanwoFormState)=> any;
    loadingCallback?: (isloading: boolean)=> any;
    phoneNumber?: string;
    fromScan?: boolean;
}

const ToSanwoPayForm: React.FC<ToSanwoPayFormProps> = ({
    onSubmit, loadingCallback, phoneNumber, fromScan
})=>{

    // Naira Adornment
    const NairaAdornment = (
        <Text style={styles.amount}>₦</Text>
    )

    // State
    const [state, setState] = React.useState<ToSanwoFormState>({
        phoneNumber: '',
        fullName: '',
        amount: '',
        pin: '',
    });
    const [inputsValid, setInputsValid] = React.useState<boolean>(false);

    // Value collectors
    const fullNameValueCollector = (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            fullName: value
        }))
    }

    const phoneNumberValueCollector = async (value: any) =>{
        setState((prevState)=>({
            ...prevState,
            phoneNumber: value
        }));

        if (value && value.toString().length === 11){
            loadingCallback && loadingCallback(true);
            const { data, error } = await fetchName(value)
            
            if (data) {
                fullNameValueCollector(data.data.name);
                loadingCallback && loadingCallback(false);
            }

            if (error){
                loadingCallback && loadingCallback(false);
                alertError(`Could not get beneficiary's name`);
            }
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

    // Handlers
    const handleSubmit = () =>{
        console.log(state);
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
    const handleOnBlur = async ()=>{
        if (state?.phoneNumber && state.phoneNumber.toString().length === 11){
            loadingCallback && loadingCallback(true);
            const { data, error } = await fetchName(state?.phoneNumber)
            
            if (data) {
                fullNameValueCollector(data.data.name);
                loadingCallback && loadingCallback(false);
            }

            if (error){
                loadingCallback && loadingCallback(false);
                alertError(`Could not get beneficiary's name`);
            }
        }
    }

    const populateName = async (phoneNumber: string | number)=>{
        loadingCallback && loadingCallback(true);
        const { data, error } = await fetchName(phoneNumber.toString())
        
        if (data) {
            fullNameValueCollector(data.data.name);
            loadingCallback && loadingCallback(false);
        }

        if (error){
            loadingCallback && loadingCallback(false);
            alertError(`Could not get beneficiary's name`);
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
        return true;
    }

    const inputs: IFormInput[] = [
        { 
            inputComponent: <MainTextField placeholder={'Enter Number'} keyboardType={'phone-pad'}
                valueCollector={phoneNumberValueCollector} 
                //onBlur={handleOnBlur}
                editable={fromScan}
                value={state?.phoneNumber}
            />,
            useCustombottomLabelComponent: true,
            label: "Phone Number"
        },
        { 
            inputComponent: <MainTextField editable={false} placeholder={''}
                value={state?.fullName}
                valueCollector={fullNameValueCollector}
                inputStyle={{ color: 'black' }} 
            />,
            useCustombottomLabelComponent: true,
            label: "Full Name"
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
            keyboardType={'number-pad'} placeholder={''} 
                autoCorrect={false}
                spellCheck={false}
                valueCollector={pinValueCollector}
            />,
            useCustombottomLabelComponent: true,
            label: "Pin"
        },

    ];

    // Effect for phone number from scan
    React.useEffect(()=>{
        if (phoneNumber) {
            phoneNumberValueCollector(phoneNumber);
            populateName(phoneNumber);
        }
    }, [phoneNumber]);


    return(
        <React.Fragment>
            <Form 
            inputs={inputs}
            labelStyle={styles.topLabel}
            buttonStyle={{
                marginTop: 20
            }}
            buttonText={'TRANSFER'}
            onSubmit={handleSubmit}
        />
        </React.Fragment>
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

export default ToSanwoPayForm;