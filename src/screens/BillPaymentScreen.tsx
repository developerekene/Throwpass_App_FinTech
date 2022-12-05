import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DataBox, { DataBoxProps } from '../Components/DataBox';
import SearchTextField from '../Components/elements/SearchTextField';
import TransactionList from '../components/LoanElements/TransactionList';
import BankSvg from '../icons/bank';
import GroupSvg from '../icons/group';
import InstallmentSvg from '../icons/installation';
import PersonalWealthSvg from '../icons/personalwealth';
import { FlatGrid } from 'react-native-super-grid';
import BalanceView from '../Components/BalanceView';
import SaveMoneySvg from '../icons/save-money';


const BillPaymentScreen: React.FC<any> = ()=>{

   // Hooks
   const navigation = useNavigation<any>();

    // Press Handlers
    const gotoDataSub = ()=>{
        navigation.navigate('DataSub');
    }
    const gotoTvSub = ()=>{
        navigation.navigate('TvSub');
    }
    const gotoAirtime = ()=>{
        navigation.navigate('Airtime');
    }
    const gotoPhcn = ()=>{
        navigation.navigate('Phcn');
    }

    const dataBoxes: DataBoxProps[] = [
        { 
            icon: <SaveMoneySvg pathProps={{ fill: '#FFDE00' }}/>, 
            label1: "Airtime" , //onPress: gotoSendMoney,
            labelAlign: 'center', iconToLabelDirecttion: 'row',
            labelSize: 16, labelStyle: styles.labelStyle,
            subtext: "up to 5% cashback",
            backgroundColor: "#FFDE00", onPress: gotoAirtime
        },
        { 
            icon: <SaveMoneySvg pathProps={{ fill: '#2F80ED' }}/>, 
            label1: "TV" , //onPress: gotoSendMoney,
            labelAlign: 'center', iconToLabelDirecttion: 'row',
            labelSize: 16, labelStyle: styles.labelStyle,
            subtext: "up to 5% discount", onPress: gotoTvSub,
            backgroundColor: "#2F80ED",
        },
        { 
            icon: <SaveMoneySvg pathProps={{ fill: '#EB5757' }}/>, 
            label1: "PHCN" , //onPress: gotoSendMoney,
            labelAlign: 'center', iconToLabelDirecttion: 'row',
            labelSize: 16, labelStyle: styles.labelStyle,
            subtext: "up to 10% cashback", onPress: gotoPhcn,
            backgroundColor: "#EB5757",
        },
        { 
            icon: <SaveMoneySvg pathProps={{ fill: '#219653' }}/>, 
            label1: "Data" , //onPress: gotoSendMoney,
            labelAlign: 'center', iconToLabelDirecttion: 'row',
            labelSize: 16, labelStyle: styles.labelStyle,
            subtext: "up to 5% cashback", onPress: gotoDataSub,
            backgroundColor: "#219653",
        },
    ]

    const footer = (
        <View style={styles.footerStyle}>
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

    return(
        <View style={styles.container}>
            <FlatGrid
            //itemDimension={130}
            //maxDimension={100}
            data={dataBoxes}
            style={styles.gridView}
            scrollEnabled={false}
            nestedScrollEnabled
            ListHeaderComponent={
                <View style={{ marginBottom: 10 }}>
                    <BalanceView/>
                </View>
            }
            
            // fixed
            spacing={10}
            renderItem={({ item }) => {
                return(
                    <View>
                        <DataBox {...item}/>
                    </View>
                )
            }}
            />
            { footer }
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        flexDirection: 'column',
        // paddingHorizontal: 15,
        paddingVertical: '2%',
    },

    gridView: {
        //paddingBottom: '4%',
        flex: 0.5,
    },

    footerStyle:{
        flex: 0.8,
        paddingHorizontal: 11,
    },

    textContainer:{
        paddingBottom: 10,
        paddingTop: 8,
    },

    recentText:{
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
    },

    labelStyle:{
        paddingBottom: 0,
        marginLeft: 5,
    }
})


export default BillPaymentScreen;