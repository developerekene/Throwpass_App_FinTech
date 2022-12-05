import React from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StartScreenProps } from './StartScreen';
import ToSanwoPayForm, { ToSanwoFormState } from '../Components/forms/ToSanwoPayForm';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToBankAccountForm, { ToBankFormState } from '../Components/forms/ToBankAccountForm';
import { ConfirmRouteProps } from './ConfirmScreen';
import { mapBankStateToConfirmState, mapSanwoStateToConfirmState } from '../utils/FormUtils';
import DismissKeyboard from '../Components/DismissKeyboard';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import { loadSanwoState } from '../redux/slices/confirmSlice';
import { useDispatch } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useHeaderHeight } from '@react-navigation/elements';
const LoginImage = require('../../assets/login_image.png');

const DEFAULT_IMAGE = Image.resolveAssetSource(LoginImage).uri

export interface ScanParams{
    value?: string;
    fromScan: boolean;
}

export interface ToSanwoPayScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params?: ScanParams
    }>
}

const ToSanwoPayScreen: React.FC<ToSanwoPayScreenProps> = ({ route, navigation })=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Hooks
    const dispatch = useDispatch();

    // Route parameter
    const fromScan = route?.params?.fromScan;
    const phoneNumber = route?.params?.value;

    // Handlers
    const handleSawoSubmit = (state?: ToSanwoFormState)=>{
        if (state) {
            dispatch(loadSanwoState(state))
            let confirmState = mapSanwoStateToConfirmState(state);
            console.log(confirmState);
            navigation?.navigate('Confirm', confirmState);
        }
    }

    if (Platform.OS === 'ios') {
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.container}
                keyboardVerticalOffset={getStatusBarHeight() + useHeaderHeight()}
            >
                <LoadingOverlay visible={loading} />
                <ScrollView>
                    <View>
                        <ToSanwoPayForm onSubmit={handleSawoSubmit} loadingCallback={setLoading}
                            fromScan={fromScan} phoneNumber={phoneNumber}
                        />
                    </View>
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }
    
    return(
        <DismissKeyboard>
           <View style={styles.container}>
           <LoadingOverlay visible={loading} />
            <ScrollView>
                <View>
                    <ToSanwoPayForm onSubmit={handleSawoSubmit} loadingCallback={setLoading}
                        fromScan={fromScan} phoneNumber={phoneNumber}
                    />
                </View>
            </ScrollView>
           </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 10,
        flexDirection: 'column',
        //justifyContent: 'center',
        paddingVertical: '5%',
    },

    formContainer:{
        marginTop: '10%'
    }
})

export default ToSanwoPayScreen;