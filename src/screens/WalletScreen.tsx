import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DataBoxGrid from '../Components/DataBoxGrid';
import BalanceView, { BalanceDisplay, sampleSavings } from '../Components/BalanceView';
import TransactionList from '../Components/LoanElements/TransactionList';
import AddBalance from '../Components/AddBalance';
import { TopUpWalletScreenProps } from './TopUpWalletScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/store';


const WalletScreen: React.FC<TopUpWalletScreenProps> = ({ navigation })=>{

    // Redux
    const { user } = useSelector((state: RootState)=> state.auth);

    const handlePress = ()=>{
        navigation?.navigate('TopUpWallet');
    }

    return(
        <View style={styles.container}>
            {/** Swipeable balance view */}
           {/* <BalanceView 
                //savings={sampleSavings}
           /> */}

           {/** Regular Wallet Balance Display */}
           <BalanceDisplay amount={user?.wallet_amount}/>

           <View style={styles.bottomContainer}>
               {/** Add Balnce Button */}
                <View style={styles.addBalance}>
                    <AddBalance onPress={handlePress}/>
                </View>

                {/** Recent Activities */}
                <View style={styles.textContainer}>
                    <Text style={styles.recentText}>
                        My Transactions
                    </Text>
                </View>
           </View>

            {/** Transaction Activity */}
            <TransactionList style={styles.transactions}/>

        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingVertical: '5%',
    },

    bottomContainer:{
        paddingHorizontal: 15,
    },

    addBalance:{
        marginVertical: 18
    },

    textContainer:{
    },

    transactions:{
        paddingHorizontal: 15
    },

    recentText:{
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
    },
})


export default WalletScreen;