import React from 'react'
import { Pressable, StyleSheet, PressableProps , Image, View, Text} from 'react-native'
interface Props extends PressableProps{
  imag?: any;
 
  title?: string;
  

}
const ProfileItem = ({imag,title, ...props}: Props) => {
  return (
    <Pressable style={[styles.card,]}{...props}>
        <View>
            {imag}
        </View>
        <View>
            <Text style={styles.title}>
            {title}
            </Text>
           
        </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    card:{
        width: "100%",
        padding:10,
        marginTop:5,
        
       
        flexDirection:'row',
        borderRadius:5,
       
       
        
  
    },
    title:{
        marginLeft:15,
        fontSize:16,
       fontWeight:'400',
       color:'#4F4F4F'
       
        
        
        
       

    }
    
})

export default ProfileItem