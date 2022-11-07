import React from 'react'

import { useState } from 'react';
import { Text, View, Image , StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import Octicons from 'react-native-vector-icons/Octicons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileItem from '../../components/ListItem/ProfileItem';
import SecondWomanSvg from '../../icons/SecondWoman'
import FirstWomanSvg from '../../icons/FirstWoman'
const DATA1 = [
  {
    id: "1",
    title:'Edit Profile',
   imag: <IonIcons name='person' color={'#4F4F4F'} size={22}/>
   
  },
  {
    id: "2",
    title:'Change PIN',
    imag:<Octicons name='lock' color={'#4F4F4F'} size={22}/>,
   
  },

  {
    id: "3",
    title:'Notification',
    imag:<Feather name='bell' color={'#4F4F4F'} size={22}/>,
   
  },
  {
    id: "4",
    title:'History',
    imag:<Entypo name='wallet' color={'#4F4F4F'} size={22}/>,
   
  },
  {
    id: "5",
    title:'Kyc Registration',
    imag:<MaterialCommunityIcon name='clock-time-twelve-outline' color={'#4F4F4F'} size={22}/>,
   
  },
  {
    id: "6",
    title:'Settings',
    imag:<Feather name='settings' color={'#4F4F4F'} size={22}/>,
   
  },
  {
    id: "7",
    title:'QR Code',
    imag:<MaterialIcons name='qr-code-scanner' color={'#4F4F4F'} size={22}/>,
   
  },

]

const Profile = () => {

  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';
   

    return (
      <ProfileItem
        imag={item.imag}
       title={item.title}
       onPress={() => setSelectedId(item.id)}
       
     

       
      />
    );
  };

  return (
    <View style={styles.main}>
        <View style={styles.display_flex}>
         <FirstWomanSvg style={styles.img}/>
          
          <TouchableOpacity style={styles.edit_button}>
            <Octicons name='pencil' color={'#FCFCFC'} size={25}/>

          </TouchableOpacity>
        </View>
        <View style={styles.middle_text}>
          <Text style={styles.miriam}>Mariam Bode</Text>
          <Text style={styles.agent}>Agent 22</Text>
        </View>
        <View style={styles.section_list}>
        <FlatList
     data={DATA1}
     renderItem={renderItem}
     keyExtractor={(item) => item.id}
     extraData={selectedId}/>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
   width:"100%",
   height:'100%',
   display:'flex',
   padding:20
  },
  flex1:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:Constants.statusBarHeight
  
  },
  today:{
    marginTop:10,
   
   

  },
  ealier:{
    marginTop:20,
   
   

  },
  text_ealier:{
    marginTop:30,
    fontSize:16,
    fontWeight:'600',
    color:'#333333'


  },

  img:{
    height:100,
    width:100,
    borderRadius:80
  
  },
  display_flex:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  edit_button:{
    height:40,
    width:40,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    bottom:0,
    
    position:'absolute',
    right:135,
    backgroundColor:'#0122AE'
    
  },
  middle_text:{
    
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:25

  },
  miriam:{
    color:' #333333',
    fontSize:18,
    fontWeight:'600',
    display:'flex',
    lineHeight:27

  }, 
  agent:{
    fontSize:14,
    fontWeight:'500',
    color:'#333333',
    fontStyle:'normal',
    lineHeight:21,
    marginTop:5

  }, 
  section_list:{
  
      
      padding: 10
    
  }
  
})

export default Profile