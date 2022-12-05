import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TransactionHistoryList from '../Components/LoanElements/TransactionHistoryList';
import TransactionList from '../Components/LoanElements/TransactionList';

const HistoryScreen: React.FC<any> = ()=>{

    const [label, setLabel] = React.useState('Today');

    const handleDateChange = (date?: string)=>{
        if (date) {
            if (new Date(date).getDate() < new Date().getDate()) {
                setLabel('Earlier')
            }

            if (new Date(date).getDate() === new Date().getDate()) {
                setLabel('Today')
            }
        }
    }
    return(
        <View style={styles.container}>
                {/** Recent Activities */}
                <View style={styles.textContainer}>
                    <Text style={styles.recentText}>
                        {label}
                    </Text>
                </View>
            <TransactionHistoryList onDateChange={handleDateChange} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingVertical: '5%',
        paddingHorizontal: 15,
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
});

export default HistoryScreen;