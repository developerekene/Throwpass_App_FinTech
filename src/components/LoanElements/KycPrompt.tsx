import { Card } from 'react-native-paper';
import React from 'react';
import { View, Modal, Text, FlatList, StyleSheet, Pressable, StyleProp, TextStyle } from 'react-native';
import transaction from '../../icons/transaction';
import BankSearchTextField from '../elements/BankSearchTextField';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export interface KycPromptProps{
    visible?: boolean;
}

const KycPrompt: React.FC<KycPromptProps> = ({ visible = false })=>{

    // State
    const [open, setOpen] = React.useState<boolean>(false);

    // Redux
    const { user } = useSelector((state: RootState)=> state.auth);

    // Hooks
    const navigation = useNavigation<any>();

    // Handlers
    const gotoKycRegistration = ()=>{
        navigation.navigate('KycScreen');
        //navigation.navigate('Profile', { screen: 'KycScreen' });
    }

    const RightArrowIcon =( 
        <AntIcon 
            name="arrowright" 
            size={18} 
            style={{
                marginLeft: 10,
                paddingTop: 3,
                color: '#0122AE'
            }}
        />
    )

    const registerButton = (
        <Pressable onPress={gotoKycRegistration}>
            {({ pressed })=>{
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return (
                    <View style={styles.register}>
                        <Text style={[styles.registerText, style]}>
                            KYC Registration
                        </Text>
                        {RightArrowIcon}
                    </View>
                )
            }}
        </Pressable>
    )

    return(
        <Modal
            animationType="fade"
            visible={visible}
            transparent={true}
        >
            <View style={styles.modal}>
                <Card elevation={1} style={styles.card}>
                    <Card.Content style={styles.content}>
                        {/** Text Propmt */}
                        <View>
                            {/** Title */}
                            <Text style={styles.title}>
                                {`Hello ${user?.first_name}`}
                                {"\n"}
                            </Text>
                            <Text style={styles.prompt}>
                                Please complete your kyc registration to help us create a secured access 
                                bank virtual account for a wonderful experience.
                            </Text>
                        </View>

                        {/** Button */}
                        <View style={styles.buttonContainer}>
                            { registerButton }
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    modal:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25
    },

    card:{
        borderRadius: 8,
    },

    content:{},

    title:{
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center'
    },

    prompt:{
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center'
    },

    buttonContainer:{
        alignSelf: 'center',
        marginTop: 40,
    },

    registerText:{
        color: '#0122AE',
        fontWeight: '600',
        letterSpacing: 0.75,
        lineHeight: 28,
        fontSize: 16,
    },

    register:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 10,

    }
})

export default KycPrompt;