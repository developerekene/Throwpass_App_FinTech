import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import {Asset, ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CameraSvg from '../../icons/camera';
import CloseSvg from '../../icons/close';
import TextField, { TextFieldProps } from './TextField';


const ImagePicker: React.FC<TextFieldProps> = ({ valueCollector, ...props })=>{

    // State
    const [selectedImage, setSelecetdImage] = React.useState<string>('');

    // Handlers
    const options: ImageLibraryOptions = {
        mediaType: 'photo', quality: 1
    }
    const handlePress = async ()=>{
        const result = await launchImageLibrary(options);
        if (result) {
            let defaultAsset: Asset = {};
            setSelecetdImage((result.assets && result.assets[0].fileName) ? result.assets[0].fileName : '')
            valueCollector && valueCollector(result.assets ? result.assets[0] : defaultAsset)
        }
    }
    const handleAdornmentPress = ()=>{
        console.log(selectedImage);
        setSelecetdImage('');
        valueCollector && valueCollector('');
    }

    let cameraAdorment = (
        <Pressable onPress={handlePress}>
            <CameraSvg/>
        </Pressable>
    );

    return(
        <TextField
            icon={cameraAdorment}
            value={selectedImage}
            inputStyle={styles.input}
            style={styles.field}
            placeholder={'Choose Image'}
            editable={false}
            useDefaultAdornment
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    field:{ 
        paddingVertical: 0 
    },
    input:{
        borderLeftWidth: 2,
        borderColor: '#D6D8E7',
        paddingVertical: Platform.OS === 'ios'? 15 : 13,
        paddingLeft: 15,
    }
})

export default ImagePicker;