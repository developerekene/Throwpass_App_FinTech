import { background } from "native-base/lib/typescript/theme/styled-system";
import React from "react";
import { GestureResponderEvent, KeyboardTypeOptions, StyleSheet, Text, TextInputProps, View } from "react-native";
import ExpiryTextField, { ExpiryTextFieldProps } from "./ExpiryTextField";
import MainTextField from "./MainTextField";
import TextField, { TextFieldProps } from "./TextField";

export interface  ExpiryWithCvvTextDisplayProps extends ExpiryTextFieldProps{
    expiryDateValueCollector?: (expMonth: string, expYear: string) => any;
    cvvValueCollector?: (value: string) => any;
}

const ExpiryWithCvvTextDisplay: React.FC<ExpiryWithCvvTextDisplayProps> = ({ 
    expiryDateValueCollector, cvvValueCollector,
    ...props 
})=>{

    // const [expMonth, setExpMonth] = React.useState<string>('');
    // const [expYear, setExpYear] = React.useState<string>('');

    // // Handlers
    // const onMonthChange = (value: any)=>{
    //     setExpMonth(value);
    //     valueCollector && valueCollector(value, expYear);
    // }
    // const onYearChange = (value: any)=>{
    //     setExpYear(value);
    //     valueCollector && valueCollector(expMonth, value);
    // }


    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.topLabel}>Expiry Date</Text>
                <ExpiryTextField valueCollector={expiryDateValueCollector}/>
            </View>
            <View>
                <Text style={styles.topLabel}>CVV</Text>
                <MainTextField editable={false} placeholder={''}
                    keyboardType={'phone-pad'}
                    valueCollector={cvvValueCollector}
                    maxLength={3}
                    containerStyle={{ width: '25%' }} 
                />,
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between'
    },

    topLabel:{
        color: '#6E7191',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: 0.75,
    },
})

export default ExpiryWithCvvTextDisplay;