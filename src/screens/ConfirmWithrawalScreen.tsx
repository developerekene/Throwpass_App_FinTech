import { RouteProp } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { Alert, StyleSheet, Text, Vibration } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import MyButton from '../Components/elements/MyButton';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
// import { RootState } from '../redux/store';
import { RootState } from '../redux/slices/store';

import { withdrawFromPersonalSavings } from '../swr/savings';
import { ConfirmScreenProps } from './ConfirmScreen';


const ConfirmWithdrawalScreen: React.FC<ConfirmScreenProps> = ({ navigation, route })=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    const numberLabel = route?.params.numberLabel || 'Phone Number';
    const numberValue = route?.params.numberValue || '';
    const beneficiary = route?.params.beneficiary || '';
    const amount = route?.params.amount || ''
    const refNum = route?.params.refNum || '';

    // Hooks
    const { personalWithdrawalState } = useSelector((state: RootState)=> state.confirm);
    const { auth, cookies } = useSelector((state: RootState)=> state.auth);

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
    const handlePersonalWithdrawal = async()=>{
        const { data, error } = await withdrawFromPersonalSavings(
            personalWithdrawalState, auth?.token,
        )
        if (data && data.status) {
            setLoading(false);
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
                case 'personal withdrawal':
                    handlePersonalWithdrawal();
                    break;
            
                default:
                    break;
            }
        }
    }

    //let numberLabel = destination === 'bank' ? 'Account Number' : 'Phone Number';

    const amountCircle = (
        <View style={styles.circle}>
            <View>
                <View>
                    <Text style={styles.amountText}> ₦{amount} </Text>
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
                <Text style={styles.numberLabel}>{numberLabel}: </Text>
                <Text style={styles.numberValue}>{numberValue}</Text>
            </View>

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

            <MyButton text="CONFIRM WITHDRAWAL" onPress={handleConfirmPayment}/>
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


export default ConfirmWithdrawalScreen;