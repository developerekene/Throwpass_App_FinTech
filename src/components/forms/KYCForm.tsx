import React from 'react';
import { Alert, StyleSheet, Vibration, View } from 'react-native';
import Form, { IFormInput } from '../elements/Form';
import { isEmpty } from '../../utils/FormUtils';
import ChipSvg from '../../icons/chip';

export interface KycFormState{
    bvn?: string
}

export interface KycFormProps{
    onSubmit?: (arg?: KycFormState)=> any;
}

const KycForm: React.FC<KycFormProps> = ({
    onSubmit
})=>{

        // State
        const [state, setState] = React.useState<KycFormState>();
        const [inputsValid, setInputsValid] = React.useState<boolean>(false);

        // Value collectors
        const bvnValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                bvn: value
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
                setInputsValid(false);
                return;
            }
            for (const key in obj) {
                console.log(key);
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
            console.log(obj);
            setInputsValid(true);
        }

        // Handlers
        const handleSubmit = () =>{
            console.log(inputsValid);
            // Validate the inputs
            validateInputs(state);
            
            if (inputsValid) {
                onSubmit && onSubmit(state);
            }
        }

    const inputs: IFormInput[] = [
        { 
            label: "Bank Verification Number", 
            placeholder: 'BVN',
            icon: <ChipSvg/>,
            useDefaultAdornment: true,
            valueCollector: bvnValueCollector,
        },
    ];


    return(
        <Form 
            inputs={inputs}
            labelStyle={styles.topLabel}
            buttonStyle={{
                marginTop: 10
            }}
            buttonText={'UPDATE'}
            onSubmit={handleSubmit}
        />
    )
}

const styles = StyleSheet.create({
    topLabel:{
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: 0.75,
    },
})

export default KycForm;