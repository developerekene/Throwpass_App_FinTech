
import React ,{useState} from 'react'
import { Text , View, StyleSheet, FlatList, Dimensions, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import Cowry from '../icons/Cowry'
import Shutler from '../icons/Shutler'
import Gig from '../icons/Gig'
import LandStarExcess from '../icons/LandStarExcess'
import Guo from '../icons/Guo'
import PayCard from './navstackcomponents/PayCard'
import BanksAccount from '../icons/BanksAccount'
import MoneyBag from '../icons/Money_Bags'

interface Props {
    navigation:any;
  }

const SendMoney = (props: Props) => {
    const data = [{key: "1", icon: <MoneyBag/>, title:'Trowpass'}, {key:" 2", icon: <BanksAccount/>, title:'Bank Account'}]
    const [selectedId, setSelectedId] = useState(null);
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
      const color = item.id === selectedId ? 'white' : 'black';
     
  
      return (
        <PayCard
          
          imag={item.icon}
          title={item.title}
        
         
         
        />
      );
    };
    return (
      <View style={styles.main}>
          <View>
          <FlatList
       data={data}
       renderItem={renderItem}
       keyExtractor={(item) => item.key}
       extraData={selectedId}/>
          </View>
  
      </View>
    )
  
}

const styles = StyleSheet.create({
    main:{
        paddingHorizontal: 20,
        height:'100%',
        width:"100%",
        display:'flex',
   
        // paddingTop: Constants.statusBarHeight
        
          },
    
})
export default SendMoney