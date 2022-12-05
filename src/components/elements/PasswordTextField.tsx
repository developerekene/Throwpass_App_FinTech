import React from "react";
import { GestureResponderEvent, KeyboardTypeOptions, TextInputProps } from "react-native";
import EyeOffOutlineSvg from "../../icons/eye-off-outline";
import EyeOutlineSvg from "../../icons/eye-outline";
import PadlockSvg from "../../icons/padlock";
import TextField, { TextFieldProps } from "./TextField";

export interface PasswordTextFieldProps extends TextInputProps {
    valueCollector?: (value: any) => any;
}

const PasswordTextField: React.FC<TextFieldProps> = (props)=>{

    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

    const handleAdornmentPress = (event: GestureResponderEvent)=>{
        setSecureTextEntry(!secureTextEntry);
    }

    return(
        <TextField
            keyboardType={'default'} 
            icon={<PadlockSvg/>}
            endAdornment={<EyeOutlineSvg/>}
            placeholder={'Password'}
            secureTextEntry={secureTextEntry}
            autoCorrect={false}
            spellCheck={false}
            onAdornmentPress={handleAdornmentPress}
            clearTextOnFocus={false}
            {...props}
        />
    )
}

export default PasswordTextField;