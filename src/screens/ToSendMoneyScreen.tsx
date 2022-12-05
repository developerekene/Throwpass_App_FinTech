import React from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StartScreenProps } from './StartScreen';
import ToSanwoPayForm, { ToSanwoFormState } from '../Components/forms/ToSanwoPayForm';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToBankAccountForm, { ToBankFormState } from '../Components/forms/ToBankAccountForm';
import { ConfirmRouteProps } from './ConfirmScreen';
import { mapBankStateToConfirmState, mapSanwoStateToConfirmState } from '../utils/FormUtils';
const LoginImage = require('../../assets/login_image.png');

const DEFAULT_IMAGE = Image.resolveAssetSource(LoginImage).uri

export interface ToSendMoneyScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params:{
            toAccount?: 'sanwopay' | 'bank';
        }
    }>
}

const ToSendMoneyScreen: React.FC<ToSendMoneyScreenProps> = ({ route, navigation })=>{

    const destination = route?.params.toAccount;

    // Handlers
    const handleBankAccountSubmit = (state?: ToBankFormState)=>{
        let confirmState = mapBankStateToConfirmState(state, '2efr45677YHt0');
        console.log(confirmState);
        navigation?.navigate('Confirm', confirmState);
    }
    const handleSawoSubmit = (state?: ToSanwoFormState)=>{
        let confirmState = mapSanwoStateToConfirmState(state);
        console.log(confirmState);
        navigation?.navigate('Confirm', confirmState);
    }

    React.useLayoutEffect(()=>{
        if (destination && destination === 'bank') {
            navigation?.setOptions({ title: 'To Bank Account' })
        }
    },[])
    
    return(
        <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.container}
                keyboardVerticalOffset={100}
            >
           <ScrollView>
                <View>
                    {   destination && destination === 'sanwopay' ?
                        <ToSanwoPayForm onSubmit={handleSawoSubmit}/> :
                        <ToBankAccountForm onSubmit={handleBankAccountSubmit}/>
                    }
                </View>
           </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: '5%',
    },

    formContainer:{
        marginTop: '10%'
    }
})

export default ToSendMoneyScreen;