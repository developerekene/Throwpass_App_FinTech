import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHomeRequest from "../../screens/UserLoanRequest";
import LoanAmount from "../../screens/LoanAmountScreen";
import UserLoanKFC from "../../screens/UserLoanKYC";
import LoanKY from "../../screens/LoanKY";






const LoanStack = createNativeStackNavigator()
const LoanScreens = ()=>{
   return (<LoanStack.Navigator>

<LoanStack.Screen name="LoanReques" component={UserHomeRequest}
          options={({ navigation, route })=>({
            headerTitleAlign: "center",
            title: "Loan Request",
            
          })}
        />
        
        <LoanStack.Screen name="UserLoanKYC" component={UserLoanKFC}
          options={({ navigation, route })=>({
            headerTitleAlign: "center",
            title: "Loan KYC",
            
          })}
          
        />
        <LoanStack.Screen name="LoanAmount" component={LoanAmount}
          options={({ navigation, route })=>({
            headerTitleAlign: "center",
            title: "Loan Request",
            
          })}

        />
        <LoanStack.Screen name="Loan Kyc" component={LoanKY}
          options={({ navigation, route })=>({
            headerTitleAlign: "center",
           
            
          })}

        />
      
      
        
        
       
    </LoanStack.Navigator>)

}
export default LoanScreens