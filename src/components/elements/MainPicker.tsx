import React from "react";
import { StyleProp, StyleSheet, Animated, ViewStyle, View } from "react-native";
import { CheckIcon, Select, ISelectProps, extendTheme } from 'native-base';

export interface BasePickerProps extends ISelectProps{
    valueCollector?: (value: any) => any;
    options?: { label: string; value: string }[];
}

const MainPicker: React.FC<BasePickerProps> = ({valueCollector, options = [], ...props})=>{

    // State
    //const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [animation] = React.useState(new Animated.Value(0));
    const [selectedBank, setSelectedBank] =  React.useState<string>();


    // Styling select
    const theme = extendTheme({
        colors:{
            sanwo:{
                100: "#EFF0F7",
                200: "#a0a3bd"
            }
        },
    });

    return(
        <Select
            selectedValue={selectedBank}
            backgroundColor={'#EFF0F7'}
            borderWidth={0}
            borderRadius={8}
            padding={3.5}
            fontSize={16}
            flex={1}
            placeholderTextColor={'#a0a3bd'}
            //flex={1}
            //minWidth="200"
            //accessibilityLabel="Select Bank"
            //placeholder="Select Bank"
            _selectedItem={{
                //bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
            }}
            //mt={1}
            onValueChange={(itemValue) => {
                setSelectedBank(itemValue);
                valueCollector && valueCollector(itemValue);
            }}
            {...props}
        >
            {
                options.map((item)=>(
                    <Select.Item 
                        label={item.label} 
                        value={item.value} 
                    />
                ))
            }
        </Select>
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

export default MainPicker;