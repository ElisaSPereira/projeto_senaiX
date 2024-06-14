import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import Cabecario from "../assets/cabecario.png"

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   async function handleSubmit(){
    setError("");
    if(!email.trim()||!password.trim()||!username.trim()){
      setError("Por favor, preencha todos os campos!");
      return;
    }
    try{
      await api.post("register",{
        email,
        username,
        password,
      });
      Alert.alert("Sucesso", "Usuário criado com sucesso!")
    }
    catch (error){
      if(error.response) {
        setError(error.response.data.message);
      }
      setError("Não foi possível se conectar com o servidor ")
    }
  }

  return (

    <View style={style.container}>
      <Image source={Cabecario} style={style.image}/>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#121212"  />
      </TouchableOpacity>
      <View>
        <Text style={style.title}>Realize seu Cadastro</Text>
        <Text style={style.subtitle}>Acesse agora a sua conta para acompanhar seus pedidos, ver ofertas exclusivas e muito mais.</Text>
      </View>
      
      <View style={{ gap: 16 }}>
      <View style={style.inputBox}>
          <Feather name="user" size={24} color="#8a8787" />
          <TextInput style={style.input} placeholder="Digite seu nome" placeholderTextColor="#8a8787" value={username}
           onChangeText={(text) => setUsername(text)} />
        </View>
        <View style={style.inputBox}>
          <Feather name="mail" size={24} color="#8a8787" />
          <TextInput style={style.input} 
          placeholder="Digite seu email"
           placeholderTextColor="#8a8787" 
           keyboardType="email-address"
           value={email}
           onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={style.inputBox}>
          <Feather name="lock" size={24} color="#8a8787" />
          <TextInput placeholder="Digite sua senha" placeholderTextColor="#8a8787" secureTextEntry value={password}
           onChangeText={(text) => setPassword(text)} />
           
        </View>
        {error &&<Text style={style.erro}>{error} </Text>}
        <MyButton onPress={() => handleSubmit() } text="Cadastrar" style={{width:"100%", backgroundColor:"#002D62", width: 350,
    height: 55, borderRadius: 12, borderColor: "#FFFFFF", marginLeft:30 }}/>
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