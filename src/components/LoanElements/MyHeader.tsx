import React from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, View } from 'react-native';
import BackArrowSvg from '../../icons/back-arrow';

export interface MyHeaderProps{
    title?: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    style?: StyleProp<any>;
    onLeftButtonPress?: (arg: any) => any;
}

const MyHeader: React.FC<MyHeaderProps> = ({
    style, title, leftButton, rightButton,
    onLeftButtonPress
})=>{

    const backButton = (
        <TouchableHighlight onPress={onLeftButtonPress}>
            <BackArrowSvg/>
        </TouchableHighlight>
    )

    return(
        <View style={[styles.container, style]}>
            {/** Back button */}
            {!leftButton && backButton}
            {leftButton}

            {/** Title */}
            {title}

            {/** Right button */}
            {rightButton}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 50,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'red'
    }
})

export default MyHeader;