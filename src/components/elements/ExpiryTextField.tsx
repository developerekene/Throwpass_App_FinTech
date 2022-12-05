import { background } from "native-base/lib/typescript/theme/styled-system";
import React from "react";
import { GestureResponderEvent, KeyboardTypeOptions, StyleSheet, Text, TextInputProps, View } from "react-native";
import MainTextField from "./MainTextField";
import TextField, { TextFieldProps } from "./TextField";

export interface ExpiryTextFieldProps extends TextInputProps {
    valueCollector?: (expMonth: string, expYear: string) => any;
}

const ExpiryTextField: React.FC<ExpiryTextFieldProps> = ({ valueCollector, ...props })=>{

    const [expMonth, setExpMonth] = React.useState<string>('');
    const [expYear, setExpYear] = React.useState<string>('');

    // Handlers
    const onMonthChange = (value: any)=>{
        setExpMonth(value);
        valueCollector && valueCollector(value, expYear);
    }
    const onYearChange = (value: any)=>{
        setExpYear(value);
        valueCollector && valueCollector(expMonth, value);
    }


    return(
        <View style={styles.container}>
            <MainTextField
                keyboardType={'phone-pad'} 
                placeholder={'MM'}
                autoCorrect={false}
                spellCheck={false}
                clearTextOnFocus={false}
                maxLength={2}
                valueCollector={onMonthChange}
                inputStyle={styles.textField}
                containerStyle={styles.fieldContainer}
                {...props}
            />
           <View>
            <Text style={styles.text}>/</Text>
           </View>
            <MainTextField
                keyboardType={'phone-pad'} 
                placeholder={'YY'}
                autoCorrect={false}
                spellCheck={false}
                clearTextOnFocus={false}
                maxLength={2}
                valueCollector={onYearChange}
                inputStyle={styles.textField}
                containerStyle={styles.fieldContainer}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        //width: '45%',
    },

    fieldContainer:{
        flex: 1
    },

    textField:{
        textAlign: 'center'
    },

    text:{
        fontSize: 24
    },
})

export default ExpiryTextField;