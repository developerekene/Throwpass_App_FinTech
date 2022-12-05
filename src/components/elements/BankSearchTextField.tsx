import React from "react";
import { GestureResponderEvent, KeyboardTypeOptions, Pressable, StyleProp, StyleSheet, TextInputProps, TextStyle, View } from "react-native";
import TextField, { TextFieldProps } from "./TextField";
import Icon from 'react-native-vector-icons/EvilIcons';

const SearchIcon = <Icon name='search' color="#6E7191" size={20} />

const BankSearchTextField: React.FC<TextFieldProps> = (props)=>{

    return(
        <TextField
            keyboardType={'default'} 
            icon={SearchIcon}
            placeholder={'Search Bank'}
            autoCorrect={false}
            spellCheck={false}
            clearTextOnFocus={false}
            style={styles.input}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
    },

    right:{
        backgroundColor: '#0122AE' ,
        padding: 8,
        borderRadius: 8,
        color: 'white',
    }
})

export default BankSearchTextField;