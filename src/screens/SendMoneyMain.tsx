import React from "react";
import { View, Text, Pressable, Image } from "react-native";

const SendMoneyMain: React.FC<any> = ({ navigation }) => {
 
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
          borderWidth: 1,
          shadowColor: "green",
          height: 78
        }}
      >
        <Image source={require("../images/png/money-bag.png")} />
        <Text style={{ marginLeft: 16, fontWeight: "500", color: '#14142B' }}>Trowpass</Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          borderWidth: 1,
          shadowColor: "green",
          marginTop: 16,
        }}
      >
        <Image source={require("../images/png/bank.png")} />
        <Text style={{ marginLeft: 16, fontWeight: "500", color: '#14142B' }}>Bank Account</Text>
      </Pressable>
    </View>
  );
};

export default SendMoneyMain;
