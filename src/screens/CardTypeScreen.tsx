import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const CardTypeScreen: React.FC<any> = ({navigation}) => {

  function moveVirtual(){
    navigation.navigate('CardDesignScreen', {
      data: 'Virtual'
    })
  }

  function moveVirtualTwo(){
    navigation.navigate('CardDesignScreen', {
      data: 'Physical'
    })
  }
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <View style={{}}>
        <Text
          style={{
            paddingTop: 73,
            fontSize: 20,
            fontWeight: "600",
            color: "#252422",
            marginBottom: 20,
          }}
        >
          What type of card do you want?
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#6E7191",
          height: 140,
          borderRadius: 10,
          padding: 20,
        }}
        >
        <View>
          <Image source={require("../images/png/wallet.png")} />
          <Text
            style={{
              marginTop: 10.86,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Virtual debit card
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: 185 }}>
            <Text style={{ fontSize: 12, fontWeight: "300", color: "#6E7191", lineHeight: 18 }}>
              Instantly create a virtual card to spend on transport fare.
            </Text>
          </View>
          <Text onPress={moveVirtual} style={{color: '#1CC8EE', fontSize: 12, fontWeight: '500'}}>Get Started</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#6E7191",
          height: 140,
          borderRadius: 10,
          padding: 20,
          marginTop: 30
        }}
        >
        <View>
          <Image source={require("../images/png/card.png")} />
          <Text
            style={{
              marginTop: 10.86,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Physical debit card
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: 185 }}>
            <Text style={{ fontSize: 12, fontWeight: "300", color: "#6E7191", lineHeight: 18}}>
            Get a physical card to spend on transports anytime and anywhere.
            </Text>
          </View>
          <Text onPress={moveVirtualTwo} style={{color: '#1CC8EE', fontSize: 12, fontWeight: '500'}}>Get Started</Text>
        </View>
      </View>
    </View>
  );
};

export default CardTypeScreen;
