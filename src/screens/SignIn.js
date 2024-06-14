import React, { useState } from "react";
import { Text, TextInput, View, StatusBar, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/useAuth";
import Cabecario from "../assets/cabecario.png"


export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  async function handleSubmit() {
    try {
      setError("")
      await signIn({ email, password });
    }

    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Falha no login. Verifique suas credenciais");
      }
    }
  }

  return (
    <View style={style.container}>
      <Image source={Cabecario} style={style.image}/>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#121212" />
      </TouchableOpacity>
      <View>
        <Text style={style.title}>Realize seu Login</Text>
        <Text style={style.subtitle}>Acesse agora a sua conta para acompanhar seus pedidos, ver ofertas exclusivas e muito mais.</Text>
      </View>
      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="mail" size={24} color="#8a8787" />
          <TextInput style={style.input} placeholder="Digite seu email" placeholderTextColor="#8a8787" keyboardType="email-address" value={email} onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={style.inputBox}>
          <Feather name="lock" size={24} color="#8a8787" />
          <TextInput style={style.input} placeholder="Digite sua senha" placeholderTextColor="#8a8787" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
        </View>
        {error && <Text style={style.erro}>{error}</Text>}
        <MyButton onPress={() => handleSubmit()} text="Login" style={{width:"100%", backgroundColor:"#002D62", width: 350,
    height: 55, borderRadius: 12, borderColor: "#FFFFFF", marginLeft:30 }} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#52A4DC",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#121212",
    marginLeft:65,
    marginTop:50,
   
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    marginTop: 16,
    color:"#FFFFFF",
    marginLeft:20,
    marginTop: 30,
    marginBottom:60
  },

  inputBox: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    backgroundColor:"#9bc0da",
    borderRadius: 12,
    width: 350,
    height: 55,
    marginLeft:30
   
  },

  input: {
    flex: 1,
    fontSize: 18,
    

  },
  erro: {
    color: "#121212",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },

  image: {
    width: "100%",
    height:68
  }
});