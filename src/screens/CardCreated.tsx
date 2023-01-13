import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

interface RootStackParamList extends ParamListBase {
  payLoad: {
    text: string;
  };
}

const CardCreated: React.FC<any> = (
  { navigation, route },
  prop: NativeStackScreenProps<RootStackParamList, "payload">
) => {
  let storeM: string = route.params.text;
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ marginTop: 48, alignItems: "center" }}>
        <Image
          style={{ marginBottom: 28 }}
          source={require("../images/png/card_payment.png")}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
            color: "#000000",
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          {storeM}
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "#0122AE",
          width: "100%",
          height: 64,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 190
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>
          Done
        </Text>
      </Pressable>
    </View>
  );
};

export default CardCreated;
