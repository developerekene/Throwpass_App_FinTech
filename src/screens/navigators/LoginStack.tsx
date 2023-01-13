import react from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginMain from '../LoginMain'
import GetStartedScreen from '../GetStartedScreen'
import LoginMainBusiness from '../LoginMainBusiness'
import LoginMainIndividual from '../LoginMainIndividual'
import ForgotPassword from '../ForgotPassword'
import OTPScreenMain from '../OTPScreenMain'


const LoginMainStack = createStackNavigator()

const LoginStack: React.FC<any> = () => {
    return (
        <LoginMainStack.Navigator initialRouteName='GetStarted'>
            <LoginMainStack.Screen name='LoginMainS' component={LoginMain} options={{headerShown: false}}/>
            <LoginMainStack.Screen name='GetStarted' component={GetStartedScreen} options={{headerShown: false}}/>
            <LoginMainStack.Screen name='LoginMainB' component={LoginMainBusiness} options={{headerShown: false}}/>
            <LoginMainStack.Screen name='LoginMainI' component={LoginMainIndividual} options={{headerShown: false}}/>
            <LoginMainStack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown: false}}/>
            <LoginMainStack.Screen name='OTPScreen' component={OTPScreenMain} options={{headerShown: false}}/>
        </LoginMainStack.Navigator>
    )
}

export default LoginStack