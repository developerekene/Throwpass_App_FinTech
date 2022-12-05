import React from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, Alert, Vibration } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import TopUpWalletForm, { TopUpWalletFormState } from '../Components/forms/TopUpWalletForm';
import AddBalanceForm, { AddBalanceFormState } from '../Components/forms/AddBalanceForm';
import PaymentWebView from '../Components/LoanElements/PaymentWebView';
import { topUpWallet } from '../swr/wallet';
import { RootState } from '../redux/slices/store';
import ToastContext from '../components/context/ToastContext';
const LoginImage = require('../../assets/login_image.png');

const DEFAULT_IMAGE = Image.resolveAssetSource(LoginImage).uri

export interface ScanParams{
    value?: string;
    fromScan: boolean;
}

export interface TopUpWalletScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<any>
}

const TopUpWalletScreen: React.FC<TopUpWalletScreenProps> = ({ route, navigation })=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [uri, setUri] = React.useState<string>('');
    const [amount, setAmount] = React.useState<string>();
    const { auth } = useSelector((state: RootState)=> state.auth);

    // Hooks
    const dispatch = useDispatch();

    // Context
    const showToast = React.useContext(ToastContext);
    

    // Handlers
    // const handleTopUpSubmit = (state?: TopUpWalletFormState)=>{
    //     if (state) {
    //         console.log(state);
    //         //dispatch(loadSanwoState(state))
    //         //let confirmState = mapSanwoStateToConfirmState(state, '2efr45677YHt0');
    //         //console.log(confirmState);
    //         //navigation?.navigate('Confirm', confirmState);
    //     }
    // }
    
    // Error alert
    const alertError = (message: string = 'An unknown error occurred')=>{
        Vibration.vibrate();
        Alert.alert(
            'Error',
            message,
            [
                { text: 'OK' }
            ]
        );
    }
    const handleTopUpSubmit = async (state?: AddBalanceFormState)=>{
        if (state) {
            setAmount(state.amount);
            setLoading(true);
            const { data, error } = await topUpWallet(state, auth?.token);
            if (data && data.status && data.data) {
                setUri(data.data.link);
                setLoading(false);
                setOpen(true);
            }
            if (error) {
                console.log('Error');
                setLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    alertError(error.response.data.message);
                }
                else{
                    alertError();
                }
            }
        }
    }

    const handleSuccess = (reference: string, transaction_id: string)=>{
        let receiptParams = {
            amount: amount,
            refNum: reference,
            transaction_id: transaction_id
        }
        console.log(receiptParams);
        setOpen(false);
        navigation?.navigate((route?.params?.redirectScreen || 'TopUpReceipt'), receiptParams);
    }

    const handleOnClose = ()=>{
        setOpen(false);
    }

    const handleFailed = (reference: string)=>{
        setOpen(false);
        showToast && showToast('error', 'Transaction failed');
    }
    
    return(
        <DismissKeyboard>
           <View style={styles.container}>
           <LoadingOverlay visible={loading} />
           <PaymentWebView open={open} uri={uri}
                onClose={handleOnClose} onPaymentSuccess={handleSuccess}
                onPaymentFailed={handleFailed}
           />
            <ScrollView>
                <View>
                    {/* <TopUpWalletForm onSubmit={handleTopUpSubmit}/> */}
                    <AddBalanceForm onSubmit={handleTopUpSubmit}/>
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

export default TopUpWalletScreen;