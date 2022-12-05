import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';
import BalanceView, { sampleSavings } from './BalanceView';
import SearchTextField from './../elements/SearchTextField';

const TopMain: React.FC<any> = ()=>{

    const { user } = useSelector((state: RootState)=> state.auth);
    const navigation = useNavigation<any>();

    // Handler
    const handleAddBalance = ()=>{
        navigation.navigate('TopUpWallet');
    }

    return(
        <View>
            <BalanceView showTopUp onAddBalance={handleAddBalance}/>
            {/* <View style={styles.searchContainer}><SearchTextField/></View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    balanceContainer:{
        paddingHorizontal: 15
    },
    searchContainer:{
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
})

export default TopMain;