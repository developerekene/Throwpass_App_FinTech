import React, { ReactNode } from 'react';
import { 
    StyleProp, StyleSheet, TextInput, 
    TextInputProps, 
    TextStyle, View, ViewStyle,
    Platform, 
    Pressable,
    Animated
} from 'react-native';
import CloseSvg from '../../icons/close';

export interface TextFieldProps extends TextInputProps{
    inputStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    adornmentStyle?: StyleProp<ViewStyle>;
    endAdornment?: ReactNode;
    onAdornmentPress?: (arg: any)=> any;
    useDefaultAdornment?: boolean;
    valueCollector?: (value: any) => any;
}

const TextField: React.FC<TextFieldProps> = ({ 
    style, inputStyle, useDefaultAdornment, adornmentStyle,
    underlineColorAndroid = 'transparent',
    placeholder = 'Type something',
    icon, endAdornment, onAdornmentPress,
    valueCollector, value, ...props
})=>{

    const [text, setText] = React.useState<string>('');

    const handleChangeText = (text: string) =>{
        setText(text);
        valueCollector && valueCollector(text);
    }

    const handleDefaultAdornmentPress = ()=>{
        setText('');
        valueCollector && valueCollector('');
    }

    // Effect for value
    React.useEffect(()=>{
        if (value) {
            setText(value);
        }
    }, [value]);


    return(
        <Animated.View style={[styles.inputContainer, style]}>
            {
                icon && <View style={[styles.iconView, adornmentStyle]}>{icon}</View>
            }
            <TextInput
                style={[styles.input, inputStyle]}
                underlineColorAndroid={underlineColorAndroid}
                placeholder={placeholder}
                placeholderTextColor='#A0A3BD'
                value={text}
                onChangeText={handleChangeText}
                {...props}
            />
            {  
                endAdornment &&
                <Pressable onPress={onAdornmentPress}>
                    {
                        ({ pressed })=>{
                            let pressedStyle: StyleProp<TextStyle> = {
                                opacity: 0.5
                            }
            
                            let style = pressed ? pressedStyle : null;

                            return(
                                endAdornment
                            )
                        }
                    }
                </Pressable>

            }
            {
                !endAdornment && useDefaultAdornment &&
                <Pressable onPress={handleDefaultAdornmentPress}>
                    {
                        ({ pressed })=>{
                            let pressedStyle: StyleProp<TextStyle> = {
                                opacity: 0.5
                            }
            
                            let style = pressed ? pressedStyle : null;

                            return(
                                <CloseSvg/>
                            )
                        }
                    }
                </Pressable>
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: Platform.OS === 'ios'? 15 : 3,
        paddingHorizontal: 10,
        borderColor: '#D6D8E7',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 8,
        alignItems: 'center'
    },

    input:{
        flex: 1,
        fontSize: 16,
    },

    iconView:{
        paddingRight: 8
    },

    adornment:{
        flex: 1
    }
});

export default TextField;