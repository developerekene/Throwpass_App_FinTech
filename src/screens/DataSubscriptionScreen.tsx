import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
import DismissKeyboard from '../Components/DismissKeyboard';
import DataSubscriptionForm, { DataSubscriptionFormState } from '../Components/forms/DataSubscriptionForm';
import LoadingOverlay from '../components/LoanElements/LoadingOverlay';
// import { RootState } from '../redux/store';
import { RootState } from '../redux/slices/store';
import { use9moblileDataPackages, useAirtelDataPackages, useGloDataPackages, useMtnDataPackages } from '../swr/bills';
import { BillsResponseData } from '../types/responses';
import { useHeaderHeight } from '@react-navigation/elements';
import { loadDataSubscriptionState } from '../redux/slices/confirmSlice';
import { mapDataSubcriptionStateToConfirmState } from '../utils/FormUtils';
import { TvSubscriptionScreenProps } from '../screens/TvSubcriptionScreen';

// Images
const airtelImage = require('../images/airtel.png');
const mtnImage = require('../images/mtn.png');
const gloImage = require('../images/glo.png');
const nineImage = require('../images/9mobile.png');

const DataSubscriptionScreen: React.FC<TvSubscriptionScreenProps> = ({ navigation })=>{
    
    // Redux
    const { auth, user } = useSelector((state: RootState)=> state.auth);

    // swr
    const { isLoading, isError, data } = useAirtelDataPackages(auth?.token);
    const mtnResult = useMtnDataPackages(auth?.token);
    const gloResult = useGloDataPackages(auth?.token);
    const NineMobileResult = use9moblileDataPackages(auth?.token);

    type Operator = 'airtel' | 'mtn' | 'glo' | '9mobile';

    //State
    const [operator, setOperator] = React.useState<Operator>();
    const [options, setOptions] = React.useState<BillsResponseData[]>([]);

    // Hooks
    const dispatch = useDispatch();

    // Handlers
    const handleSubmit = (state?: DataSubscriptionFormState)=>{
        if (state) {
            state.operator = operator;
            dispatch(loadDataSubscriptionState(state))
            let confirmState = mapDataSubcriptionStateToConfirmState(state, `${user?.first_name} ${user?.last_name}`);
            console.log(confirmState);
            navigation?.navigate('Confirm', confirmState);
        }
    }

    // Handlers
    const toggleAirtelSelect = ()=>{
        if (operator === 'airtel') {
            setOperator(undefined);
        }
        else{
            setOperator('airtel');
            setOptions(data?.data || []);
        }
    }
    const toggleMtnSelect = ()=>{
        if (operator === 'mtn') {
            setOperator(undefined);
        }
        else{
            setOperator('mtn');
            setOptions(mtnResult.data?.data || []);
        }
    }
    const toggleGloSelect = ()=>{
        if (operator === 'glo') {
            setOperator(undefined);
        }
        else{
            setOperator('glo');
            setOptions(gloResult.data?.data || []);
        }
    }
    const toggle9mobileSelect = ()=>{
        if (operator === '9mobile') {
            setOperator(undefined);
        }
        else{
            setOperator('9mobile');
            setOptions(NineMobileResult.data?.data || []);
        }
    }

    if (Platform.OS === 'ios') {
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.container}
                keyboardVerticalOffset={getStatusBarHeight() + useHeaderHeight()}
            >
                <LoadingOverlay visible={isLoading || mtnResult.isLoading || gloResult.isLoading || NineMobileResult.isLoading}/>
                <ScrollView>
                    {/** Choose operator */}
                    <View style={styles.titleArea}>
                        <Text style={styles.operatorTitle}>Choose your operator</Text>
                    </View>

                    {/** Operator list */}
                    <View style={styles.operatorContainer}>
                    <TouchableOpacity style={styles.imageFrame} activeOpacity={0.5}
                            onPress={toggleAirtelSelect}
                        >
                            { operator === 'airtel' && <View style={styles.overlay}></View> }
                            <Image source={airtelImage} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}
                            onPress={toggleMtnSelect}
                        >
                            { operator === 'mtn' && <View style={styles.overlay}></View> }
                            <Image source={mtnImage} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}
                            onPress={toggleGloSelect}
                        >
                            { operator === 'glo' && <View style={styles.overlay}></View> }
                            <Image source={gloImage} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}
                            onPress={toggle9mobileSelect}
                        >
                            { operator === '9mobile' && <View style={styles.overlay}></View> }
                            <Image source={nineImage} style={styles.image}/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}>
                            <Image source={airtelImage} style={styles.image}/>
                        </TouchableOpacity> */}
                    </View>

                    {/** Form */}
                    {operator && <View>
                        <DataSubscriptionForm options={options} onSubmit={handleSubmit}/>
                    </View>}
                 </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }

    return(
        <DismissKeyboard>
            <View style={styles.container}>
            <LoadingOverlay visible={isLoading || mtnResult.isLoading || gloResult.isLoading || NineMobileResult.isLoading}/>
                <ScrollView>

                    {/** Choose operator */}
                    <View style={styles.titleArea}>
                        <Text style={styles.operatorTitle}>Choose your operator</Text>
                    </View>

                    {/** Operator list */}
                    <View style={styles.operatorContainer}>
                    <TouchableOpacity style={styles.imageFrame} activeOpacity={0.5}
                            onPress={toggleAirtelSelect}
                        >
                            { operator === 'airtel' && <View style={styles.overlay}></View> }
                            <Image source={airtelImage} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}
                            onPress={toggleMtnSelect}
                        >
                            { operator === 'mtn' && <View style={styles.overlay}></View> }
                            <Image source={mtnImage} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}
                            onPress={toggleGloSelect}
                        >
                            { operator === 'glo' && <View style={styles.overlay}></View> }
                            <Image source={gloImage} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}
                            onPress={toggle9mobileSelect}
                        >
                            { operator === '9mobile' && <View style={styles.overlay}></View> }
                            <Image source={nineImage} style={styles.image}/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.imageFrame, styles.leftMargin]} activeOpacity={0.5}>
                            <Image source={airtelImage} style={styles.image}/>
                        </TouchableOpacity> */}
                    </View>

                    {/** Form */}
                    {operator && <View>
                        <DataSubscriptionForm options={options} onSubmit={handleSubmit}/>
                    </View>}
                    
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

    titleArea:{
        marginBottom: 8,
    },

    operatorTitle:{
        fontWeight: '600',
        lineHeight: 24,
        color: '#6E7191',
        fontSize: 16,
    },

    operatorContainer:{
        flexDirection: 'row',
        marginBottom: 15,
    },
    imageFrame:{
        height: 63,
        width: 80,
        //backgroundColor: 'red',
        padding: 0,
        borderRadius: 4
    },

    image:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },

    leftMargin:{
        marginLeft: 6
    },

    overlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "gray",
        opacity: 0.5,
        zIndex: 5,
        borderRadius: 4,
    },
})

export default DataSubscriptionScreen;