import { NavigationProp, RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import HeroFooter from '../Components/HeroFooter';
import HeroImage from '../components/LoanElements/HeroImage';

export interface HeroScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params:{
            screenIndex?: number;
        }
    }>
    onNext: ()=> any;
    onPrev: ()=> any;
    screenIndex: number;
    onGetStarted: ()=> any;
}

const screenHeight = Dimensions.get('screen').height;

const HeroScreen: React.FC<HeroScreenProps> = ({ 
    route, navigation, screenIndex, ...props
})=>{

    //const screenIndex = route?.params.screenIndex || 0;
    const bodyText1 = "Track your savings and build the habit of saving money."
    const bodyText2 = "Protect your finances with an encrypted system."
    const bodyText3 = "Collect loans and make investment choices based on verified data."
    const bodyTexts = [bodyText1, bodyText2, bodyText3];

    const title1 = "Savings Management";
    const title2 = "Security and trust";
    const title3 = "Loans and Investments";
    const titles = [title1, title2, title3];

    const TopView = (
        <View style={styles.topView}>
            {/** Vector Image */}
            <View style={styles.heroImage}>
                <HeroImage imageIndex={screenIndex}/>
            </View>

            {/** Hero Text */}
            <View style={styles.heroText}>
                <Text style={styles.baseText}>
                    <Text style={styles.titleText}>
                        {titles[screenIndex]}
                        {"\n"}
                        {"\n"}
                    </Text>
                    <Text numberOfLines={5} style={styles.bodyText}>
                        {bodyTexts[screenIndex]}
                    </Text>
                </Text>
            </View>
        </View>
    )

    return(
        <View style={styles.container}>
            {/** Top */}
            {TopView}

            {/**Footer */}
            <HeroFooter navigation={navigation} screenIndex={screenIndex}
            style={styles.heroFooter} {...props}
            />
            
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
        backgroundColor: '#FCFCFC',
    },

    heroFooter:{
        //marginBottom: 30
        //flex: 0.4,
        //alignItems: 'center',
        top: screenHeight/10
    },

    topView:{
        //marginTop: 113
        //alignItems: 'center',
        //justifyContent: 'center',
    },


    heroImage:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 32
    },

    heroText:{
        //backgroundColor: 'red',
    },

    baseText:{
        //fontFamily: 's',
    },

    titleText:{
        fontWeight: '700',
        fontSize: 24,
        letterSpacing: 1,
        color: '#14142B',
    },

    bodyText:{
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.75,
        lineHeight: 28,
        color: '#6E7191'
    },
})

export default HeroScreen;