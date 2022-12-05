import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DismissKeyboard from '../Components/DismissKeyboard';
import TvSubscriptionForm, { TvSubscriptionFormState } from '../Components/forms/TvSubscriptionForm';
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay';
import { RootState } from '../redux/slices/store';
import { useDstvBills, useGotvBills, useStartTimesBills } from '../swr/bills';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useHeaderHeight } from '@react-navigation/elements';
import { loadTvSubscriptionState } from '../redux/slices/confirmSlice';
import { mapTvSubscriptionStateToConfirmState } from '../utils/FormUtils';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Images
const airtelImage = require('../images/airtel.png');
const mtnImage = require('../images/mtn.png');
const gloImage = require('../images/glo.png');

export interface TvSubscriptionScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<any>
}

const TvSubscriptionScreen: React.FC<TvSubscriptionScreenProps> = ({ navigation })=>{
    // Redux
    const { auth, user } = useSelector((state: RootState)=> state.auth);

    // swr
    const { isLoading, isError, data } = useDstvBills(auth?.token);
    const gotvResult = useGotvBills(auth?.token);
    const stResult = useStartTimesBills(auth?.token);


    // Hooks
    const dispatch = useDispatch();

    // Handlers
    const handleSubmit = (state?: TvSubscriptionFormState)=>{
        if (state) {
            dispatch(loadTvSubscriptionState(state))
            let confirmState = mapTvSubscriptionStateToConfirmState(state, `${user?.first_name} ${user?.last_name}`);
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
                <LoadingOverlay visible={isLoading || gotvResult.isLoading || stResult.isLoading } />
                <ScrollView>
                    <View>
                    <TvSubscriptionForm 
                        dstvOptions={data?.data}
                        gotvOptions={gotvResult.data?.data}
                        starTimesOptions={stResult.data?.data}
                        onSubmit={handleSubmit}
                    />
                    </View>
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }

    return(
        <DismissKeyboard>
            <View style={styles.container}>
                <LoadingOverlay visible={isLoading || gotvResult.isLoading || stResult.isLoading}/>
                <ScrollView>
                    {/** Form  */}
                    <View>
                        <TvSubscriptionForm 
                            dstvOptions={data?.data}
                            gotvOptions={gotvResult.data?.data}
                            starTimesOptions={stResult.data?.data}
                            onSubmit={handleSubmit}
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
})

export default TvSubscriptionScreen;