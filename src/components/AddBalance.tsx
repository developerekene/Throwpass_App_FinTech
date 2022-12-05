import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { Caption, Card, Title } from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export interface AddBalanceProps{
    onPress?: (arg?: any) => void;
}

const AddBalance: React.FC<AddBalanceProps> = ({ onPress })=>{

    const textPrompt = (
        <View>
            <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                Add Balance
            </Title>
            <Caption style={styles.caption} >
                ₦50 - ₦50,000 max
            </Caption>
        </View>
    )

    const topUpButton = (
        <Pressable onPress={onPress}>
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[styles.topUpBtn, style]}>
                        <Text style={styles.topUpText}>Top Up</Text>
                    </View>
                )
                
            }}
        </Pressable>
    )

    const addButton = (
        <Pressable onPress={onPress}>
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[styles.btnContainer, style]}>
                        <View style={styles.overlay}></View>
                        <AntDesignIcon name="plus" color="#0122AE"
                            style={styles.addBtn}
                        />
                    </View>
                )
                
            }}
        </Pressable>
    )

    return(
        <Card elevation={1} style={styles.card}>
            <Card.Content style={styles.content}>
                {textPrompt}
                {topUpButton}
            </Card.Content>
       </Card>
    )
}

const styles = StyleSheet.create({
    card:{},

    content:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title:{
        fontSize: 16,
        fontWeight: '600',
        marginTop: 3,
        letterSpacing: 0.75,
        lineHeight: 28,
        width: '100%'
    },
    caption:{
        letterSpacing: 0.75,
        color: '#6E7191',
    },

    btnContainer:{
        position: 'relative',
    },

    overlay:{
        backgroundColor: "#0122AE",
        opacity: 0.1,
        width: '100%',
        height: '100%',
        position: "absolute",
        borderRadius: 5,
    },

    addBtn:{
        padding: 5,
        fontSize: 30,
    },

    topUpBtn:{
        position: 'relative',
        backgroundColor: 'rgba(1, 34, 174, 0.1)',
        padding: 5,
        borderRadius: 5
    },

    topUpText:{
        color: '#0122AE',
        fontSize: 15,
        fontWeight: '600',
    }
})

export default AddBalance;