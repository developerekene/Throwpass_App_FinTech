import { Center } from "native-base";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";

const GetStartedScreen: React.FC<any> = ({ navigation, route }) => {
  //   console.warn(1);
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        marginTop: 69
      }}
    >
      <View>
        <Image source={require('../images/png/BackArrow.png')}/>
      </View>
      <View style={{alignItems: 'center', marginTop: 39.7, marginBottom: 48}}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '500'}}>Get started as a</Text>
      </View>
      
      <View>
        <Pressable
        onPress={() => navigation.navigate('LoginMainB')}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginTop: 24,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#0122AE'
          }}
        >
          <Text style={{ color: "#0122AE", fontSize: 16, fontWeight: '600' }}>Business</Text>
        </Pressable>
        
      </View>
      <View>
        <Pressable
        onPress={() => navigation.navigate('LoginMainI')}
          style={{
            backgroundColor: "#0122AE",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginBottom: 40
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: '600' }}>Individual</Text>
        </Pressable>
        
      </View>
    </View>
  );
};

export default GetStartedScreen;
