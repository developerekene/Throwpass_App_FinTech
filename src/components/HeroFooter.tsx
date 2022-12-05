import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, BackHandler, Pressable, StyleProp, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ViewStyle } from 'react-native';
import { HeroScreenProps } from '../screens/HeroScreen';

interface HeroFooterProp extends HeroScreenProps {
    screenIndex: number;
    style?: StyleProp<ViewStyle>
}
   

const HeroFooter: React.FC<HeroFooterProp> = ({ 
    navigation, screenIndex, style, onNext, onPrev,
    onGetStarted 
})=>{
    const buttonTexts: string[] = ["NEXT", "NEXT", "GET STARTED"];

    /**
     * For handling navigation to the next screen
     */
     const handleOnPress = ()=>{
        if (screenIndex === 2) {
            onGetStarted();
        } else{
            onNext();
        }
        
    }

    // Initial Styling
    let initStyle: StyleProp<ViewStyle> = {
        backgroundColor: '#0122AE',
        width: 30,
        marginLeft: 0
    }

    let swipedStyle: StyleProp<ViewStyle> = {
        backgroundColor: '#0122AE',
        width: 30,
    }
    

    const navIndicator = (
        <View style={styles.navContainer}>
            <Animated.View style={[styles.navIndicator, screenIndex === 0 ? initStyle : null]}/>
            <Animated.View style={[styles.navIndicator, screenIndex === 1 ? swipedStyle : null]}/>
            <Animated.View style={[styles.navIndicator, screenIndex === 2 ? swipedStyle : null]}/>
        </View>
    )

    return(
        <View style={[styles.container, style]}>
            {/** Nav Indicator on Left*/}
            {navIndicator}

            {/** Button on Right*/}
            <View>
                <TouchableHighlight 
                    style={styles.button} 
                    onPress={handleOnPress}
                    activeOpacity={0.6}
                    underlayColor="#263a96"
                >
                    <Text style={styles.buttonText}>{buttonTexts[screenIndex]}</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    button:{
        backgroundColor: '#0122AE',
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 15
    },

    buttonText:{
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 0.75,
        color: '#F7F7FC',
    },

    navContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    navIndicator:{
        backgroundColor: '#A0A3BD',
        height: 8,
        borderRadius: 5,
        opacity: 0.9,
        width: 15,
        marginLeft: 8
    }
});

export default HeroFooter;