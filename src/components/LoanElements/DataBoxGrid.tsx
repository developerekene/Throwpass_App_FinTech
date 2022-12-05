import React from 'react';
import { View, StyleSheet, Pressable, StyleProp, TextStyle, Dimensions, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import DataBox, { DataBoxProps } from './DataBox';
import DonationSvg from '../../icons/donation';
import PayBillsSvg from '../../icons/paybills';
import SaveMoneySvg from '../../icons/save-money';
import WithdrawSvg from '../../icons/withdraw';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TopMain from './TopMain';
import { useNavigation } from '@react-navigation/native';
import QRSvg from '../../icons/qr';
import ChattaSvg from '../../icons/chatta';

const DataBoxGrid: React.FC<any> = ()=>{

    // Hooks
    const navigation = useNavigation<any>();

    // Press Handlers
    const gotoSendMoney = ()=>{
        navigation.navigate('SendMoney');
    }
    const gotoNewUserRegistration = ()=>{
        navigation.navigate('UserRegistration');
    }
    const gotoDepositMoney = ()=>{
        navigation.navigate('Deposit');
    }
    const gotoBillPayment = ()=>{
        navigation.navigate('BillPayment');
    }
    const gotoScanToPay = ()=>{
        navigation.navigate('ScanToPay');
    }
    const gotoWithdrawal = ()=>{
        navigation.navigate('WithdrawMoney');
    }
    const gotoLoan = ()=>{
        navigation.navigate('Loan');
    }
    const gotoChatta = ()=>{
        navigation.navigate('Chatta');
    }

    const windowWidth = Dimensions.get('window').width;
    const RightArrowIcon =( 
        <AntIcon 
            name="arrowright" 
            size={18} 
            style={{
                marginLeft: 10,
                paddingTop: 3
            }}
        />
    )

    const registerButton = (
        <Pressable onPress={gotoNewUserRegistration}>
            {({ pressed })=>{
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return (
                    <View style={styles.register}>
                        <Text style={[styles.registerText, style]}>
                            Register New Customer
                        </Text>
                        {RightArrowIcon}
                    </View>
                )
            }}
        </Pressable>
    )




    const dataBoxes: DataBoxProps[] = [
        { 
            icon: <QRSvg pathProps={{ fill: '#219653' }} />, label1: "Scan" , label2: "to Pay", 
            subtext: "Easy payment", onPress: gotoScanToPay, labelSize: 16,
            backgroundColor: '#219653'
        },
        { 
            icon: <SaveMoneySvg/>, label1: "Send" , label2: "Money", 
            subtext: "Easy transfer", onPress: gotoSendMoney, labelSize: 16
        },
        { 
            icon: <DonationSvg/>, label1: "Ajo/" , 
            label2: "Deposit", subtext: "Easy deposit", labelSize: 16,
            backgroundColor: "#0122AE", onPress: gotoDepositMoney
        },
        { 
            icon: <WithdrawSvg/>, label1: "Make" , label2: "Withdrawal", 
            subtext: "Instant withdrawal", labelSize: 16,
            backgroundColor: "#9B51E0", onPress: gotoWithdrawal,
        },
        { 
            icon: <SaveMoneySvg/>, label1: "Transport Loan" , 
            subtext: "Quick loan", labelSize: 16,
            backgroundColor: "#E05151", onPress: gotoLoan,
        },
        { 
            icon: <PayBillsSvg pathProps={{ fill: '#FFE712' }} />, label1: "Pay" , label2: "Bills", 
            subtext: "Utility bills", labelSize: 16,
            backgroundColor: "#FFE712", onPress: gotoBillPayment
        },
        { 
            icon: <ChattaSvg />, label1: "Chatta" , 
            subtext: "Hire Bus/Car", labelSize: 16,
            backgroundColor: "#0122AE", onPress: gotoChatta
        },
    ]


    return(
        <FlatGrid
        itemDimension={130}
        data={dataBoxes}
        style={styles.gridView}
        nestedScrollEnabled
        ListHeaderComponent={
            <View style={styles.top}>
                <TopMain/>
            </View>
        }
        
        // fixed
        spacing={12}
        renderItem={({ item }) => {
            let renderStyle = item.label1 === 'Moan' ? { width: windowWidth, paddingRight: 24 } : {};
            return(
                <View style={[styles.pressContainer, renderStyle]}>
                    <DataBox {...item}/>
                </View>
            )
        }}
        />
    );
    
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },

    item:{
    },

    pressContainer:{
        flex: 1
    },

    registerText:{
        color: '#0122AE',
        fontWeight: '600',
        letterSpacing: 0.75,
        lineHeight: 28,
        fontSize: 16,
    },

    register:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 10,

    },

    top:{
        paddingBottom: 15
    }
})


export default DataBoxGrid;