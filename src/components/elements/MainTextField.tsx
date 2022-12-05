import React from "react";
import { StyleProp, StyleSheet, Animated, ViewStyle, View, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import TextField, { TextFieldProps } from "./TextField";

export interface MainTextFieldProps extends TextFieldProps{
    containerStyle?: StyleProp<ViewStyle>;
}

const MainTextField: React.FC<MainTextFieldProps> = ({onBlur, style, containerStyle, ...props})=>{

    // State
    //const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [animation] = React.useState(new Animated.Value(0));

    // Interpolations
    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:["rgba(220, 212, 252, 0)" , "rgba(220, 212, 252, 1)"]
    })
    const fieldInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(95, 46, 234, 0)", "rgba(95, 46, 234, 1)"]
    })
    const widthInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })
    const activeColorInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rrgb(239, 240, 247)", "rgba(255, 255, 255, 1)"]
    })

    const handleFocus = ()=>{
        //setIsFocused(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>)=>{
        //setIsFocused(false);
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()
        onBlur && onBlur(e);
    }

   /* let testFocusedStyle: StyleProp<any> ={
        backgroundColor: "#dcd4fc",
    }*/
      

    let ContainerFocusedStyle: StyleProp<any> ={
        backgroundColor: boxInterpolation,
    }
    let FieldFocusedStyle: StyleProp<any> = {
        borderWidth: widthInterpolation,
        borderColor: fieldInterpolation,
        backgroundColor: activeColorInterpolation
    }
    //let focusedInput = isFocused ? inputFocusedStyle : {};
    //let focusedContainer = isFocused ? testFocusedStyle : {};


    return(
        <Animated.View style={[styles.container, containerStyle, ContainerFocusedStyle,]}>
            <TextField
                onFocus={handleFocus}
                onBlur={handleBlur}
                clearTextOnFocus={false}
                style={[FieldFocusedStyle, style]}
                {...props}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    field:{
        backgroundColor: '#EFF0F7',
        borderWidth: 0
    },

    container:{
        borderRadius: 8,
        padding: 5,
    },
})

export default MainTextField;