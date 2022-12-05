import React from 'react';
import { FlatList, FlatListProps, ListRenderItem, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';
import { RootState } from '../../redux/slices/store';
import { basePath, useTransactionHistory } from '../../swr/transaction';
import TransactionActivityCard, { TransactionActivityCardProps } from './TransactionActivityCard';

export interface TransactionHistoryListProps{
    style?: StyleProp<ViewStyle>;
    onDateChange?: (date?: string) => any;
}

const TransactionHistoryList: React.FC<TransactionHistoryListProps> = ({
    style, onDateChange
})=>{
    let count = 0;

    // Redux
    const { auth, cookies } = useSelector((state: RootState)=> state.auth);

    // swr
    const config = useSWRConfig();
    const { isLoading, isError, data, mutate } = useTransactionHistory(auth?.token);

    // let testData: TransactionActivityCardProps[] = [
    //     { name: "Daisy Black", amount: 200000, type: 'credit', date: new Date() },
    //     { name: "Medley White", amount: 1500, type: 'credit', date: new Date() },
    //     { name: "Winston Oluchukwuebukabieze Paulina", amount: 3000, type: 'debit', date: new Date() },
    //     { name: "Sade Black", amount: 1000, type: 'debit', date: new Date(2021, 10, 23, 10, 33, 30) },
    //     { name: "Bitrus Pam", amount: 3400, type: 'debit', date: new Date(2021, 10, 23, 10, 33, 30) },
    //     { name: "Jonathan Biabiany", amount: 67000, type: 'credit', date: new Date(2021, 9, 21, 10, 33, 30) },
    //     { name: "David Beckham", amount: 900, type: 'debit', date: new Date(2021, 9, 20, 10, 33, 30) },
    //     { name: "Segun Daniel", amount: 8500, type: 'debit', date: new Date(2021, 9, 19, 10, 33, 30) },
    //     { name: "Ikemefuna Ezechukwu", amount: 3000, type: 'debit', date: new Date(2021, 9, 19, 10, 33, 30) },
    // ];

    const onViewRef = React.useRef((viewableItems: any)=> {
        // Pass the date of the viewable item at the top
        onDateChange && onDateChange(viewableItems.viewableItems[0].item.date)

        // Debug
        //console.log(viewableItems.viewableItems[0].item);
    })
    const viewConfigRef = React.useRef({ 
        itemVisiblePercentThreshold: 1
    })

    const _renderItem = ({ item }: { item: TransactionActivityCardProps })=>{

        if (item.date) {
            if ((new Date(item.date).getDate() < new Date().getDate()) && count === 0) {
                count ++;
                return(
                    <View>
                        <View style={styles.textContainer}>
                            <Text style={styles.recentText}>
                                Earlier
                            </Text>
                        </View>
                        <TransactionActivityCard {...item}/>
                    </View>
                )
            }
            
        }
        return(
            <TransactionActivityCard {...item}/>
        )
    }


    return(
       <FlatList
            style={[styles.list, style]}
            data={(data && data.data) ? data.data.map(item => item).reverse() : []}
            renderItem={_renderItem}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
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
    },

    textContainer:{
        paddingVertical: 5
    },

    recentText:{
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
        color: '#333333'
    },
})

export default TransactionHistoryList;