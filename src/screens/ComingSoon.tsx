import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ComingSoonSvg from '../icons/ComingSoon';
import LoanAmount from '../screens/LoanAmountScreen';

import LoanScreens from '../screens/navigators/LoanScreens';
import UserLoanKY from './UserLoanKYC'
import LoanKY from './LoanKY';

const ComingSoonScreen: React.FC<any> = ()=>{


    return(
     <LoanScreens/>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#FCFCFC',
    },

    text:{
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
        letterSpacing: 0.75,
    },
})

export default ComingSoonScreen;