import { Center } from "native-base";
import React from "react";
import { View, Image, Text, TextInput, Pressable } from "react-native";

const LoginMainIndividual: React.FC<any> = ({ navigation, route }) => {
  //   console.warn(1);
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <View style={{ marginTop: 75 }}>
        <Pressable onPress={() => navigation.navigate('GetStarted')}>
          <Image source={require("../images/png/BackArrow.png")} />
        </Pressable>
      </View>
      <View style={{ alignItems: "center", marginTop: 39.7, marginBottom: 30 }}>
        <Text style={{ color: "#000000", fontSize: 24, fontWeight: "600" }}>
          Let’s Get Started!
        </Text>
        <Text
          style={{
            color: "#000000",
            fontSize: 16,
            fontWeight: "400",
            marginTop: 16,
          }}
        >
          Create an account with TrowPass
        </Text>
      </View>

      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
          borderWidth: 2,
          borderColor: "#A0A3BD",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Image
          style={{ marginRight: 8 }}
          source={require("../images/png/Profile.png")}
        />
        {/* <TextInput placeholder="Email address" placeholderTextColor={"#A0A3BD"}/> */}
        <TextInput
          style={{ color: "#000000", width: "80%" }}
          placeholder="Full Name"
          placeholderTextColor={"#A0A3BD"}
        />
        <Image
          style={{ marginRight: 8, marginLeft: 10 }}
          source={require("../images/png/Close.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderWidth: 2,
          borderColor: "#A0A3BD",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Image
          style={{ marginRight: 8 }}
          source={require("../images/png/mdi_cellphone-iphone.png")}
        />
        <TextInput
          style={{ color: "#000000", width: "80%" }}
          placeholder="Phone Number"
          placeholderTextColor={"#A0A3BD"}
        />
        <Image
          style={{ marginRight: 8, marginLeft: 10 }}
          source={require("../images/png/Close.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderWidth: 2,
          borderColor: "#A0A3BD",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Image
          style={{ marginRight: 8 }}
          source={require("../images/png/Lock.png")}
        />
        {/* <TextInput placeholder="Email address" placeholderTextColor={"#A0A3BD"}/> */}
        <TextInput
          style={{ color: "#000000", width: "80%" }}
          placeholder="Password"
          placeholderTextColor={"#A0A3BD"}
        />
        <Image
          style={{ marginRight: 8, marginLeft: 10 }}
          source={require("../images/png/View.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderWidth: 2,
          borderColor: "#A0A3BD",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Image
          style={{ marginRight: 8 }}
          source={require("../images/png/Lock.png")}
        />
        <TextInput
          style={{ color: "#000000", width: "80%" }}
          placeholder="Confirm Password"
          placeholderTextColor={"#A0A3BD"}
        />
        <Image
          style={{ marginRight: 8, marginLeft: 10 }}
          source={require("../images/png/View.png")}
        />
      </View>
      
      <View>
        <Pressable
          style={{
            backgroundColor: "#0122AE",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginTop: 24,
            marginBottom: 40,
          }}
        >
          <Text style={{ color: "#ffffff" }}>SIGN UP</Text>
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <Text style={{color: '#6E7191', letterSpacing: 0.75, fontSize: 14, fontWeight: '400'}}>Already have an account?</Text>
          <Text style={{ color: "#0122AE", marginTop: 5, fontSize: 16, fontWeight: '600'}} onPress={() => navigation.navigate('LoginMainS')}>Login here</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginMainIndividual;
