import React ,{useState} from 'react'
import { Text , View, StyleSheet, FlatList, Dimensions, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import Cowry from '../icons/Cowry'
import Shutler from '../icons/Shutler'
import Gig from '../icons/Gig'
import LandStarExcess from '../icons/LandStarExcess'
import Guo from '../icons/Guo'
import PayCard from './navstackcomponents/PayCard'

interface Props {
    navigation:any;
  }
const TransportPays = (props: Props) => {

    const data = [{key: "1", icon: <Cowry/>, title:'Cowry'}, {key:" 2", icon: <Shutler/>, title:'Shutler'}, 
  {key: "3", icon: <Gig/>, title:'GIG'}, {key: "4", icon: <LandStarExcess/>, title:'Landstar Express'},
  {key: "5", icon: <Guo/>, title:'GUO'}]
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

export default TransportPays