import { Center } from "native-base";
import React from "react";
import { View, Image, Text, TextInput, Pressable } from "react-native";

const OTPScreenMain: React.FC<any> = ({ navigation, route }) => {
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
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
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
          Enter OTP
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 39.7, marginBottom: 30 }}>
        <Text
          style={{
            color: "#14142B",
            fontSize: 16,
            fontWeight: "400",
            paddingRight: 41,
            letterSpacing: 0.75,
            lineHeight: 30,
          }}
        >
          Please enter the code sent to your email address
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <TextInput
          maxLength={1}
          style={{
            width: 50,
            borderBottomWidth: 2,
            marginRight: 16,
            alignSelf: "center",
            fontSize: 25,
            paddingLeft: 20,
          }}
        />
        <TextInput
          maxLength={1}
          style={{
            width: 50,
            borderBottomWidth: 2,
            marginRight: 16,
            alignSelf: "center",
            fontSize: 25,
            paddingLeft: 20,
          }}
        />
        <TextInput
          maxLength={1}
          style={{
            width: 50,
            borderBottomWidth: 2,
            marginRight: 16,
            alignSelf: "center",
            fontSize: 25,
            paddingLeft: 20,
          }}
        />
        <TextInput
          maxLength={1}
          style={{
            width: 50,
            borderBottomWidth: 2,
            marginRight: 16,
            alignSelf: "center",
            fontSize: 25,
            paddingLeft: 20,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: "#6E7191",
          }}
        >
          Didn’t receive OTP?
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: "#6E7191",
            marginLeft: 5,
          }}
        >
          Resend
        </Text>
      </View>
      <View>
        <Pressable
          style={{
            backgroundColor: "#0122AE",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginBottom: 40,
          }}
        >
          <Text onPress={() => navigation.navigate('LoginMainS')} style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
            CONTINUE
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OTPScreenMain;
