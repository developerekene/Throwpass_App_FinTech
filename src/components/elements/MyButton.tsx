import React from 'react';
import { 
    View, TouchableHighlight, Text, StyleSheet, 
    TouchableHighlightProps, StyleProp, TextStyle 
} from 'react-native';

export interface MyButtonProps extends TouchableHighlightProps{
    textStyle?: StyleProp<TextStyle>;
    text?: string;
}

const MyButton: React.FC<MyButtonProps> = ({ 
    style, textStyle, text, 
    activeOpacity = 0.6, 
    underlayColor="#263a96",
    onPress = ()=>{},
    ...props
})=>{

    return(
        <TouchableHighlight 
                style={[styles.button, style]} 
                activeOpacity={activeOpacity}
                underlayColor={underlayColor}
                onPress={onPress}
                {...props}
            >
                <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
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
        textAlign: 'center',
    },
})

export default MyButton;