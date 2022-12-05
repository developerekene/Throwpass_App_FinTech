import React from 'react';
import { FlatList, FlatListProps, ListRenderItem, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';
import { basePath, useTransactionHistory } from '../../swr/transaction';
import TransactionActivityCard, { TransactionActivityCardProps } from './TransactionActivityCard';
import { useSWRConfig } from 'swr';

export interface TransactionListProps{
    style?: StyleProp<ViewStyle>
}

const TransactionList: React.FC<TransactionListProps> = ({
    style
})=>{

    // Redux
    const { auth, cookies } = useSelector((state: RootState)=> state.auth);
    
    // swr
    const config = useSWRConfig();
    const { isLoading, isError, data, mutate } = useTransactionHistory(auth?.token);

    // let testData: TransactionActivityCardProps[] = [
    //     { name: "Daisy Black", amount: 200000, type: 'credit' },
    //     { name: "Medley White", amount: 1500, type: 'credit' },
    //     { name: "Winston Oluchukwuebukabieze Paulina", amount: 3000, type: 'debit' },
    //     { name: "Sade Black", amount: 1000, type: 'debit' },
    //     { name: "Bitrus Pam", amount: 3400, type: 'debit' },
    //     { name: "Jonathan Biabiany", amount: 67000, type: 'credit' },
    //     { name: "David Beckham", amount: 900, type: 'debit' },
    //     { name: "Segun Daniel", amount: 8500, type: 'debit' },
    //     { name: "Ikemefuna Ezechukwu", amount: 3000, type: 'debit' },
    // ]

    const _renderItem = ({ item }: { item: TransactionActivityCardProps })=>{
        return(
            <TransactionActivityCard {...item}/>
        )
    }


    return(
       <FlatList
            style={[styles.list, style]}
            data={(data && data.data) ? data.data.map(item => item).reverse() : []}
            renderItem={_renderItem}
            refreshing={isLoading}
            onRefresh={
                ()=>{ 
                    mutate && mutate();
                    config.mutate(`${basePath}/user/profile/`, true);
                }
            }
       />
    )
}

const styles = StyleSheet.create({
    list:{
        flex: 1,
    }
})

export default TransactionList;