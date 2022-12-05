import { View } from 'native-base';
import React from 'react';
import { BackHandler, Pressable, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/store';
import { formatAmount } from '../utils/GeneralUtils';
import { ConfirmScreenProps } from './ConfirmScreen';


const ReceiptScreen: React.FC<ConfirmScreenProps> = ({ navigation, route })=>{

    // const numberLabel = route?.params.numberLabel || 'Phone Number';
    // const numberValue = route?.params.numberValue || '081462845735';
    const beneficiary = route?.params.beneficiary || 'Adebayo Adegite';
    const amount = route?.params.amount || '12500'
    // const refNum = route?.params.refNum || '2364hfadbe576';

    //let numberLabel = destination === 'bank' ? 'Account Number' : 'Phone Number';

    // Hooks
    const receiptState = useSelector((state: RootState)=> state.receipt);

    // Handlers
    const handleClose = ()=>{
        navigation?.navigate('Main');
    }

    // Effect
    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    const renderMeta = (obj?: any)=>{
        let displayArray: JSX.Element[] = [];
        if (obj) {
            for (const key in obj) {
                console.log(key)
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

    const greenCircle = (
        <View style={styles.circle}>
           <EntypoIcon name="check" color="#fff"
            style={styles.tick}
           />
        </View>
    )

    const beneDetails = (
        <View style={styles.beneDetails}>
            <View>
                <Text style={styles.beneNameText}>{beneficiary}</Text>
            </View>
            {/** Meta */}
            { renderMeta(receiptState) }
            {/** Number */}
            {/* <View style={styles.numberDetails}>
                <Text style={styles.numberLabel}>{numberLabel}: </Text>
                <Text style={styles.numberValue}>{numberValue}</Text>
            </View> */}

            {/** Reference No */}
            {/* <View style={styles.numberDetails}>
                <Text style={styles.numberLabel}>Reference No: </Text>
                <Text style={styles.numberValue}>{refNum}</Text>
            </View> */}

            {/** Amount */}
            <View style={styles.numberDetails}>
                <Text style={styles.amountLabel}>Amount: </Text>
                <Text style={styles.amountLabel}>₦ {formatAmount(amount)}</Text>
            </View>

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
            <View>
                <View style={styles.circleArea}>
                    {greenCircle}
                </View>
                <View style={styles.subTextArea}>
                    <Text style={styles.subText}>{'Transaction\nSuccessful'}</Text>
                </View>
                {beneDetails}
            </View>
            <View>
                {closeButton}
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


export default ReceiptScreen;