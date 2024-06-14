import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, } from "react-native";
import Cabecario from "../assets/cabecario.png"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { api } from '../services/api';
import CategoriaImagem from '../assets/curativo.png';

export default function CadastroC() {
    const navigation = useNavigation();
    const [nomecategoria, setNomeCategoria] = useState('');
    const [error, setError] = useState("");


    async function handleSubmit() {
        setError("");
        if (!nomecategoria.trim()) {
            setError("Por favor, preencha todos os campos!");
            return;
        }
        try {
            await api.post("/categories", {
                name: nomecategoria
            });
            Alert.alert("Sucesso")
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={style.container}>
            <View style={{ height: 70 }}>
                <Image source={Cabecario} style={style.image} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Categoria')} style={{ marginTop: 15, marginLeft: 15 }}>
                <Ionicons name="arrow-back" size={34} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={style.cadastro}>

                    <View style={{ alignItems: "center" }}>

                        <Text style={{ color: "white", fontSize: 20, fontWeight:700}}>Cadastro de Categorias</Text>
                        <Image style={{ width: 130, height: 130, borderRadius: 50, marginTop:20}} source={CategoriaImagem} />
                        <TextInput onChangeText={setNomeCategoria} style={style.inserirP} placeholder={"Insira o nome da categoria..."}></TextInput>

                        <Text>{nomecategoria}</Text>
                        <TouchableOpacity onPress={() => handleSubmit()} >
                            <View style={{ width: 150, height: 60, borderRadius: 10, marginTop: 20, backgroundColor: "#001E59", alignItems: "center", justifyContent: "center", }}>
                                <Text style={{ color: "white", fontSize: 20, }}>Adicionar</Text>
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
        padding: 20,
        alignItems: "center",
        height: 376,
        width: 265,
        borderRadius: 20,
        backgroundColor: "#06467f",

    },
    inserirP: {
        marginTop: 20,
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


});