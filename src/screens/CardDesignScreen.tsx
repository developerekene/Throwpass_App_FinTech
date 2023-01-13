import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

interface RootStackParamList extends ParamListBase {
  payLoad: {
    data: string;
  };
}

const CardDesignScreen: React.FC<any> = (
  { navigation, route },
  prop: NativeStackScreenProps<RootStackParamList, "payload">
) => {
  let memory: string = route.params.data;

  const [name, setName] = React.useState("");

  console.log(memory);

  function getCard() {
    if(memory === 'Virtual'){
      navigation.navigate("CardCreated", {
        text: 'Congratulations your card has been created!'
      });
    }else{
      navigation.navigate("CardCreated", {
        text: 'Card request successful! You will be notified when its ready for pickup.'
      });
    }
    
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
          Create card design
        </Text>
      </View>
      <View style={{ marginTop: 48, alignItems: "center" }}>
        <Image
          style={{ marginBottom: 28 }}
          source={require("../images/png/TransportCard2.png")}
        />
      </View>
      <Text
        style={{
          color: "#6E7191",
          fontSize: 14,
          fontWeight: "400",
          marginBottom: 5,
        }}
      >
        Choose Cardholder Name
      </Text>
      <TextInput
        onChangeText={(value) => setName(value)}
        style={{
          borderWidth: 1,
          height: 54,
          paddingLeft: 20,
          borderRadius: 10,
          marginBottom: 20,
          borderColor: "#6E7191",
        }}
        placeholder="Type here"
      />
      <Pressable
        style={{
          backgroundColor: "#0122AE",
          width: "100%",
          height: 64,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={getCard}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>
          Get Card
        </Text>
      </Pressable>
    </View>
  );
};

export default CardDesignScreen;
