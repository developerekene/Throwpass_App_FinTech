import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
import DismissKeyboard from '../Components/DismissKeyboard';
import PhcnForm, { PhcnFormState } from '../Components/forms/PhcnForm';
import TvSubscriptionForm from '../Components/forms/TvSubscriptionForm';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import { RootState } from '../redux/slices/store';
import { usePowerBills } from '../swr/bills';
import { useHeaderHeight } from '@react-navigation/elements';
import { loadPhcnState } from '../redux/slices/confirmSlice';
import { mapPhcnFormStateToConfirmState } from '../utils/FormUtils';
import { TvSubscriptionScreenProps } from '../screens/TvSubcriptionScreen';

// Images
const airtelImage = require('../images/airtel.png');
const mtnImage = require('../images/mtn.png');
const gloImage = require('../images/glo.png');

const PhcnScreen: React.FC<TvSubscriptionScreenProps> = ({ navigation })=>{
    
    // Redux
    const { auth, user } = useSelector((state: RootState)=> state.auth);

    // swr
    const { isLoading, isError, data } = usePowerBills(auth?.token);

    // Hooks
    const dispatch = useDispatch();

    // Handlers
    const handleSubmit = (state?: PhcnFormState)=>{
        if (state) {
            dispatch(loadPhcnState(state))
            let confirmState = mapPhcnFormStateToConfirmState(state, `${user?.first_name} ${user?.last_name}`);
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
                <LoadingOverlay visible={isLoading} />
                <ScrollView>
                    {/** Form */}
                    <View>
                        <PhcnForm options={data?.data} onSubmit={handleSubmit}/>
                    </View>
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }

    return(
        <DismissKeyboard>
            <View style={styles.container}>
            <LoadingOverlay visible={isLoading}/>
                <ScrollView>
                    {/** Form */}
                    <View>
                    <PhcnForm options={data?.data} onSubmit={handleSubmit}/>
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

export default PhcnScreen;