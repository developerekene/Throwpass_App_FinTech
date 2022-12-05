import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { TransactionHistoryResponseData } from '../types/responses';

export interface ReceiptPrintScreenParams{
    uri?: string;
}

export interface ReceiptPrintScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params?: ReceiptPrintScreenParams
    }>
}

const ReceiptPrintScreen: React.FC<ReceiptPrintScreenProps> = ({ navigation, route })=>{

    const source = { uri: route?.params?.uri }
    return(
        <View style={styles.container}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //justifyContent: 'flex-start',
        //alignItems: 'center',
        //marginTop: 25,
        //backgroundColor: '#FCFCFC',
    },

    pdf: {
        flex:1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default ReceiptPrintScreen;