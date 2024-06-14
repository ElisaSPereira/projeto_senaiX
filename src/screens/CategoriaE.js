import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import Cabecario from "../assets/cabecario.png";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { api } from '../services/api';

export default function CategoriaE({ route }) {
    const { name, id } = route.params;
    const navigation = useNavigation();
    const [nomecategoria, setNomeCategoria] = useState(name);
    const [error, setError] = useState("");

    async function handleSubmit() {
        setError("");
        if (!nomecategoria.trim()) {
            setError("O nome não pode estar vazio.");
            return;
        }
        try {
            const response = await api.patch(`categories/${id}`, {
                name: nomecategoria,
            });
            console.log(response.data);
            Alert.alert("Sucesso", "Categoria Atualizada");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Não foi possível comunicar com o servidor.");
            }
        }
    }

    

    return (
        <View style={style.container}>
            <View style={{ height: 70 }}>
                <Image source={Cabecario} style={style.image} />
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 15, marginLeft: 15 }}>
                <Ionicons name="arrow-back" size={34} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={style.cadastro}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 20 }}>Editar Categorias</Text>
                        <Ionicons name="image-outline" size={130} color="black" />
                        <TextInput
                            style={style.inserirP}
                            placeholder="Nome da Categoria"
                            value={nomecategoria}
                            onChangeText={setNomeCategoria}
                        />
                        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                        <TouchableOpacity onPress={handleSubmit}>
                            <View style={style.botaoEditar}>
                                <Text style={{ color: "white", fontSize: 20 }}>Editar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
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
        borderWidth: 5,
    },
    cadastro: {
        padding: 20,
        alignItems: "center",
        height: 376,
        width: 265,
        borderRadius: 20,
        backgroundColor: "#C3C3C351",
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
    botaoEditar: {
        width: 150,
        height: 60,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: "#001E59",
        alignItems: "center",
        justifyContent: "center",
    },
});
