import { Center } from "native-base";
import React from "react";
import { View, Image, Text, TextInput, Pressable } from "react-native";

const LoginMain: React.FC<any> = ({ navigation, route }) => {
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
      <View style={{ alignItems: "center", marginTop: 78 }}>
        <Image source={require("../images/png/welcomeImage.png")} />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          paddingTop: 19,
          paddingBottom: 16,
          color: "#000000",
        }}
      >
        Welcome back!
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
        Log in to your account.
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 35,
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
        {/* <TextInput placeholder="Email address" placeholderTextColor={"#A0A3BD"}/> */}
        <TextInput
          style={{ color: "#000000", width: "80%" }}
          placeholder="Email Address"
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
      <View style={{ marginTop: 10 }}>
        <Text
        onPress={() => navigation.navigate('ForgotPassword')}
          style={{
            alignSelf: "flex-end",
            fontSize: 14,
            fontWeight: "400",
            color: "#6E7191",
          }}
        >
          Forgot Password?
        </Text>
      </View>
      <View>
        <Pressable
        onPress={() => navigation.navigate('BottomScreens')}
          style={{
            backgroundColor: "#0122AE",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginTop: 24,
            marginBottom: 40
          }}
        >
          <Text style={{ color: "#ffffff" }}>LOG IN</Text>
        </Pressable>
        <View style={{alignItems: 'center'}}>
            <Text>
                Don't have an account?
            </Text>
            <Text style={{color: '#0122AE', marginTop: 5}}>Sign Up</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginMain;
