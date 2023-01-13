import React, { useState } from 'react'
import { Text , View, StyleSheet, FlatList, Dimensions, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import CardStack from '../navstackcomponents/CardStack';
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import DollarBag from '../../icons/DollarBag'
import QRCode from 'react-native-qrcode-svg';
   import BusIcon from '../../icons/BusIcon'
   import AirPortIcon from '../../icons/AirportIcon'
   import LadderIcon from '../../icons/LadderIcon'
   import MoneyCard from '../../icons/Money_Card_Icon'
   import BanksAccount from '../../icons/BanksAccount'
   import MoneyBags from '../../icons/Money_Bags'
   import VoiceScan from '../../icons/VoiceScanInterface'
   import WalletCard from '../../icons/WalletMoneyCard'
   import SendMail from '../../icons/SendEmail'
   import BackItem from '../../icons/BackItem'




interface Props {
  navigation:any;
}

const data = [{key: "1", icon: 'barcode-scan', title:'Scan to Pay'}, {key:" 2", icon: 'credit-card', title:'Topup Transport Wallet'}, 
  {key: "3", icon: 'credit-card', title:'Get Transport Loan'}, {key: "4", icon: 'credit-card', title:'Get Transport Card'},
  {key: "5", icon: 'credit-card', title:'Book a Bus'},{key:"6", icon: 'credit-card', title:'Send Money'},
   {key:"7", icon: 'credit-card', title:'Transports Pay'},  {key:"8", icon: 'Book Flight', title:'Send Money'},
   {key:"9", icon: 'credit-card', title:'Train Ticket'}]
   const numColumns = 3
   const WIDTH = Dimensions.get('window').height/2
   const marginal = Dimensions.get('screen').height/12
   

   

const Home = (props: Props) => {
  const [toggleState, setToggleState] = useState(false)
  const navigate = ()=> props.navigation.navigate('paycredit')
  const navigateToQrScanCode = ()=> props.navigation.navigate('ScanQrCode')
  const NavigateToBookFlight = ()=> props.navigation.navigate("BookFlight")
  const NavigateToTransportPays = ()=> props.navigation.navigate("TransportPays")
  const NavigateToSendMoney = ()=> props.navigation.navigate("SendMoney")
  const NavigateToGetTransportCard = () => props.navigation.navigate('getTransportCard')
  

   

  return (
    <View style={styles.main}>
     
        <View style={styles.trans_card}>
          <View style={styles.layer_flex}>
            <View>
            <Text style={styles.firstfont}>Welcome back!</Text>
          <Text style={styles.firstfontsecond}>Debby</Text>
            </View>
            <View>
            <QRCode
                            value={"100"}
                            size={50}
                            // getRef={(ref)=> (svg = ref)}
                        />
            </View>
          
          </View>

          <View style={styles.layer_flex2}>
            <View>
            <Text style={styles.firstfontbottom1}>Balance</Text>
            <View style={styles.amount}>
         <View>
         <Text style={styles.firstfontsecondbottom2}>{toggleState ? 'N12,500.00': "✶✶✶✶✶✶✶✶"}</Text>
         </View>
            <View style={styles.toggle_eye}><Feather name={`${toggleState? 'eye': 'eye-off'}`} color='white' onPress={()=>setToggleState(!toggleState)}/></View>
            </View>
          
            </View>
            <View>
            <Text style={styles.firstfontbottom}>Account Number</Text>
          <Text style={styles.firstfontsecondbottom}>4326290835</Text>
            </View>
         
          </View>

         

        </View>
        <View style={styles.major}>
       
        <ScrollView style={{
         
          // backgroundColor:'blue'
          
        }}>
        
       

         <View style={styles.layers1}>
            <CardStack imag={<VoiceScan/>} title='Scan to Pay'  onPress={navigateToQrScanCode}/>
            <CardStack imag={<WalletCard/>} title='Topup Transport Wallet' />
            <CardStack imag={<DollarBag/>} title='Get Transport Loan' />


          </View>
          <View style={styles.layers1}>
            <CardStack  imag={<MoneyCard/>}title='Get Transport Card' onPress={NavigateToGetTransportCard}/>
            <CardStack imag={<BusIcon/>} title='Book a Bus'onPress={ NavigateToBookFlight} />
            <CardStack imag={<SendMail/>} title='Send Money' onPress={NavigateToSendMoney} />


          </View>
          <View style={styles.layers1}>
            <CardStack  imag={<BusIcon/>}title='Transports Pay'  onPress={ NavigateToTransportPays}/>
            <CardStack imag={<AirPortIcon/>} title='Book Flight'  onPress={ NavigateToBookFlight}/>
            <CardStack imag={<LadderIcon/>}title='Train Ticket' onPress={ NavigateToBookFlight} />

         
          
          </View>
          <View style={styles.backdiv}>
          {/* <ImageBackground source={require('../../../assets/halfcutimage.png')} resizeMode="cover"  style={styles.backImag}> */}
          <BackItem/>
          <TouchableOpacity style={styles.floatingButton} onPress={navigate}>
        <View>
          <Feather name='plus' size={25} color='#FCFCFC'/>
        </View>
        <View>
          <Text style={styles.floating_text}>Topup Wallet</Text>
        </View>
      </TouchableOpacity>
      
         
      
      {/* </ImageBackground> */}
          </View>
            
       
         
        
          
      
       
        </ScrollView>
        
        </View>
        <View style={styles.indication_section}>
        <Octicons name='dot-fill' size={20} color="#14142B" style={{ margin:5}}/>
        <Octicons name='dot' size={20} color="#14142B" style={{ margin:5}}/>
        <Octicons name='dot' size={20} color="#14142B" style={{ margin:5}}/>
        </View>
        </View>
        
     
  )
}
const styles = StyleSheet.create({
  main:{
// paddingHorizontal: 20,
height:'100%',
paddingTop: Constants.statusBarHeight

  },
  trans_card:{
    backgroundColor:'#0122AE',
    height:'30%',
    display:'flex',
    marginTop:10,
    padding:20
  },
  grid:{
   flex:1,
    padding:20,
   height:WIDTH,
   backgroundColor:'#0122AE'
  },
  layers1:{
    display:'flex',
    flex:1,
    height:100,
   
  
    // backgroundColor:'orange',
    

    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:30
    
  },
  major:{
  
    height: '65%',
    // backgroundColor:'red'

  },
  firstfont:{
    color:'#FCFCFC',
    fontSize:16,
    fontWeight:'300',



  },
  firstfontbottom:{
    color:'#FCFCFC',
    fontSize:10,
    fontWeight:'400',
    fontStyle:'normal'



  },
  firstfontbottom1:{
    color:'#FCFCFC',
    fontSize:12,
    fontWeight:'400',
    fontStyle:'normal'



  },
  firstfontsecond:{
    color:'#FCFCFC',
    fontSize:16,
    fontWeight:'500',
    


  },
  firstfontsecondbottom:{
    color:'#FCFCFC',
    fontSize:14,
    fontWeight:'500',
    fontStyle:'normal',
    textAlign:'right',
    display:'flex',
    marginTop:5
    


  },
  firstfontsecondbottom2:{
    color:'#FCFCFC',
    fontSize:18,
    fontWeight:'600',
    fontStyle:'normal',
    textAlign:'right',
    display:'flex',
    marginTop:5
    


  },
  layer_flex:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-between',
    flexDirection:'row'

  },
  layer_flex2:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-between',
    flexDirection:'row',
     marginTop:marginal

  },
  amount:{
    display:'flex',
    flexDirection:'row'
  },
  toggle_eye:{
    justifyContent:'center',
    alignItems:'center',
    height:35,
    width:35,
    padding:5,
    
  },
  backdiv:{
    marginTop:15,
    padding:25,
   borderRadius:10,
   

  },
  backImag:{
    height:200,
    width:'100%',
    borderRadius:10,
    
  },
  indication_section:{
    display:'flex',
    height:40,
    backgroundColor:'#FCFCFC',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'

  },
  floatingButton:{
    display:'flex',
    backgroundColor:'#0122AE',
    borderRadius:25,
    width:'40%',
    height:'20%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
top:0,
    right:1
  },
  floating_text:{
    color:'#FFFFFF',
    
  }
  
})
export default Home