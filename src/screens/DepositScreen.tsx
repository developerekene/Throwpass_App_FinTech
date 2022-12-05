import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DataBox, { DataBoxProps } from '../Components/DataBox';
import SearchTextField from '../Components/elements/SearchTextField';
import SavingsBalanceView from '../Components/LoanElements/SavingsBalanceView';
import TransactionList from '../Components/LoanElements/TransactionList';
import BankSvg from '../icons/bank';
import GroupSvg from '../icons/group';
import InstallmentSvg from '../icons/installation';
import PersonalWealthSvg from '../icons/personalwealth';


const DepositMoneyScreen: React.FC<any> = ()=>{

   // Hooks
   const navigation = useNavigation<any>();

    // Press Handlers
    const gotoPersonal = ()=>{
        navigation.navigate('SaveMoney', { savingType: 'personal' });
    }
    const gotoGroup = ()=>{
        navigation.navigate('GroupSavings', { savingType: 'group' });
    }
    const gotoInstallment = ()=>{
        navigation.navigate('Installment', { savingType: 'installment' });
    }

    return(
        <View style={styles.container}>
            {/** Swipeable balance view */}
            <SavingsBalanceView />

            {/** Sender Info */}
            <View style={styles.info}>
                <View style={styles.databox}>
                    <DataBox icon={<PersonalWealthSvg/>} label1="Personal"
                        backgroundColor="#9B51E0" iconAlign="center" labelAlign="center"
                        labelSize={13}
                        onPress={gotoPersonal}
                    />
                </View>
                <View style={styles.databox2}>
                    <DataBox icon={<GroupSvg/>} label1="Group"
                        backgroundColor="#F2994A" iconAlign="center" labelAlign="center"
                        labelSize={13}
                        onPress={gotoGroup}
                    />
                </View>
                <View style={styles.databox2}>
                    <DataBox icon={<InstallmentSvg/>} label1="Installment"
                        backgroundColor="#0122AE" iconAlign="center" labelAlign="center"
                        labelSize={13}
                        onPress={gotoInstallment}
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
        marginVertical: 15,
        height: 100,
    },

    databox:{
        flex: 1,
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


export default DepositMoneyScreen;