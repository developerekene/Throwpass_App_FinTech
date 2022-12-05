import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import DataBoxGrid from '../Components/DataBoxGrid';
import KycPrompt from '../Components/LoanElements/KycPrompt';
import { RootState } from '../redux/slices/store';

const danfo = require('../images/danfo.png');

const HomeScreen: React.FC<any> = ()=>{

    // Redux
    const { user } = useSelector((state: RootState)=> state.auth);

    return(
        <View style={styles.container}>
            {/* <KycPrompt visible={!user?.activate}/> */}
            <ImageBackground source={danfo} resizeMode='contain' style={styles.image}>
                <DataBoxGrid/>
            </ImageBackground>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
})


export default HomeScreen;