import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

export interface TestScreenParams{
    value?: string
}

export interface TestScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params: TestScreenParams
    }>
}

const TestScanResult: React.FC<TestScreenProps> = ({ route })=>{

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{route?.params.value || 'No result'}</Text>
        </View>
    )
}

export default TestScanResult;