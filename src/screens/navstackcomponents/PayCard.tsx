import React, { ReactNode } from 'react'
import { Image, Pressable, View ,StyleSheet,Text,PressableProps} from 'react-native'
import Svg from 'react-native-svg';
import Icons from 'react-native-vector-icons/FontAwesome'
interface Props extends PressableProps{
   imag?: ReactNode
   title?: string;

}


const PayCard = ({imag, title, ...props}: Props) => {
  return (
    <Pressable style={[styles.card,]}{...props} >
        {/* <Icons name={imag} color="#000000" size={20}/> */}
      
       {imag}
      
        <Text style={styles.title}>{title}</Text>

</Pressable>
  )
}
const styles = StyleSheet.create({
    card:{
        width: "100%",
        padding:20,
       
        marginTop:15,
       
        backgroundColor:'#FCFCFC',
        flexDirection:'row',
        borderRadius:5,
        
        shadowProp: {
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
          
        

    },
title:{
  color:'#14142B',
    fontSize:16,
    fontWeight:'500',
    fontStyle:'normal',
    marginLeft:20,

    

}

    
    
})

export default PayCard