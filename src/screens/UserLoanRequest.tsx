import React, { FC, useState , } from 'react'

import { View, Text , SafeAreaView, StatusBar, StyleSheet, ScrollView, Pressable } from 'react-native'

import Button from '../Components/LoanElements/LoanButton'

import doneIcon from 'react-native-vector-icons/MaterialIcons'
import InputLayout from '../Components/LoanElements/LoanInputFields'
import BasePicker from '../Components/elements/BasePicker'


import BankModalField from '../Components/elements/BankModalField'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/slices/store'
import { useBanks } from '../swr/banks'
import { LoanRequest } from '../types/requests'
import { setLoanRequest } from '../redux/slices/loanSlice'



interface Props {
   navigation:any;
}



 const UserHomeRequest= (prop: Props)=>{
  
   const [range, setRange]= useState(50)
   const [sliding, setSliding]= useState("Inactive")
   const [checked, setchecked]= useState(false)
   const [formState, setFormState]= useState<LoanRequest>({})
   // const { banks } = useSelector((state: RootState)=> state.thirdParty);
   const dispatch = useDispatch()
   const register = () => {
      console.log(formState)
      dispatch(setLoanRequest(formState))

   prop.navigation.navigate("UserLoanKYC")
      
   }
   
   
   const {data}= useBanks()
  
  
   // Handlers
   const handleChangeText = (key :keyof LoanRequest, value:string)=>{
      setFormState((prevState)=>({
         ...prevState,
         [key]:value
      }))

   }




    return (<SafeAreaView >
      <ScrollView>
      <View  style={styles.main}>
      <Text style={styles.first_text}>Don’t ever get stranded, get a transport loan today.</Text>
      <View style={styles.first_layer}>
        <InputLayout Label={"Full Name"} placeholder="Enter Name" onChangeText={(text)=>handleChangeText('customer_name', text)} />
        <InputLayout Label={"Address"} placeholder="Enter address" onChangeText={(text)=>handleChangeText('customer_address', text)}/>
        <InputLayout Label={"Phone Number"} placeholder="" keyboardType={'numeric'} onChangeText={(text)=>handleChangeText('customer_phone', text)}/>
        <View style={{
            marginVertical:10
        }}>
            <Text style={{
                 fontSize:16,
                 fontWeight:'500',
                 color:'#000000',
                 lineHeight:28,
                 letterSpacing:0.75,
                 marginBottom:8
            }}>Salary Bank</Text>
        <BankModalField options={data?.data}  valueCollector={(value,label)=> handleChangeText('bank_name',label || '')}/>
        
        </View>
       
        
        <InputLayout Label={"Salary Account Number"} placeholder="" keyboardType={'numeric'} onChangeText={(text)=>handleChangeText('account_number', text)}/>
      </View>
      <View style={styles.last_btn}> 
         
         <Button text={"CONTINUE"} onPress={register}/>
         
        
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
      width:"100%",
      },
   first_layer:{
      marginTop:20,

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
height:200,
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
},
last_btn:{
    marginTop:'10%'
}
   
 });

export default UserHomeRequest
