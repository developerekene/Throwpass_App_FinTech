import React from 'react'
import { Text , View, StyleSheet, FlatList, Dimensions, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import ComingSoonIcon from '../icons/ComingSoon'

const BookFlight = () => {
  return (
    <View style={styles.main}>
        <View>
            <ComingSoonIcon/>
            <Text style={styles.text} >Coming Soon</Text>

        </View>

    </View>
  )
}
const styles = StyleSheet.create({
    main:{
        // paddingHorizontal: 20,
        height:'100%',
        paddingTop: Constants.statusBarHeight,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
        
          },
          text:{
            marginTop:'5%',
            color:'#14142B',
            fontSize:20,
            fontWeight:'600',
            textAlign:'center'
          }
    
})

export default BookFlight