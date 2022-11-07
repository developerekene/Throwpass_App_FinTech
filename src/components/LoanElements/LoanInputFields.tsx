import React from 'react'
import { useState } from 'react'
import { Pressable, StyleSheet ,View ,Text, TextInput, TextInputProps} from 'react-native'

interface Props extends TextInputProps{
    Label: String
   
   
}

function InputLayout({placeholderTextColor= "#A0A3BD",Label,...props }: Props) {
    
   return (<>
   <View >
    <Text style={styles.input_label}>{Label}</Text>
        <TextInput style={[styles.input,props.style]} placeholderTextColor={placeholderTextColor} {...props}/>
    </View>
   </>)

}

const styles = StyleSheet.create({
    input:{
        width:"100%",
        alignItems:'center',
       
      paddingVertical:"5.3%",
      
      flex:1,
        borderRadius:13,
        backgroundColor:"#EFF0F6",
        borderWidth:0,
        marginTop:'4%',
        marginBottom:'3%',
        fontSize:16,
        fontStyle:'normal',
        letterSpacing:0.75,
        paddingHorizontal:'5%'
       
       
    },
    input_label:{
       
        fontSize:16,
        fontWeight:'500',
        color:'#000000',
        lineHeight:28,
        letterSpacing:0.75,
       
        



    }

})
  

export default InputLayout