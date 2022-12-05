import React from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, Vibration, Alert } from 'react-native';
import ToBankAccountForm, { ToBankFormState } from '../Components/forms/ToBankAccountForm';
import { ConfirmRouteProps } from './ConfirmScreen';
import { BankFormState, mapBankStateToConfirmState } from '../utils/FormUtils';
import { ToSanwoPayScreenProps } from './ToSanwoPayScreen';
import { useBanks } from '../swr/banks';
import { useDispatch, useSelector } from 'react-redux';
import { loadBanks } from '../redux/slices/thirdPartySlice';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import DismissKeyboard from '../Components/DismissKeyboard';
import { RootState } from '../redux/slices/store';
import { loadBankState } from '../redux/slices/confirmSlice';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useHeaderHeight } from '@react-navigation/elements';
import { fetchFee } from '../swr/transaction';

const LoginImage = require('../../assets/login_image.png');

const DEFAULT_IMAGE = Image.resolveAssetSource(LoginImage).uri;

const ToBankScreen: React.FC<ToSanwoPayScreenProps> = ({ route, navigation })=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);
    const { auth, cookies } = useSelector((state: RootState)=> state.auth);

    // Redux
    const dispatch = useDispatch();

    // swr
    const { isLoading, isError, data } = useBanks();

    // Error alert
    const alertError = (message: string = 'An unknown error occurred')=>{
        Vibration.vibrate();
        Alert.alert(
            'Error',
            message,
            [
                { text: 'OK' }
            ]
        );
    }

    // Handlers
    const handleBankAccountSubmit = async (state?: ToBankFormState)=>{
        if (state) {
            setLoading(true);
            // Fetch Fee
            const { data, error } = await fetchFee((state.amount?.toString() || '0'), 'Transfer', auth?.token);
            if (data && data.status && data.data) {
                let fee = data.data;
                let updatedAmount: number = Number.parseFloat(state.amount?.toString() || '0') + fee;
                let updatedState: BankFormState = {...state, amount: updatedAmount.toString(), fee};
                dispatch(loadBankState(updatedState))
                let confirmState = mapBankStateToConfirmState(updatedState);
                console.log(confirmState);
                navigation?.navigate('Confirm', confirmState);
            }
            if (error) {
                console.log('Error');
                setLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    alertError(error.response.data.message);
                }
                else{
                    alertError();
                }
            }
        }
    }

    React.useEffect(()=>{
        if (isError) {
            console.log(isError);
            Vibration.vibrate();
            Alert.alert(
                'Error',
                'Could not load list of banks',
                [
                    { text: 'OK' }
                ]
            )
          }
      
          if (data && data.data) {
            dispatch(loadBanks(data.data))
          }
    },[isError, data])

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
                        <ToBankAccountForm onSubmit={handleBankAccountSubmit}
                            loadingCallback={setLoading}
                        />
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
                        <ToBankAccountForm onSubmit={handleBankAccountSubmit}
                            loadingCallback={setLoading}
                        />
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

export default ToBankScreen;