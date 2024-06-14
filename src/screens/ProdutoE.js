import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, } from "react-native";
import Cabecario from "../assets/cabecario.png"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { api } from '../services/api';
import { Picker } from "@react-native-picker/picker";



export default function ProdutoE({ route }) {
    const navigation = useNavigation();
    const { name, id, amount, categoryId } = route.params;
    const [ nomeProduto, setNomeProduto] = useState(name);
    const [ quantidadeProduto, setQunatidadeProduto] = useState(amount);
    const [selectedCategory, setSelectedCategory] = useState(categoryId);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");


    async function handleSubmit() {
        setError("");
        if (!nomeProduto.trim() || !quantidadeProduto.toString().trim()) {
            return;
        }
        try {
            const response = await api.patch(`products/${id}`, {
                name: nomeProduto,
                amount: parseInt(quantidadeProduto),
                categoryId: selectedCategory
            });
            console.log(response.data);
            Alert.alert("Sucesso", "Produto Atualizado");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Não foi possível comunicar com o servidor.");
            }
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
        <View style={style.container}>
            <View style={{ height: 70 }}>
                <Image source={Cabecario} style={style.image} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{marginTop:15, marginLeft:15}}>
            <Ionicons name="arrow-back" size={34} color="black" />
            </TouchableOpacity>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={style.cadastro}>
                    <View style={{alignItems:"center"}}>
                    <Text style={{color:"white", fontSize:20,}}>Editar Produtos</Text>
                    <TextInput style={style.inserirP} placeholder={nomeProduto} onChangeText={setNomeProduto}></TextInput>
                    
                    <View style={{flexDirection:"row", height:54, gap:18, justifyContent:"space-evenly", alignItems:"center", marginTop:15 }}> 
                    <Text style={{color:"white", fontSize:15,}}>Alterar a quantidade:</Text>
                    <TextInput placeholder={quantidadeProduto.toString()} keyboardType="numeric" style={style.inserirQ} onChangeText={setQunatidadeProduto}></TextInput>
                    </View>
                    <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={style.picker}
      >
        <Picker.Item label="Selecione uma Categoria" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
                    <TouchableOpacity onPress={handleSubmit}>
                    <View style={{width:150, height:60,borderRadius:10,marginTop:20, backgroundColor:"#001E5958", alignItems:"center",justifyContent:"center",}}>
                        <Text style={{color:"white", fontSize:20,}}>Editar</Text>
                    </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: "#095D96",
        width: "100%",
        flex: 1,
    },
    image: {
        width: "100%",
        height: 68,
        borderWidth: 5
    },
    cadastro: {
        padding:20,
        alignItems:"center",
        height: 376,
        width: 265,
        borderRadius: 20,
        backgroundColor: "#C3C3C351",

    },
    inserirP: {
        marginTop:20,
        height: 39,
        width: 249,
        backgroundColor: "#D9D9D9",
        borderRadius: 25,
        padding: 10,
        fontSize: 16,
    },
    inserirQ: {
        height: 53,
        width: 60,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        padding: 10,
        
        fontSize: 16,
    },
    picker: {
        marginTop:20,
        height: 50,
        width: 200,
        marginBottom: 16,
        backgroundColor: '#D9D9D9',}


});