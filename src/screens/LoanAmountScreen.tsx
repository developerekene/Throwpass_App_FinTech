import React, { FC, useState , useContext} from 'react'
import { View, Text , SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native'
import  CheckBox  from '@react-native-community/checkbox'
import { Slider } from '@miblanchard/react-native-slider'
import Button from '../Components/LoanElements/LoanButton'

import doneIcon from 'react-native-vector-icons/MaterialIcons'
import InputLayout from '../Components/LoanElements/LoanInputFields'
import { CustomerApplyForLoanRequest, LoanRequest } from '../types/requests'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/slices/store'
import useInterest from '../components/hooks/useInterest'
import { submitLoanRequest } from '../swr/loan'
import ToastContext from '../components/context/ToastContext'
import LoadingContext from '../components/context/LoadingContext'



interface Props {
   navigation:any;
}

 const LoanAmount= (prop:Props)=>{
    const {auth}= useSelector((state: RootState)=> state.auth)
   const [range, setRange]= useState(0)
   const [duration, setDuration]= useState(0)
   const [sliding, setSliding]= useState("Inactive")
   const [checked, setchecked]= useState(false)
   const {LoanRequest}= useSelector((state: RootState)=>{
           return state.loan
   })
   const {setLoading}= useContext(LoadingContext)

   const showToast = useContext(ToastContext)


   let [interest, message] = useInterest(range,duration)

   const register = () => {
      let request: LoanRequest= {}

   }
    const handleAmountChange = (value:number|number[])=>{
      setRange(value as number) 

    }
    const handleDurationChange = (value:number| number[])=>{
      setDuration(value as number)


    }
     
     const handleSubmitLoan = async()=>{
      setLoading(true)
       let request : CustomerApplyForLoanRequest= {
         principal_amount:range.toString(),
         duration: duration.toString()
       }
      const {data,error}= await submitLoanRequest(request, auth?.token)
       if(data && data.status){
         setLoading(false)
         showToast && showToast("success", "Loan request Submitted successfully")
         prop.navigation.navigate("LoanKyc")

       }
       if(error){
         setLoading(false)
         showToast && showToast("error", error.response?.data.message || "An unknown error occurred while submitting loan request")
       }

     }
   
   
    return (<SafeAreaView >
      <ScrollView>
      <View style={styles.main}>
      <Text style={styles.first_text}>Select the appropriate amount and duration of your loan.</Text>
      <View style={styles.first_layer}>
         <Text style={styles.loan_amount}>Loan Amount</Text>
         <Text style={styles.oan_amount}>NGN {range}</Text>
         <Slider
         minimumTrackTintColor='#0122ae'
         maximumTrackTintColor='#d6d8e7'
         thumbTintColor='#0122ae'
         step={500}
         onValueChange={handleAmountChange}
         maximumValue={30000}
         minimumValue={0}
        value={range}
         
         />
         <View style={styles.bottom_txt}>
            <Text style={styles.btm_text}>NGN 0</Text>
            <Text style={styles.btm_text}>NGN 30,000.00</Text>
         </View>
         
       
      </View>
      <View style={styles.first_layer}>
         <Text style={styles.loan_amount}>Repayment Period</Text>
         <Text style={styles.oan_amount}>{duration} Days</Text>
         <Slider
         maximumValue={30}
         minimumValue={0}
         step={1}
        value={duration}
         minimumTrackTintColor='#0122ae'
         maximumTrackTintColor='#d6d8e7'
         thumbTintColor='#0122ae'
         onValueChange={handleDurationChange}
         
        //  value={.5}
      
         
         />
         
        
         <View style={styles.bottom_txt}>
            <Text style={styles.btm_text}>0 days</Text>
            <Text style={styles.btm_text}>30 days</Text>
            
         </View>
      </View>
      <View style={styles.horizontal} ></View>
      <Text style={styles.interest_rate}>Interest rate  for {duration} days</Text>
      <Text style={styles.oan_amount}>NGN {interest}</Text>
      <Text style={styles.borrow_text}>{message
      }</Text>
   
          
       
          {/* <CheckBox
          tintColor='#000000'
       
        /> */}
          <View style={styles.btn_area}>
         <Button text={"SUBMIT REQUEST"} onPress={handleSubmitLoan} disabled={!range || !duration}/>
          </View>
        
        
 
      </View>
      </ScrollView>
     
   
    </SafeAreaView>)
 }
 const styles = StyleSheet.create({
   main:{
      paddingTop:"10%",
      paddingHorizontal:"8%",
      backgroundColor:'#fcfcfc'

   },
   first_text:{
      fontSize:16,
      lineHeight:24,
     fontStyle:"normal",
      fontWeight:"400",
      color:'#000000',
     width:"100%"


     
   },
   first_layer:{
      marginTop:'5%',

   },
loan_amount:{
   fontWeight:"500",
   lineHeight:28,
   fontSize:14,
   textAlignVertical:"bottom"
   


},
oan_amount:{
   fontWeight:"600",
   lineHeight:28,
   fontSize:14,
   textAlignVertical:"bottom",
   color:"#000000",
   
   


},
slider:{
width:'100%',
height:70,
},
bottom_txt:{
   display:'flex',
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between'
},
btm_text:{
   fontSize:10,
   fontWeight:'500',
   fontStyle:'normal',
   lineHeight:28,
   color:'#000000',
   letterSpacing:0.75,
   textAlignVertical:'bottom'

},
horizontal:{
   backgroundColor:'#d6d8e7',
   height:2,
   marginTop:"10%"
},
interest_rate:{
   color:'#000000',
   fontSize:16,
   lineHeight:28,
   letterSpacing:0.75,
   textAlignVertical:'bottom',
   marginTop:'7%',
   marginBottom:'1%'

},
borrow_text:{
   color:'#000000',
   width:327,
   fontWeight:'400',
   lineHeight:28,
   letterSpacing:0.75,
   fontSize:14,
   textAlignVertical:'bottom',
   marginTop:'3%',
   


},
btn_area:{
   marginTop:'7%'
}
   
 });

export default LoanAmount
