import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Avatar, Caption, Card, Title } from 'react-native-paper';
import { TransactionHistoryResponseData } from '../../types/responses';
import { formatAmount, formatDate } from '../../utils/GeneralUtils';

const userImage = require('../images/luff.jpeg');

export interface TransactionActivityCardProps extends TransactionHistoryResponseData{
    // image?:{
    //     src: string;
    // },
    // amount?: string | number;
    // type?: 'debit' | 'credit';
    // name?: string;
    // date?: Date;
}

const TransactionActivityCard: React.FC<TransactionActivityCardProps> = (props)=>{

    // Prop breakdown
    const {  
        amount, credit, date, bank_account_name,
        user, to_user, 
    } = props

    let transactionStyle: StyleProp<TextStyle> = {
        color: credit ? '#00BA88' : '#F51D1D',
    }
    let preText = credit ? '+' : '-';

    // Hooks
    const navigation = useNavigation<any>();

    // Handlers
    const showReceipt = ()=>{
        navigation.navigate('TransactionReceipt', props);
    }

    const avatarDisplay = (
        <View style={styles.avatarSection}>
            {/* <Avatar.Image
                source={userImage}
                size={40}
            /> */}
            <View style={styles.avatarDescription}>
                <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{to_user || bank_account_name || user}</Title>
                <Caption style={styles.caption} >{formatDate(new Date(date))}</Caption>
            </View>
        </View>
    )

    const transaction = (
        <View style={styles.amountContainer}>
            <Text style={[styles.amountText, transactionStyle]}>
                {`${preText}₦${formatAmount(amount.toString())}`}
            </Text>
        </View>
    )

    return(
       <Card elevation={1} style={styles.card} onPress={showReceipt}>
            <Card.Content style={styles.content}>
                {avatarDisplay}
                {transaction}
            </Card.Content>
       </Card>
    )
}

const styles = StyleSheet.create({
    card:{
        marginVertical: 6,
    },

    content:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    avatarSection:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    avatarDescription:{
        marginLeft: 15,
        maxWidth: 170,
    },

    amountContainer:{
    },

    amountText:{
        fontWeight: '500',
        fontSize: 14,
        letterSpacing: 0.75,
        lineHeight: 28,
    },

    title:{
        fontSize: 14,
        fontWeight: '600',
        marginTop: 3,
        letterSpacing: 0.75,
        lineHeight: 28,
        width: '100%'
    },

    caption:{
        letterSpacing: 0.75,
        color: '#6E7191',

    },
})

export default TransactionActivityCard;