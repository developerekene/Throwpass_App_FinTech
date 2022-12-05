import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DismissKeyboard from '../Components/DismissKeyboard';
import PersonalWithdrawalForm, { PersonalWithdrawalState } from '../Components/forms/PersonalWithdrawalForm';
import LoadingOverlay from '../components/LoanElements/LoadingOverlay';
import { loadPersonalWithdrwalState } from '../redux/slices/confirmSlice';
import { mapPersonalWithdrawalStateToConfirmState } from '../utils/FormUtils';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ToSanwoPayForm from '../Components/forms/ToSanwoPayForm';
import { useHeaderHeight } from '@react-navigation/elements';
import { RootState } from '../redux/slices/store';

const WithdrawalScreen: React.FC<NativeStackHeaderProps> = ({ navigation, route })=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Hooks
    const dispatch = useDispatch();

    // Redux
    const { user } = useSelector((state: RootState)=> state.auth);

    // Handlers
    const handlePersonalWithdrawal = (state?: PersonalWithdrawalState)=>{
        if (state) {
            dispatch(loadPersonalWithdrwalState(state));
            let confirmState = mapPersonalWithdrawalStateToConfirmState(state, user?.mobile);
            console.log(confirmState);
            navigation?.navigate('Confirm', confirmState);
        }
    }

    if (Platform.OS === 'ios') {
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.container}
                keyboardVerticalOffset={getStatusBarHeight() + useHeaderHeight()}
            >
                <LoadingOverlay visible={loading} />
                <ScrollView>
                    {/** Form */}
                    <View>
                        <PersonalWithdrawalForm onSubmit={handlePersonalWithdrawal} loadingCallback={setLoading} />
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
                    {/** Form */}
                    <View>
                        <PersonalWithdrawalForm onSubmit={handlePersonalWithdrawal} loadingCallback={setLoading} />
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
})

export default WithdrawalScreen;