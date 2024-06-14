import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo2.png";
import MyButton from "../components/MyButton";

export default function Start() {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <StatusBar backgroundColor="#1b1b1f" barStyle="light-content" />
      <Image source={Logo} style={style.image}/>
      <View style={style.texts}>
        <MyButton text="Login" style={{flex:1, backgroundColor:"#002D62"}} onPress={ ()=> navigation.navigate("SignIn")}/>
        <MyButton text="Cadastrar" style={{flex:1, backgroundColor:"#002D62"}} onPress={ ()=> navigation.navigate("SignUp")}/>
      </View>
      <Text style={style.subtitle}>Seja Bem-Vindo!</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#14649B",
    padding: 16,
  },
  image: {
    width: 230,
    height: 289,
  },
  texts: {
    flexDirection: "row",
    gap: 16,
    marginTop: 30
  },
  title1: {
    fontSize: 40,
    fontWeight: "900",
    width: 200,
    color: "#F4F5F6",
    textAlign: "center",
  },
  title: {
    marginBottom:300,
    position:"absolute",
    fontSize: 40,
    fontWeight: "900",
    width: 200,
    color: "#F4F5F6",
  },
  subtitle: {
    fontWeight: "400",
    color: "#AEAEB3",
    marginTop: 10
    
  },
});
