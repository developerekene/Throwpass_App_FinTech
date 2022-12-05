import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DataBox, { DataBoxProps } from '../Components/DataBox';
import SearchTextField from '../Components/elements/SearchTextField';
import TransactionList from '../Components/LoanElements/TransactionList';
import BankSvg from '../icons/bank';
import MoneyBagSvg from '../icons/moneybag';


const SendMoneyScreen: React.FC<any> = ()=>{

   // Hooks
   const navigation = useNavigation<any>();

   // Press Handlers
   const gotoSanwopay = ()=>{
       navigation.navigate('ToSanwopay');
   }
   const gotoBank = ()=>{
    navigation.navigate('ToBank');
}

    return(
        <View style={styles.container}>
            {/** Search bar */}
            {/* <View style={styles.searchContainer}><SearchTextField/></View> */}

            {/** Sender Info */}
            <View style={styles.info}>
                <View style={styles.databox}>
                    <DataBox icon={<MoneyBagSvg/>} label1="To" label2="Sanwopay"
                        backgroundColor="#0122AE" onPress={gotoSanwopay}
                    />
                </View>
                <View style={styles.databox2}>
                    <DataBox icon={<BankSvg/>} label1="To" label2="Bank Acct"
                    backgroundColor="#0122AE" onPress={gotoBank}
                />
                </View>
            </View>

            {/** Recent Activities */}
            <View style={styles.textContainer}>
                <Text style={styles.recentText}>
                    Recent Activity
                </Text>
            </View>

            {/** Transaction Activity */}
            <TransactionList/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 15,
        paddingVertical: '5%',
    },

    info:{
        flexDirection: 'row',
        marginBottom: 10,
        height: 145,
    },

    searchContainer:{
        paddingBottom: 15,
    },

    databox:{
        flex: 1,
        paddingRight: 9,
    },

    databox2:{
        flex: 1,
        paddingLeft: 9,
    },

    textContainer:{
        paddingVertical: 10,
    },

    recentText:{
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
    },
})


export default SendMoneyScreen;