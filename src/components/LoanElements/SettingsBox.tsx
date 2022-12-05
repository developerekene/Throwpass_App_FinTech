import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

export interface SettingsBoxProps{
    label?: string;
    variant?: 'step' | 'switch';
    onSwitch?: (isEnabled: boolean) => any;
    onPress?: ()=> any;
}

const SettingsBox: React.FC<SettingsBoxProps> = ({ 
    label, variant = 'step', onSwitch, onPress
})=>{

    // State
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () =>{
        setIsEnabled(previousState => !previousState);
        onSwitch && onSwitch(isEnabled)
    }

    const text = (
        <View>
            <Text style={styles.text}>{label}</Text>
        </View>
    )

    const stepIcon = (
        <AntDesignIcon name="right" style={styles.stepIcon} color="#A0A3BD" />
    )

    const switchIcon = (
        <Switch
            trackColor={{ false: "#A0A3BD", true: "#0122AE" }}
            thumbColor={'#FCFCFC'}
            //ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    )

    return(
        <Card onPress={onPress}>
            <Card.Content style={styles.content}>
                {text}
                {
                    variant === 'step' ?
                    stepIcon : switchIcon
                }
            </Card.Content>
       </Card>
    )
}

const styles = StyleSheet.create({
    content:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text:{
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.75,
        lineHeight: 28,
        color: '#14142B',
    },

    stepIcon:{
        fontSize: 18
    },
})

export default SettingsBox;