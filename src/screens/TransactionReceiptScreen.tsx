import { RouteProp } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { Alert, Pressable, StyleProp, StyleSheet, Text, TextStyle, Vibration } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import { ReceiptState } from '../redux/slices/receiptSlice';
import { loadReceipt } from '../redux/slices/shareSlice';
import { RootState } from '../redux/slices/store';
import { TransactionHistoryResponseData } from '../types/responses';
import { formatAmount, formatDate } from '../utils/GeneralUtils';
import { createPDF, formatReference, generateReceiptHtml } from '../utils/TransactionUtils';
import { ConfirmScreenProps } from './ConfirmScreen';
import { ReceiptPrintScreenParams } from './ReceiptPrintScreen';

export interface TransactionReceiptScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params?: TransactionHistoryResponseData
    }>
}

const TransactionReceiptScreen: React.FC<TransactionReceiptScreenProps> = ({ navigation, route })=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Hooks
    const dispatch = useDispatch();

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

    const handlePrint = async ()=>{
        setLoading(true);
        try {
            let pdf = await createPDF({
                html: generateReceiptHtml(
                    route?.params?.to_user || route?.params?.bank_account_name || route?.params?.user,
                    route?.params?.amount,
                    route?.params
                ),
                fileName: route?.params?.reference,
                //directory: 'Documents'
            })
    
            if (pdf) {
                dispatch(loadReceipt(pdf.filePath|| ''));
                let printParams: ReceiptPrintScreenParams = {
                    uri: pdf.filePath,
                }
                setLoading(false);
                navigation?.navigate('ReceiptPrint', printParams)
            }
            else{
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            alertError('An error occured while printing the receipt')
        }
    }

    const renderMeta = (obj?: TransactionHistoryResponseData)=>{
        let displayArray: JSX.Element[] = [];
        let keysToExclude = ['amount', 'to_user'];
        if (obj) {
            let info: ReceiptState = {
                'Type': obj.transType,
                'Bank': obj.bank_name,
                'Account number': obj.bank_account_number,
                'Date': formatDate(new Date(obj.date)),
                'Reference ID': obj.reference //formatReference(obj.reference),
            }
            for (const key in info) {
                if (Object.prototype.hasOwnProperty.call(info, key)) {
                    const element = info[key];
                    if (element) {
                        displayArray.push(
                            <View style={styles.numberDetails} key={key}>
                                <Text style={styles.numberLabel}>{key}: </Text>
                                <Text style={styles.numberValue}>{element}</Text>
                            </View>
                        )
                    }
                }
            }
        }

        return displayArray;
    }

    const beneDetails = (
        <View style={styles.beneDetails}>
            <View>
                <Text style={styles.beneNameText}>
                    {route?.params?.to_user || route?.params?.bank_account_name || route?.params?.user}
                </Text>
            </View>

            {/** Meta */}
            { renderMeta(route?.params) }
            
            {/** Amount */}
            <View style={styles.numberDetails}>
                <Text style={styles.amountLabel}>Amount: </Text>
                <Text style={styles.amountLabel}>₦ {formatAmount(route?.params?.amount.toString() || '')}</Text>
            </View>

        </View>
    )


    const printButton = (
        <Pressable
                style={styles.pressable} onPress={handlePrint}
            >
                {({ pressed }) => {
                    let pressedStyle: StyleProp<TextStyle> = {
                        opacity: 0.5
                    }
    
                    let style = pressed ? pressedStyle : null;
    
                    return(
                        <Text style={[styles.bottomLabel, style]}>
                            PRINT
                        </Text>
                )}}
            </Pressable>
    )
    
    return(
        <View style={styles.container}>
            <LoadingOverlay visible={loading}/>
            <View>
                {beneDetails}
            </View>
            <View>
                { printButton }
            </View>
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

    pressable:{
        marginTop: 10,
        alignSelf: 'flex-end',
    },

    bottomLabel:{
        textAlign: 'right',
        color: '#0122AE',
        fontSize: 16,
    },
    
    amountLabel:{
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
        color: '#14142B',
        fontSize: 14,
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


export default TransactionReceiptScreen;