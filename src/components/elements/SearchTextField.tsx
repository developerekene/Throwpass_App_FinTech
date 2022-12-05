import React from "react";
import { GestureResponderEvent, KeyboardTypeOptions, Pressable, StyleProp, StyleSheet, TextInputProps, TextStyle, View } from "react-native";
import TextField from "./TextField";
import Icon from 'react-native-vector-icons/EvilIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

const SearchIcon = <Icon name='search' color="#6E7191" size={20} />
const RightArrowIcon =( 
    <AntIcon 
        name="arrowright" 
        size={20} 
        style={{
            color: 'white',
        }} 
    />)

    export interface SearchTextFieldProps extends TextInputProps{
        onSubmit?: (event: GestureResponderEvent) => void
    }

const SearchTextField: React.FC<SearchTextFieldProps> = ({ onSubmit })=>{

    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

    const handleAdornmentPress = ()=>{
        setSecureTextEntry(!secureTextEntry);
    }

    const endAdornment = (
        <Pressable onPress={onSubmit}>
        {
            ({ pressed })=>{
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[styles.right, style]}>
                        { RightArrowIcon }
                    </View>
                )
            }
        }
        </Pressable>
    )


    return(
        <TextField
            keyboardType={'default'} 
            icon={SearchIcon}
            placeholder={'Search User'}
            autoCorrect={true}
            spellCheck={true}
            clearTextOnFocus={false}
            style={styles.input}
            endAdornment={endAdornment}
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

export default SearchTextField;