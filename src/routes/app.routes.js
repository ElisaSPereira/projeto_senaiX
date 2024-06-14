import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign, Octicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CadastroP from "../screens/CadastroP";
import Profile from "../screens/Profile";
import Categoria from "../screens/Categoria"
import Home from "../screens/Home";
import CatergoriaP from "../screens/CadastroC";
import ProdutoE from "../screens/ProdutoE";
import CategoriaE from "../screens/CategoriaE";
import CadastroC from "../screens/CadastroC";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CadastroP" component={CadastroP} />

      <Stack.Screen name="ProdutoE" component={ProdutoE} />
    </Stack.Navigator>
  );
}

function CategoriaStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categoria" component={Categoria} />
      <Stack.Screen name="CategoriaE" component={CategoriaE} />
      <Stack.Screen name="CadastroC" component={CadastroC} />
    </Stack.Navigator>
  );
}



export default function AppRoutes() {
  return (
    


    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#AEAEB3",
        tabBarActiveBackgroundColor: "#002D62",
        tabBarInactiveBackgroundColor: "#002D62"
      }}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          title: "HomeStackScreen",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      
      <Tab.Screen
        name="CategoriaStackScreen"
        component={CategoriaStackScreen}
        options={{
          title: "CategoriaStackScreen",
          tabBarIcon: ({ color }) => (
            <Octicons name="three-bars" size={24} color={color} />

          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
