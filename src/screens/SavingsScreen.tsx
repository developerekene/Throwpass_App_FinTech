import React from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StartScreenProps } from './StartScreen';
import ToSanwoPayForm, { ToSanwoFormState } from '../Components/forms/ToSanwoPayForm';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToBankAccountForm, { ToBankFormState } from '../Components/forms/ToBankAccountForm';
import { ConfirmRouteProps } from './ConfirmScreen';
import { mapBankStateToConfirmState, mapPersonalSavingsStateToConfirmState, mapSanwoStateToConfirmState } from '../utils/FormUtils';
import PersonalSavingsForm, { PersonalSavingsState } from '../Components/forms/PersonalSavingsForm';
import InstallmentSavingsForm from '../Components/forms/InstallmentSavingsForm';
import DismissKeyboard from '../Components/DismissKeyboard';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useHeaderHeight } from '@react-navigation/elements';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { loadPersonalSavingsState } from '../redux/slices/confirmSlice';
import { RootState } from '../redux/slices/store';
const LoginImage = require('../../assets/login_image.png');

const DEFAULT_IMAGE = Image.resolveAssetSource(LoginImage).uri

export interface ToSendMoneyScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params:{
            savingType?: 'personal' | 'group' | 'installment';
        }
    }>
}

const SaveMoneyScreen: React.FC<ToSendMoneyScreenProps> = ({ route, navigation })=>{

    const destination = route?.params.savingType;

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Hooks
    const dispatch = useDispatch();

    // Redux
    const { user } = useSelector((state: RootState)=> state.auth);

    // Handlers
    const handleSubmit = (state?: PersonalSavingsState)=>{
        if (state) {
            dispatch(loadPersonalSavingsState(state))
            let confirmState = mapPersonalSavingsStateToConfirmState(state, user?.mobile);
            console.log(confirmState);
            navigation?.navigate('Confirm', confirmState);
        }
    }

    React.useLayoutEffect(()=>{
        if (destination && destination === 'group') {
            navigation?.setOptions({ title: 'Group Savings' })
        }
        if (destination && destination === 'installment') {
            navigation?.setOptions({ title: 'Installment' })
        }
    },[])

    if (Platform.OS === 'ios') {
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.container}
                keyboardVerticalOffset={getStatusBarHeight() + useHeaderHeight()}
            >
                <LoadingOverlay visible={loading} />
                <ScrollView>
                    <View>
                        { 
                            (destination && destination === 'personal') && 
                            <PersonalSavingsForm loadingCallback={setLoading} onSubmit={handleSubmit}/>
                        }
                        { 
                            (destination && destination === 'group') && 
                            <PersonalSavingsForm/>
                        }
                        { 
                            (destination && destination === 'installment') && 
                            <InstallmentSavingsForm/>
                        }
                    </View>
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }
    
    return(
        <DismissKeyboard>
           <View style={styles.container}>
           <LoadingOverlay visible={loading} />
            <ScrollView>
                    <View>
                        { 
                            (destination && destination === 'personal') && 
                            <PersonalSavingsForm loadingCallback={setLoading} onSubmit={handleSubmit}/>
                        }
                        { 
                            (destination && destination === 'group') && 
                            <PersonalSavingsForm/>
                        }
                        { 
                            (destination && destination === 'installment') && 
                            <InstallmentSavingsForm/>
                        }
                    </View>
            </ScrollView>
           </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 10,
        flexDirection: 'column',
        //justifyContent: 'center',
        paddingVertical: '5%',
    },

    formContainer:{
        marginTop: '10%'
    }
})

export default SaveMoneyScreen;