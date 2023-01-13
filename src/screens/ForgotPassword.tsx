import { Center } from "native-base";
import React from "react";
import { View, Image, Text, TextInput, Pressable } from "react-native";

const ForgotPassword: React.FC<any> = ({ navigation, route }) => {
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
      <View style={{ marginTop: 70, flexDirection: "row" }}>
      <Pressable onPress={() => navigation.navigate('LoginMainS')}>
          <Image source={require("../images/png/BackArrow.png")} />
        </Pressable>
        <Text
          style={{
            color: "#0122AE",
            fontSize: 20,
            fontWeight: "500",
            marginLeft: 20,
          }}
        >
          Forgot Password
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 39.7, marginBottom: 30 }}>
        <Text style={{color: '#14142B', fontSize: 16, fontWeight: '400', paddingRight: 41, letterSpacing: 0.75, lineHeight: 30}}>
          Please enter your registered phone number and a comfirmation OTP code
          will be sent to you.
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginTop: 25,
          borderWidth: 2,
          borderColor: "#A0A3BD",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Image
          style={{ marginRight: 8 }}
          source={require("../images/png/Mail.png")}
        />
        <TextInput
          style={{ color: "#000000", width: "80%" }}
          placeholder="Email address"
          placeholderTextColor={"#A0A3BD"}
        />
        <Image
          style={{ marginRight: 8, marginLeft: 10 }}
          source={require("../images/png/Close.png")}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 14,
            fontWeight: "400",
            color: "#6E7191",
          }}
        >
          Resend
        </Text>
      </View>
      <View>
        <Pressable
        onPress={() => navigation.navigate('OTPScreen')}
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
          <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: '600'}}>Request OTP</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ForgotPassword;
