import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingOverlayProps{
    text?: string;
    visible?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ text = 'Loading...', visible = false })=>{

    if (visible) {
        return(
            <View style={[styles.container]}>
                <ActivityIndicator/>
                <Text>{text}</Text>
            </View>
        )
    }
    else{
        return null;
    }
    
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        zIndex: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        opacity: 0.9,
    },
})

export default LoadingOverlay;