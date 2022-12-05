import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Text, Pressable, TextStyle, GestureResponderEvent, FlexAlignType } from 'react-native';
import SaveMoneySvg from '../../icons/save-money';

export interface DataBoxProps{
    label1?: string;
    label2?: string;
    icon?: React.ReactNode;
    subtext?: string;
    backgroundColor?: string;
    onPress?: (event: GestureResponderEvent) => void
    displayOnly?: boolean;
    iconAlign?: FlexAlignType;
    labelAlign?: FlexAlignType;
    labelSize?: number;
    labelStyle?: StyleProp<ViewStyle>;
    iconToLabelDirecttion?: "row" | "column" | "row-reverse" | "column-reverse" 
}

const DataBox: React.FC<DataBoxProps> = ({
    label1, label2, icon = <SaveMoneySvg/>,
    subtext, backgroundColor, onPress,
    displayOnly, iconAlign, labelAlign, labelSize = 18,
    labelStyle, iconToLabelDirecttion
})=>{

    let customStyle: StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor
    }

    let style = backgroundColor ? customStyle : null;

    let positionStyle: StyleProp<ViewStyle> = {
        alignItems: iconAlign
    }

    let labelPositionStyle: StyleProp<ViewStyle> = {
        alignItems: labelAlign
    }

    let labelTextStyle: StyleProp<TextStyle> = {
        fontSize: labelSize
    }

    const dataBox = (
        <View style={styles.container}>
            <View style={[styles.overlay, style]}></View>
            <View style={styles.main}>
                <View style={{ flexDirection: iconToLabelDirecttion }}>
                    {/** Icon */}
                    <View style={[styles.logo, positionStyle]}>
                        {icon}
                    </View>

                    {/** Label */}
                    <View style={[styles.label, labelPositionStyle, labelStyle]}>
                        <Text style={[styles.labelText, labelTextStyle]} ellipsizeMode='tail'
                            numberOfLines={1}
                        >
                            {label1}
                        </Text>
                        <Text style={[styles.labelText, labelTextStyle]} ellipsizeMode='tail'
                            numberOfLines={1}
                        >
                            {label2}
                        </Text>
                    </View>
                </View>

                {/** Subtext */}
                <View style={styles.subtext}>
                    <Text style={styles.subtextText}>
                        {subtext}
                    </Text>
                </View>
            </View>
        </View>
    )

    if (displayOnly) {
        return(
            dataBox
        )
    }

    return(
        <Pressable onPress={onPress} style={styles.pressable}>
            {({ pressed })=>{
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return (
                    <View style={[styles.pressable, style]}>
                        {dataBox}
                    </View>
                )
            }}
        </Pressable>
    )
}

const styles = StyleSheet.create({

    pressable:{
        flex: 1
    },

    container:{
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        flex: 1,
        position: 'relative',
    },

    overlay:{
        backgroundColor: "#F2994A",
        opacity: 0.1,
        width: '100%',
        height: '100%',
        position: "absolute",
        borderRadius: 10,
    },

    main:{
        padding: 15,
        flex: 1,
        flexDirection: 'column',
    },

    logo:{
        paddingBottom: 15
    },

    label:{
        paddingBottom: 15,
    },

    labelText:{
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0.75,
    },

    subtext:{ 
    },

    subtextText:{
        color: '#4F4F4F',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 24,
        letterSpacing: 0.75
    }
})

export default DataBox;