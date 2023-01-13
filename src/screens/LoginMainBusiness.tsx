import { Center } from "native-base";
import React from "react";
import { View, Image, Text, TextInput, Pressable, Alert, ToastAndroid } from "react-native";

const LoginMainBusiness: React.FC<any> = ({ navigation, route }) => {

  //------------------states------------------
  const [business, setBusiness] = React.useState<string>("");
  const [company, setCompany] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  let empty: string = ""

  const [seen, setSeen] = React.useState<string>("*******");

  const storeM: {} = {
    biz: business,
    com: company,
    pas: password,
    confPass: confirmPassword
  }

  console.log(storeM)

  //functions

  //----------------ANDROID TOAST-------------------
  function wrongFirstName() {
    ToastAndroid.showWithGravity(
      'First Name cannot be empty, contain spaces, less than 3 characters and its first character must be in upper case!',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  }

  // -----------------------------------------------

  //------------validate first Name-----------------
  function validateFirstName(): boolean {
    let regex1 = /^[a-zA-Z ]*$/;
    let n = business;
    if (
      n.match(regex1) &&
      n.length !== 0 &&
      // n[0] === n[0].toLocaleUpperCase() &&
      !n.includes(' ') &&
      n.length >= 3
    ) {
      // let c = n[0].toUpperCase()
      console.warn(n);
      // userInfo[firstN] = n
      return true;
    } else {
      // wrongFirstName();
      console.warn(n, false);
      return false;
    }
  }

  function openPassword(): any {
    if (seen === "*******") {
      setSeen("");
    } else {
      setSeen("");
    }
  }

  function clearBusiness(): any {
    // if(business.length !== 0){
    //   setBusiness("");
    //   Alert.alert("working");
    // }else{
    //   Alert.alert("Not working");
    // }
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
      <View style={{ marginTop: 75 }}>
        <Pressable onPress={() => navigation.navigate("GetStarted")}>
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
          source={require("../images/png/clarity_bank-line.png")}
        />
        <TextInput
          onChangeText={(value) => setBusiness(value)}
          style={{ color: "#000000", width: "80%" }}
          placeholder="Business Name"
          placeholderTextColor={"#A0A3BD"}
        />
        <Pressable onPress={clearBusiness}>
          <Image
            style={{ marginRight: 8, marginLeft: 10 }}
            source={require("../images/png/Close.png")}
          />
        </Pressable>
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
          source={require("../images/png/Mail.png")}
        />
        {/* <TextInput placeholder="Email address" placeholderTextColor={"#A0A3BD"}/> */}
        <TextInput
          onChangeText={(value) => setCompany(value)}
          style={{ color: "#000000", width: "80%" }}
          placeholder="Company Email"
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
          onChangeText={(value) => setPassword(value)}
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
          onChangeText={(value) => setConfirmPassword(value)}
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
          <Text style={{ color: "#6E7191", fontSize: 14, fontWeight: "400" }}>
            Already have an account?
          </Text>
          <Text
            style={{
              color: "#0122AE",
              marginTop: 5,
              fontSize: 14,
              fontWeight: "600",
            }}
            onPress={() => navigation.navigate("LoginMainS")}
          >
            Login here
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginMainBusiness;
