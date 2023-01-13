import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const GetTransportCard: React.FC<any> = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            paddingTop: 73,
            fontSize: 20,
            fontWeight: "600",
            color: "#252422",
            marginBottom: 20,
          }}
        >
          Get Transport Card
        </Text>
        <Text
          style={{
            paddingLeft: 3,
            marginRight: 4,
            fontWeight: "300",
            fontSize: 14,
            textAlign: "center",
            lineHeight: 21,
          }}
        >
          Instantly get a virtual card to make tranport payment easily on your
          favourite transport app
        </Text>
      </View>
      <View style={{ marginTop: 48, alignItems: "center" }}>
        <Image
          style={{ marginBottom: 28 }}
          source={require("../images/png/Transport_Card.png")}
        />
        <Pressable
          style={{
            backgroundColor: "#0122AE",
            width: "100%",
            height: 64,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: 'center'
          }}
          onPress={() => navigation.navigate('CardTypeScreen')}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: '#ffffff' }}>
            Create Virtual Card
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GetTransportCard;
