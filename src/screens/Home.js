import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/useAuth";

export default function Home() {
    const { signOut } = useAuth()
    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => signOut()}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}