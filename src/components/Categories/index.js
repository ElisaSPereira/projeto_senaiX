import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
//import Categoria1 from "src/assets/cat.jpg";



export default function Categories({nome}) {

    <View style={style.produto}>

        <View>
            <Text style={style.nome}>{nome}</Text>
        </View>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("CategoriaE")}>
                <MaterialCommunityIcons name="lead-pencil" size={24} style={style.pincel} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialIcons name="delete" size={24} style={style.delete} />
            </TouchableOpacity>
        </View>

    </View>
}

const style = StyleSheet.create({

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

})