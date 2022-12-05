import React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TextInputKeyPressEventData, View } from 'react-native';


const OTPInput: React.FC<any> = ()=>{

    const pin1ref = React.createRef<TextInput>();
    const pin2ref = React.createRef<TextInput>();
    const pin3ref = React.createRef<TextInput>();
    const pin4ref = React.createRef<TextInput>();

    type State = {
        pin1?: string;
        pin2?: string;
        pin3?: string;
        pin4?: string;
    }

    let initState: State = {
        pin1: '',
        pin2: '',
        pin3: '',
        pin4: '',
    }
    const [state, setState] = React.useState<State>(initState);

    React.useEffect(()=>{
        pin1ref.current?.focus();
    }, [])

    const forwardAutoFocus = (name: string)=>{
        switch (name) {
            case 'pin1':
                state[name] === ''? pin2ref.current?.focus() : ''
                break;
            
            case 'pin2':
                state[name] === ''? pin3ref.current?.focus() : ''
                break;

            case 'pin3':
                state[name] === ''? pin4ref.current?.focus() : ''
                break;
        
            default:
                break;
        }
    }

    const backwardAutoFocus = (name: string)=>{
        switch (name) {
            case 'pin2':
                pin1ref.current?.focus();
                break;
            
            case 'pin3':
                pin2ref.current?.focus();
                break;

            case 'pin4':
                pin3ref.current?.focus();
                break;
        
            default:
                break;
        }
    }

    const handleKeyPress = (keyValue: string , name: string)=>{
        if (keyValue === 'Backspace') {
            backwardAutoFocus(name);
        }
    }

    const handlePinChange = (pinInput: string, 
        name: string)=>{
        
            setState((prevState)=>({
                ...prevState,
                [name]: pinInput
            }));
            forwardAutoFocus(name);

    }

    return(
        <View style={styles.container}>
            <TextInput
                ref={pin1ref}
                value={state.pin1}
                maxLength={1}
                onChangeText={(pin)=> handlePinChange(pin, 'pin1')}
                onKeyPress={({ nativeEvent: { key: keyValue } })=> handleKeyPress(keyValue, 'pin1')}
                style={styles.textInput}
                keyboardType='numeric'
            />
            <TextInput
                ref={pin2ref}
                value={state.pin2}
                maxLength={1}
                onChangeText={(pin)=> handlePinChange(pin, 'pin2')}
                onKeyPress={({ nativeEvent: { key: keyValue } })=> handleKeyPress(keyValue, 'pin2')}
                style={styles.textInput}
                keyboardType='numeric'
            />
            <TextInput
                ref={pin3ref}
                value={state.pin3}
                maxLength={1}
                onChangeText={(pin)=> handlePinChange(pin, 'pin3')}
                onKeyPress={({ nativeEvent: { key: keyValue } })=> handleKeyPress(keyValue, 'pin3')}
                style={styles.textInput}
                keyboardType='numeric'
            />
            <TextInput
                ref={pin4ref}
                value={state.pin4}
                maxLength={1}
                onChangeText={(pin)=> handlePinChange(pin, 'pin4')}
                onKeyPress={({ nativeEvent: { key: keyValue } })=> handleKeyPress(keyValue, 'pin4')}
                style={styles.textInput}
                keyboardType='numeric'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInput:{
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#6E7191',
        flex: 0.15,
        textAlign: 'center'
    }
});

export default OTPInput;