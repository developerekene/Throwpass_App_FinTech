import React from 'react'
import { Pressable, StyleSheet, PressableProps , Image, View, Text} from 'react-native'
interface Props extends PressableProps{
  imag: any;
  amount?: string;
  name?: string;
  date?: string

}

const HistoryItem = ({imag, amount,name,date, ...props}: Props) => {
  return (
    <Pressable style={[styles.card,]}{...props}>
      
      <View style={styles.display_flex}>
      <Image source={imag} style={styles.img}/>
     <View style={{marginLeft:10}}>
     <Text style={styles.name}>{name}</Text>
     <Text style={styles.date}>{date}</Text>
     
    
     </View>
      </View>
      <View>
        <Text style={styles.amount}>{amount}</Text>
      </View>

      
      
    

    </Pressable>
  )
}

const styles = StyleSheet.create({
  card:{
      width: "100%",
      padding:10,
      marginTop:15,
      
      backgroundColor:'#FCFCFC',
      flexDirection:'row',
      borderRadius:5,
      justifyContent:'space-between',
      
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

},
flex_second:{
  display:'flex',
  flexDirection:'row',


},
display_flex:{
  display:'flex',
  flexDirection:'row',
  gap:10
},
name:{
  color:'#000000',
  fontSize:16,
  fontWeight:'600',
  fontStyle:'normal'
},
date:{
  color:'#6E7191',
  fontSize:12,
  fontStyle:'normal',
  fontWeight:'500',
  paddingTop:5

},
img:{
  height:50,
  width:50,
  borderRadius:40

},
amount:{
  color:'#00BA88',
  fontWeight:'600',
  fontSize:16,
}

  
  
})

export default HistoryItem