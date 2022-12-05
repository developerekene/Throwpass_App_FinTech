import React, { FC, useContext, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'

import ButtonComp from '../Components/LoanElements/LoanButton'
import ImagePicker from '../Components/elements/ImagePicker'
import LoadingOverlay from '../Components/LoanElements/LoadingOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/slices/store'
import { useBanks } from '../swr/banks'
import { LoanRequest } from '../types/requests'
import { setLoanRequest } from '../redux/slices/loanSlice'

import InputLayout from '../components/LoanElements/LoanInputFields'
import { applyForLoan } from '../swr/loan'
import ToastContext from '../components/context/ToastContext'
import LoadingContext from '../components/context/LoadingContext'
interface Props {
    navigation:any;
 }



const UserLoanKFC = (prop:Props) => {
  
   const {LoanRequest} = useSelector((state: RootState)=> state.loan)
   const {auth} = useSelector((state: RootState)=> state.auth)

   const showToast = useContext(ToastContext)
   const {setLoading}= useContext(LoadingContext)
   const [formState, setFormState]= useState<LoanRequest>({...LoanRequest})
   const  register = async() => {
   setLoading(true)
     console.log(formState)
     
     const {data,error}= await applyForLoan(formState, auth?.token)
     if(data && data.status){
      setLoading(false)
     showToast && showToast("success","KYC Submitted ")
    
     prop.navigation.navigate("LoanAmount")
     

     }

     if(error){
      setLoading(false)
      Alert.alert("Error",error.response?.data.message|| "An unknown error occurred while submitting your kyc")
      // showToast && showToast("error",error.response?.data.message|| "An unknown error occurred while submitting your kyc")

     }

     
     
      

   }




   //Handler

   const handleChangeText = (key :keyof LoanRequest, value:string)=>{
      setFormState((prevState)=>({
         ...prevState,
         [key]:value
      }))

   }



   return (<SafeAreaView >
      <ScrollView >
         <View style={styles.main}>
            {
               //Ekene User Loan Screen
            }
            <Text style={styles.first_text}>Fill the following form to enable us approve your loan</Text>
            <View style={{ marginTop: 20 }}>
               <InputLayout Label={"BVN"} placeholder="" keyboardType={'numeric'} onChangeText={(text)=>handleChangeText('bvn', text)}/>
               <InputLayout Label={"Where do you work"} placeholder="" onChangeText={(text)=>handleChangeText('company_name', text)}/>
               <InputLayout Label={"HR's Name"} placeholder="" onChangeText={(text)=>handleChangeText('hr_name', text)} />
               {/* <ImagePicker /> */}
               <InputLayout Label={"HR's Phone Number"} placeholder="" keyboardType={'numeric'} onChangeText={(text)=>handleChangeText('hr_phone', text)}/>
               
            </View>
            <View style={styles.last_btn}>
               <ButtonComp text={"CONTINUE"}  onPress={register}/>
            </View>
         </View>
      </ScrollView>


   </SafeAreaView>)
}
const styles = StyleSheet.create({
   main: {
      paddingTop: "10%",
      paddingHorizontal: "8%",
      paddingBottom:'10%',
      backgroundColor:'#fcfcfc'

   },
   first_text: {
      fontSize: 16,
      lineHeight: 24,
      fontStyle: "normal",
      fontWeight: "400",
      color: '#000000',
     
      width:  "100%",
      marginBottom: 24

     


   },
   first_layer: {
      marginTop: '5%',

   },
   loan_amount: {
      fontWeight: "500",
      lineHeight: 28,
      fontSize: 14,
      textAlignVertical: "bottom"



   },
   oan_amount: {
      fontWeight: "600",
      lineHeight: 28,
      fontSize: 14,
      textAlignVertical: "bottom",
      color: "#000000",




   },
   slider: {
      width: '100%',
      height: 70,
   },
   bottom_txt: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   btm_text: {
      fontSize: 10,
      fontWeight: '500',
      fontStyle: 'normal',
      lineHeight: 28,
      color: '#000000',
      letterSpacing: 0.75,
      textAlignVertical: 'bottom'

   },
   horizontal: {
      backgroundColor: '#d6d8e7',
      height: 2,
      marginTop: "10%"
   },
   interest_rate: {
      color: '#000000',
      fontSize: 16,
      lineHeight: 28,
      letterSpacing: 0.75,
      textAlignVertical: 'bottom',
      marginTop: '7%',
      marginBottom: '1%'

   },
   borrow_text: {
      color: '#000000',
      width: 327,
      fontWeight: '400',
      lineHeight: 28,
      letterSpacing: 0.75,
      fontSize: 14,
      textAlignVertical: 'bottom',
      marginTop: '3%',



   },
   btn_area: {
      marginTop: '7%'
   },
   last_btn: {
      marginTop: '10%'
   }

});

export default UserLoanKFC
