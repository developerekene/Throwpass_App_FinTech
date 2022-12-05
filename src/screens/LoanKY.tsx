import React from 'react'
import { View, Text, Image , StyleSheet, Pressable, ScrollView} from 'react-native'
import DoneSvg from '../icons/DoneSvg'
import * as Progress from 'react-native-progress'

import doneAnim from '../../assets/animations/done.json'
import AnimatedLottieView from 'lottie-react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
interface Props {
  navigation:any;
}
const LoanKY=(prop:Props)=> {
  const register = () => prop.navigation.navigate("Main")
  return (
    <ScrollView>
      <View style={styles.main}>
     
     {/* <Image source={require('../../assets/done.png'
    
)} style={styles.img}/> */}


<View>

<AnimatedLottieView source={doneAnim} autoPlay loop={false} style={styles.animation}/>
</View>


     
     <Text style={styles.middle}>  Your request has been declined, kindly carry out more transactions on the Sanwopay app to be eligible for a transport loan.</Text>
     <Pressable style={styles.button} onPress={register}>
       <MaterialIcons name='keyboard-backspace' color={'#0122AE'} size={30} />
     
       <Text style={styles.btn_tx}>Go Back Home</Text>

     </Pressable>
   </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  img:{
    
    marginTop:'30%'
  },
  main:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  title_txt:{
    marginTop:30,
    fontWeight:"600",
    letterSpacing:1,
    textAlignVertical:'center',
    lineHeight:32,
    fontStyle:'normal',
    fontSize:24,
    color:'#000000'

  },
  middle:{
    fontSize:20,
    fontStyle:'normal',
    color:'#000000',
    lineHeight:32,
    letterSpacing:1,
    fontWeight:'400',
    alignItems:'center',
    marginTop:40,
    textAlign:'center',
    
    width:"70%"

    // "80%"

  },
  button:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    marginTop:80,
  
  

  },
  btn_tx:{
    marginLeft:7,
    fontSize:15,
    color:'#0122AE'
  },
 animation:{
  width:150,
  height:150,
  color:'#00ba88',
  marginTop:'25%'
 }

})
export default LoanKY