import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, TextInput, Alert } from "react-native";
import { useAuth } from "../context/useAuth";
import Cabecario from "../assets/cabecario.png";
import { useState, useEffect, useCallback } from "react";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { api } from '../services/api';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CategoriaImagem from '../assets/curativo.png'

export default function Home() {
    const { signOut } = useAuth();
    const navigation = useNavigation();
    const [query, SetQuery] = useState("");
    const [categorieData, setCategorieData] = useState([]);

    async function Delete(id) {
        try {
            await api.delete(`categories/${id}`);
            Alert.alert("Categoria Deletada");
            // Atualiza a lista de produtos após a exclusão
            const updatedProducts = categorieData.filter((item) => item.id !== id);
            setCategorieData(updatedProducts);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao deletar o produto");
        }
    }

    const filteredCategories = query ?
        categorieData.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        : categorieData

    const fetchCategories = useCallback(async () => {
        try {
            const response = await api.get("categories");
            setCategorieData(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
        }, [fetchCategories])
    );

    console.log(categorieData);
    return (
        <ScrollView style={style.container}>
            <View>
                <Image source={Cabecario} style={style.image} />
            </View>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <TextInput
                style={style.searchInput}
                placeholder="Procurar..."
                placeholderTextColor="#cccccc"
                value={query}
                onChangeText={(text) => SetQuery(text)}
            />
            <TouchableOpacity onPress={() => navigation.navigate("CadastroC")}>
                <AntDesign name="plus" size={24} style={style.adicionar} />
            </TouchableOpacity>

            <View style={style.produtos}>

                {filteredCategories.map((item) => (
                    <View key={item.id} style={style.produto}>
                        <Image style={{ width: 90, height: 90, borderRadius: 50}} source={CategoriaImagem} />
                        <View>
                            <Text style={style.nome}>{item.name}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('CategoriaE', item)}>
                                <MaterialCommunityIcons name="lead-pencil" size={24} style={style.pincel} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Delete(item.id)}>
                                <MaterialIcons name="delete" size={24} style={style.delete} />
                            </TouchableOpacity>
                        </View>

                    </View>
                ))}

            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#52A4DC",
    },
    image: {
        width: "100%",
        height: 68
    },
    searchInput: {
        height: 40,
        width: 350,
        backgroundColor: "#9bc0da",
        borderRadius: 25,
        padding: 10,
        color: "#ffffff",
        fontSize: 16,
        marginTop: 20,
        marginLeft: 10
    },
    adicionar: {
        color: "#ffffff",
        marginLeft: 373,
        marginTop: -30,
        height: 30,
    },
    produtos: {
        padding: 16
    },
    delete: {
        marginTop: 35,
        color: "#182c44"
    },
    categoria: {
        width: 90,
        height: 90,
        borderRadius: 50
    },
    produto: {
        backgroundColor: "#3372AA",
        color: "#ffffff",
        borderRadius: 10,
        padding: 16,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    nome: {
        color: "#ffffff",
        fontSize: 20,
        marginTop: 27,
    },
    pincel: {
        color: "#ffffff",
        height: 30,

    },
});
