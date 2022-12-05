import React from "react";
import { GestureResponderEvent, KeyboardTypeOptions, TextInputProps } from "react-native";
import EyeOffOutlineSvg from "../../icons/eye-off-outline";
import EyeOutlineSvg from "../../icons/eye-outline";
import PadlockSvg from "../../icons/padlock";
import MainTextField, { MainTextFieldProps } from "./MainTextField";
import TextField, { TextFieldProps } from "./TextField";

export interface PasswordTextFieldProps extends MainTextFieldProps {
    valueCollector?: (value: any) => any;
}

const MainPasswordTextField: React.FC<MainTextFieldProps> = (props)=>{

    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

    const handleAdornmentPress = (event: GestureResponderEvent)=>{
        setSecureTextEntry(!secureTextEntry);
    }

    return(
        <MainTextField
            keyboardType={'default'} 
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

export default MainPasswordTextField;