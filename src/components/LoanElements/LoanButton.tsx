import { NavigationAction } from '@react-navigation/native'
import React, { FC } from 'react'
import { Pressable, StyleSheet ,View ,Text, PressableProps} from 'react-native'

interface btnprop extends PressableProps{
    text: String,

    
   
}

function Button({text, ...props}: btnprop) {
   return (<React.Fragment>
     <Pressable  style={[styles.btn, ]} {...props}  >
        <Text style={styles.btn_font}>{text}</Text>
    </Pressable>
   </React.Fragment>)

}

const styles = StyleSheet.create({
    btn:{
        width:"100%",
        alignItems:'center',
        textAlign:'center',
      paddingVertical:"5.3%",
      marginBottom:20,
      
        flex:1,
        borderRadius:13,
        backgroundColor:'#0122ae',
       
    },
    btn_font:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'600',
        color:'#FCFCFC'

    }

})
  

export default Button