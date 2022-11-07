import React from 'react'
import { Text, View, StyleSheet , Image} from 'react-native'
// import icon from '../../assets/credit_card.png'
import InputLayout from '../components/LoanElements/LoanInputFields'
import Button from '../components/LoanElements/LoanButton'
import  Constants  from 'expo-constants'
const PayWithCreditCardScreen = () => {
  return (
  <View style={styles.main}>
    <View style={styles.card}>
  <Image source={require('../../assets/credit_card.png')} style={styles.img}/>
 

 
    </View>
    <View>
    <InputLayout Label={'Amount'} placeholder={'5000'} />
 <Button text={'CONTINUE TO PAY'}/>
    </View>
  
   
  </View>
  )
}
const styles = StyleSheet.create({
    main:{
        width:"100%",
        height:'100%',
        display:'flex',
        padding:20,
        paddingTop: Constants.statusBarHeight
       },
       card:{
        paddingTop: Constants.statusBarHeight,
        width:'100%'

       }, 
       img:{
        width:'100%',
        display:'flex'

       }
    
})

export default PayWithCreditCardScreen