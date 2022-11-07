import React, { ReactNode } from 'react'
import { Image, Pressable, View ,StyleSheet,Text,PressableProps} from 'react-native'
import Svg from 'react-native-svg';
import Icons from 'react-native-vector-icons/FontAwesome'
interface Props extends PressableProps{
   imag?: ReactNode
   title?: string;

}


const CardStack = ({imag, title, ...props}: Props) => {
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
        width: "25%",
        padding:20,
        height:'100%',
        
        backgroundColor:'#FCFCFC',
        flexDirection:'column',
        borderRadius:5,
        
        shadowProp: {
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
          
        

    },
title:{
    color:'#0122AE',
    fontSize:8,
    fontWeight:'500',
    fontStyle:'normal',
    marginTop:20

}

    
    
})

export default CardStack