import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ToastContext from '../components/context/ToastContext';
import { verifyPayment } from '../swr/wallet';
import { formatAmount } from '../utils/GeneralUtils';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';

export interface TopUpReceiptScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params?: { 
            amount?: string;
            refNum?: string;
            transaction_id?: string;
        }
    }>
}
const TopUpReceiptScreen: React.FC<TopUpReceiptScreenProps> = ({ navigation, route })=>{

    const amount = route?.params?.amount || '0';
    const refNum = route?.params?.refNum || '';
    const transaction_id = route?.params?.transaction_id || '';

    // Context
    const showToast = React.useContext(ToastContext);

    // State
    const [isVerified, setIsVerified] = React.useState<boolean>(false);
    const [verificationComplete, setVerificationComplete] = React.useState<boolean>(false);


    // Handlers
    const handleClose = ()=>{
        navigation?.navigate('Wallet', { screen: 'WalletHome' });
    }

    // Effects
    React.useEffect(()=>{
        verifyPayment(transaction_id).then(({ data, error })=>{
            console.log(data);
            if (data && data.status) {
                setIsVerified(true);
                setVerificationComplete(true);
            }
            if (error) {
                console.log(error);
                setVerificationComplete(true);
                showToast && showToast('error', 'Could not verify the transaction',
                    'If transaction is not reflected, contact our support team'
                )
            }
        })
    },[])

    const redCircle = (
        <View style={styles.redCircle}>
           <AntIcon name="close" color="#fff"
            style={styles.tick}
           />
        </View>
    )

    const greenCircle = (
        <View style={styles.circle}>
           <EntypoIcon name="check" color="#fff"
            style={styles.tick}
           />
        </View>
    )

    const closeButton = (
        <Pressable
                style={styles.pressable} onPress={handleClose}
            >
                {({ pressed }) => {
                    let pressedStyle: StyleProp<TextStyle> = {
                        opacity: 0.5
                    }
    
                    let style = pressed ? pressedStyle : null;
    
                    return(
                        <Text style={[styles.bottomLabel, style]}>
                            CLOSE
                        </Text>
                )}}
            </Pressable>
    )
    
    return(
        <View style={styles.container}>
            { !verificationComplete && <LoadingOverlay visible text='Verifying payment...'/> }
            {verificationComplete && <View>
                <View style={styles.circleArea}>
                    { isVerified ? greenCircle : redCircle }
                </View>
                <View style={styles.subTextArea}>
                    <Text style={styles.subText}>₦ {formatAmount(amount)}</Text>
                    <Text>
                        { 
                            isVerified ? 
                            'Your payment was successful' : 
                            "Your payment could not be verified, but may have been successful" 
                        }
                    </Text>
                </View>
                <View style={styles.beneDetails}>
                    <View style={styles.numberDetails}>
                        <Text style={styles.amountLabel}>Reference ID: </Text>
                        <Text style={styles.amountLabel}>{refNum}</Text>
                    </View>
                </View>
            </View>}
            {verificationComplete && <View>
                {closeButton}
            </View>}
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

    tick:{
        fontSize: 35
    },

    subTextArea:{
        alignItems: 'center',
        marginTop: '5%'
    },

    subText:{
        fontSize: 28,
        textAlign: 'center'
    },

    main:{
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'red',
        flex: 1,
        height: '100%'
    },

    circle:{
        backgroundColor: '#00BA88',
        borderRadius: 100,
        width: 106,
        height: 106,
        alignItems: 'center',
        justifyContent: 'center',
    },

    redCircle:{
        backgroundColor: 'red',
        borderRadius: 100,
        width: 106,
        height: 106,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circleArea:{
        alignItems: 'center'
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


export default TopUpReceiptScreen;