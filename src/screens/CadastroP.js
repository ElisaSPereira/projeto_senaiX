import React, { useState, useEffect } from 'react';
import Cabecario from "../assets/cabecario.png"
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { api } from '../services/api';
import { Ionicons } from '@expo/vector-icons';

export default function ProductManagement() {
  const navigation = useNavigation();
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    if (!productName.trim() || !productQuantity.trim() || !selectedCategory) {
      setError("Por favor, preencha todos os campos!");
      return;
    }

    try {
      await api.post("/products", {
        name: productName,
        amount: parseInt(productQuantity),
        category: selectedCategory,
        categoryId: selectedCategory
      });
      Alert.alert("Sucesso")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories');
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: 70 }}>
                <Image source={Cabecario} style={styles.image} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop: 15, marginLeft: 15 }}>
                <Ionicons name="arrow-back" size={34} color="black" />
            </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.cadastro}>
        <View style={{ alignItems: "center" }} >
        <Text style={{ color: "white", fontSize: 20, fontWeight:700}}>Cadastro de Produtos</Text>
      <TextInput
        style={styles.inserirP}
        placeholder="Nome do Produto"
        value={productName}
        onChangeText={setProductName}
      />
      <View style={{flexDirection:"row", height:54, gap:18, justifyContent:"space-evenly", alignItems:"center", marginTop:15 }}> 
      <Text style={{color:"white", fontSize:15, fontWeight:700}}>Alterar a quantidade:</Text>
      <TextInput
        style={styles.inserirQ}
        placeholder="..."
        value={productQuantity}
        keyboardType="numeric"
        onChangeText={setProductQuantity}
      /></View>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma Categoria" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
      <TouchableOpacity onPress={handleSubmit}>
                    <View style={{width:150, height:60,borderRadius:10,marginTop:20, backgroundColor:"#001E5958", alignItems:"center",justifyContent:"center",}}>
                        <Text style={{color:"white", fontSize:20,}}>Adicionar</Text>
                    </View>
                    </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#095D96",
        width: "100%",
        flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 68,
    borderWidth: 5
},
cadastro: {
  padding: 20,
  alignItems: "center",
  height: 376,
  width: 265,
  borderRadius: 20,
  backgroundColor: "#06467f",
  

},    inserirP: {
  marginTop:20,
  height: 39,
  width: 249,
  backgroundColor: "#547ca0",
  borderRadius: 25,
  padding: 10,
  fontSize: 16,
  
},
inserirQ: {
  height: 53,
  width: 60,
  backgroundColor: "#547ca0",
  borderRadius: 10,
  padding: 10,
  
  fontSize: 16,
},
picker: {
  marginTop:20,
  height: 50,
  width: 200,
  marginBottom: 16,
  backgroundColor: '#547ca0',}

});
