import React from 'react';
import { GestureResponderEvent, KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
//  import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { mapTypeToKeyboardType } from '../../utils/FormUtils';
import MyButton from './MyButton';
import TextField, { TextFieldProps } from './TextField';


/**
 * Information on KeyboardOptions
 * https://infinitbility.com/how-to-set-keyboard-type-in-react-native
 */
export interface IFormInput extends TextFieldProps{
    type?: KeyboardTypeOptions | 'password';
    icon?: React.ReactNode;
    endAdornment?: React.ReactNode;
    placeholder?: string;
    label?: string;
    bottomLabel?: string;
    useCustombottomLabelComponent?: boolean;
    onAdornmentPress?: (arg: any)=> any;
    useDefaultAdornment?: boolean;
    inputComponent?: React.ReactNode;
    valueCollector?: (value: any) => any;
    value?: any;
}

export interface FormProps{
    onSubmit?: (event: GestureResponderEvent) => void;
    buttonText?: string;
    buttonComponent?: React.ReactNode;
    bottomLabelComponent?: React.ReactNode;
    footerComponent?: React.ReactNode;
    labelStyle?: StyleProp<TextStyle>;
    bottomLabelStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    inputs?: IFormInput[];
}

const Form: React.FC<FormProps> = ({ 
    buttonComponent, inputs, labelStyle,
    buttonStyle, bottomLabelComponent,
    footerComponent, onSubmit, 
    buttonText = 'LOG IN',
})=>{

    return(
        <View>
            {   /** List of inputs */
                inputs?.map((input, index)=>{
                    const { 
                        type, icon, endAdornment,
                        placeholder,label, bottomLabel,
                        inputComponent, onAdornmentPress,
                        useCustombottomLabelComponent,
                        useDefaultAdornment, valueCollector, value,
                        ...inputProps
                    } = input;
                    
                    let keyType = (type !== 'password') ? type : 'default';
                    let secureTextEntry = (type === 'password') ? true : false;
               
                    return(
                        <View style={styles.formInput} key={`fi${index}`}>
                            {label && <Text style={labelStyle}>{label}</Text> }
                            { inputComponent }
                            { !inputComponent && <TextField
                               keyboardType={keyType || 'default'} 
                               icon={icon}
                               endAdornment={endAdornment}
                               placeholder={placeholder}
                               secureTextEntry={secureTextEntry}
                               autoCorrect={false}
                               spellCheck={false}
                               onAdornmentPress={onAdornmentPress}
                               useDefaultAdornment={useDefaultAdornment}
                               valueCollector={valueCollector}
                               value={value}
                               {...inputProps}

                            />}
                            { useCustombottomLabelComponent && bottomLabelComponent }
                            {
                                bottomLabel && !bottomLabelComponent &&
                                <Text style={styles.bottomLabel}>
                                    {bottomLabel}
                                </Text>
                            }
                        </View>
                    )
                })
            }

            {/** Button */}
            { !buttonComponent && <MyButton text={buttonText} style={buttonStyle} onPress={onSubmit} />}
            { buttonComponent }

            {/** Optional Footer Section */}
            {footerComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    formInput:{
        marginBottom: 20
    },

    adjacent:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    label:{},

    bottomLabel:{
        paddingTop: 10,
        textAlign: 'right',
        color: '#6E7191',
        letterSpacing: 0.75,
    },

})

export default Form;