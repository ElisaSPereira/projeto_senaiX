import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, TextInput, Alert } from "react-native";
import { useAuth } from "../context/useAuth";
import Cabecario from "../assets/cabecario.png"
import { useCallback, useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Categories from "../components/Categories";
import { api } from '../services/api';

export default function Home() {
    const { signOut } = useAuth()
    const [query, SetQuery] = useState("");
    const navigation = useNavigation();
    const [productData, setProductData] = useState([]);

    const filteredProducts = query ?
        productData.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        : productData

    async function Delete(id) {
        try {
            await api.delete(`products/${id}`);
            Alert.alert("Produto Deletado");
            // Atualiza a lista de produtos após a exclusão
            const updatedProducts = productData.filter((item) => item.id !== id);
            setProductData(updatedProducts);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao deletar o produto");
        }
    }

    const fetchProducts = useCallback(async () => {
        try {
            const response = await api.get("products");
            setProductData(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [fetchProducts])
    );

    console.log(productData);
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
            <TouchableOpacity onPress={() => navigation.navigate("CadastroP")}>
                <AntDesign name="plus" size={24} style={style.adicionar} />
            </TouchableOpacity>

            <View style={style.produtos}>

                {filteredProducts.map((item) => (
                    <View key={item.id} style={style.produto}>

                        <View>
                            <Text style={{
                                fontWeight: 900, color: "#ffffff",
                                fontSize: 20,
                                padding: 5,
                            }}>{item.name}</Text>
                            <Text style={{
                                fontWeight: 900, color: "#ffffff",
                                fontSize: 20,
                                padding: 5,
                            }}>Quantidade:<Text style={{fontWeight:400}}> {item.amount}</Text></Text>
                            {item.category && <Text style={{
                                fontWeight: 900, color: "#ffffff",
                                fontSize: 20,
                                padding: 5,
                            }}>Categoria:<Text style={{fontWeight:400}}> {item.category.name}</Text></Text>}

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('ProdutoE', item)}>
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

    )
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
        padding: 5,
    },
    pincel: {
        color: "#ffffff",
        height: 30,

    },
});