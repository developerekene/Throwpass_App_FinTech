import { RouteProp } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { Alert, StyleSheet, Text, Vibration } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';
import MyButton from '../Components/elements/MyButton';
import LoadingOverlay from '../components/LoanElements/LoadingOverlay';
import { loadState, ReceiptState } from '../redux/slices/receiptSlice';
import { RootState } from '../redux/slices/store';
import { buyAirtime, buyData, payBill } from '../swr/bills';
import { transferToPersonalSavings, withdrawFromPersonalSavings } from '../swr/savings';
import { basePath, transferToBank, transferToWallet } from '../swr/transaction';
import { formatAmount } from '../utils/GeneralUtils';
import { formatReference } from '../utils/TransactionUtils';

export interface ConfirmRouteProps{
    numberLabel?: string;
    numberValue?: string;
    beneficiary?: string;
    amount?: string;
    refNum?: string;
    state?: 'wallet' | 'bank' | 'personal withdrawal' | 'bill' | 'airtime' | 'data' | 'personal savings';
    meta?: { [index: string]: string | undefined };
}

export interface ConfirmScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params: ConfirmRouteProps;
    }>
}

const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ navigation, route })=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    const numberLabel = route?.params.numberLabel || '';
    const numberValue = route?.params.numberValue || '';
    const beneficiary = route?.params.beneficiary || '';
    const amount = route?.params.amount || ''
    const refNum = route?.params.refNum || '';

    // Hooks
    const { 
        walletState, bankState, billRequest, airtimeState,
        dataSubState, personalSavingsState, personalWithdrawalState,
    } = useSelector((state: RootState)=> state.confirm);
    const { auth, cookies } = useSelector((state: RootState)=> state.auth);
    const dispatch = useDispatch();

    // swr
    const config = useSWRConfig();

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

    // Handlers
    const handleTransferToWallet = async()=>{
        const { data, error } = await transferToWallet(walletState, auth?.token, cookies);
        if (data && data.status && data.data) {
            let receiptMeta: ReceiptState = {
                "Phone Number": numberValue,
                "Reference ID": formatReference(data.data.reference),
            }
            dispatch(loadState(receiptMeta));
            setLoading(false);
            config.mutate(`${basePath}/user/profile/`, true);
            navigation?.navigate('Receipt', route?.params);
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
    const handleTransferToBank = async()=>{
        const { data, error } = await transferToBank(bankState, auth?.token, cookies);
        if (data && data.status && data.data) {
            let receiptMeta: ReceiptState = {
                "Bank": data.data.bank_name,
                "Account Number": data.data.bank_account_number,
                "Reference ID": formatReference(data.data.reference),
            }
            dispatch(loadState(receiptMeta));
            setLoading(false);
            config.mutate(`${basePath}/user/profile/`, true);
            navigation?.navigate('Receipt', route?.params);
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
    const handleBillPayment = async()=>{
        const { data, error } = await payBill(billRequest, auth?.token);
        if (data && data.status && data.data) {
            let receiptMeta: ReceiptState = {
                "Phone Number": data.data.phone_number,
                "Network": dataSubState?.operator,
                "Plan": data.data.network,
                "Reference ID": formatReference(data.data.reference),
            }
            dispatch(loadState(receiptMeta));
            setLoading(false);
            config.mutate(`${basePath}/user/profile/`, true);
            navigation?.navigate('Receipt', route?.params);
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
    const handleAirtimePayment = async()=>{
        const { data, error } = await buyAirtime(airtimeState, auth?.token);
        if (data && data.status && data.data) {
            let receiptMeta: ReceiptState = {
                "Phone Number": data.data.phone_number,
                "Network": dataSubState?.operator,
                "Plan": data.data.network,
                "Reference ID": formatReference(data.data.reference),
            }
            dispatch(loadState(receiptMeta));
            setLoading(false);
            config.mutate(`${basePath}/user/profile/`, true);
            navigation?.navigate('Receipt', route?.params);
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
    const handleDataSubscription = async()=>{
        const { data, error } = await buyData(dataSubState, auth?.token);
        if (data && data.status && data.data) {
            let receiptMeta: ReceiptState = {
                "Phone Number": data.data.phone_number,
                "Network": dataSubState?.operator,
                "Plan": data.data.network,
                "Reference ID": formatReference(data.data.reference),
            }
            dispatch(loadState(receiptMeta));
            setLoading(false);
            config.mutate(`${basePath}/user/profile/`, true);
            navigation?.navigate('Receipt', route?.params);
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

    const handlePersonalSavings = async()=>{
        const { data, error } = await transferToPersonalSavings(personalSavingsState, auth?.token);
        if (data && data.status && data.data) {
            let receiptMeta: ReceiptState = {
                "Savings Type": data.data.savings_type,
                "Reference ID": formatReference(data.data.reference),
            }
            dispatch(loadState(receiptMeta));
            setLoading(false);
            config.mutate(`${basePath}/user/profile/`, true);
            navigation?.navigate('Receipt', route?.params);
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

    const handlePersonalSavingsWithdrawal = async()=>{
        const { data, error } = await withdrawFromPersonalSavings(personalWithdrawalState, auth?.token);
        if (data && data.status && data.data) {
            let receiptMeta: ReceiptState = {
                "Type": data.data.transType,
                "Reference ID": formatReference(data.data.reference),
            }
            dispatch(loadState(receiptMeta));
            setLoading(false);
            config.mutate(`${basePath}/user/profile/`, true);
            navigation?.navigate('Receipt', route?.params);
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
    
    
    const handleConfirmPayment = async ()=>{
        if (route?.params.state) {
            setLoading(true);
            switch (route.params.state) {
                case 'wallet':
                    await handleTransferToWallet();
                    break;

                case 'bank':
                    handleTransferToBank();
                    break;

                case 'bill':
                    await handleBillPayment();
                    break;

                case 'airtime':
                    await handleAirtimePayment();
                    break;

                case 'data':
                    await handleDataSubscription();
                    break;

                case 'personal savings':
                    await handlePersonalSavings();
                    break;

                case 'personal withdrawal':
                    await handlePersonalSavingsWithdrawal();
                    break;

                default:
                    //setLoading(false);
                    break;
            }
        }
    }

    //let numberLabel = destination === 'bank' ? 'Account Number' : 'Phone Number';
    const renderMeta = ()=>{
        let displayArray: JSX.Element[] = [];
        let obj = route?.params.meta;
        if (obj) {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                    displayArray.push(
                        <View style={styles.numberDetails} key={key}>
                            <Text style={styles.numberLabel}>{key}: </Text>
                            <Text style={styles.numberValue}>{element}</Text>
                        </View>
                    )
                }
            }
        }
        return displayArray;
    }

    const amountCircle = (
        <View style={styles.circle}>
            <View>
                <View>
                    <Text style={styles.amountText}> ₦{formatAmount(amount)} </Text>
                </View>
                <View>
                    <Text style={styles.subtext}> Amount </Text>
                </View>
            </View>
        </View>
    )

    const beneDetails = (
        <View style={styles.beneDetails}>
            <View>
                <Text style={styles.beneNameText}>{beneficiary}</Text>
            </View>
            {/** Phone number */}
            <View style={styles.numberDetails}>
                <Text style={styles.numberLabel}>{numberLabel} </Text>
                <Text style={styles.numberValue}>{numberValue}</Text>
            </View>
            { renderMeta() }

            {/** Reference No */}
            {/* <View style={styles.numberDetails}>
                <Text style={styles.numberLabel}>Reference No: </Text>
                <Text style={styles.numberValue}>{refNum}</Text>
            </View> */}
        </View>
    )
    
    return(
        <View style={styles.container}>
            <LoadingOverlay visible={loading}/>
            <View>
                <View style={styles.circleArea}>
                    {amountCircle}
                </View>
                {beneDetails}
            </View>

            <MyButton text="CONFIRM PAYMENT" onPress={handleConfirmPayment}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: '10%',
        backgroundColor: '#FCFCFC',
    },

    main:{
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'red',
        flex: 1,
        height: '100%'
    },

    circle:{
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circleArea:{
        alignItems: 'center',
        elevation: 4,
    },

    amountText:{
        fontWeight: '600',
        fontSize: 18,
        letterSpacing: 0.75,
        lineHeight: 28,
        color: 'black',
        textAlign: 'center'
    },

    subtext:{
        textAlign: 'center',
        color: '#6E7191',
        fontWeight: '600',
        lineHeight: 28,
        fontSize: 14,
        letterSpacing: 0.75,

    },

    beneDetails:{
        marginTop: '15%'
    },

    beneNameText:{
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
        color: '#6E7191',
        fontSize: 18,
    },

    numberDetails:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    numberLabel:{
        fontWeight: '500',
        lineHeight: 28,
        letterSpacing: 0.75,
        color: '#6E7191',
        fontSize: 14,
    },
    numberValue:{
        fontWeight: '400',
        lineHeight: 28,
        letterSpacing: 0.75,
        color: '#6E7191',
        fontSize: 14,
    },
})


export default ConfirmScreen;