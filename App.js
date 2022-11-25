import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Agenda from "./src/Agenda/component/Agenda";
import ListaCompras from "./src/ListaCompras/component/ListaCompras";
import Logo from "./assets/logo.png";
import { Button, Surface } from "react-native-paper";
import LoginScreen from "./src/Agenda/component/AgendaCadastroDia";
import Estoque from "./src/Estoque/component/Estoque";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CadastroItem from "./src/utils/components/CadastroItem";

function HomeScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text style={{ fontSize: 17 }}>
                Deixe sua vida em conjunto mais fácil e tranquila!
            </Text>
            <Image source={Logo} style={styles.logo}></Image>
            <Button
                textColor="#455471"
                mode="elevated"
                style={styles.button}
                title="Menu"
                onPress={() => navigation.navigate("Menu")}
            >
                Menu
            </Button>
        </View>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <View style={styles.MainView}>
            <Surface style={styles.surface}>
                <Button
                    textColor="#455471"
                    style={styles.button}
                    mode="elevated"
                    title="Agenda"
                    onPress={() => navigation.navigate("Agenda")}
                >
                    Agenda
                </Button>
                <Button
                    textColor="#455471"
                    style={styles.button}
                    mode="elevated"
                    title="Lista de Compras"
                    onPress={() => navigation.navigate("Lista de Compras")}
                >
                    Lista de Compras
                </Button>
                <Button
                    textColor="#455471"
                    style={styles.button}
                    mode="elevated"
                    title="Estoque"
                    onPress={() => navigation.navigate("Estoque")}
                >
                    Estoque
                </Button>
            </Surface>
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="2Gether">
                    <Stack.Screen name="2Gether" component={HomeScreen} />
                    <Stack.Screen name="Menu" component={DetailsScreen} />
                    <Stack.Screen name="Agenda" component={Agenda} />
                    <Stack.Screen
                        name="Lista de Compras"
                        component={ListaCompras}
                    />
                    <Stack.Screen
                        name="Cadastro de item"
                        component={CadastroItem}
                    />
                    <Stack.Screen
                        name="Cadastro de dias"
                        component={LoginScreen}
                        options={({ route }) => ({
                            title: `Data ${route.params.dia}`,
                        })}
                    />
                    <Stack.Screen name="Estoque" component={Estoque} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 30,
    },
    logo: {
        width: 400,
        height: 300,
    },
    button: {
        width: 200,
        height: 40,
        margin: 10,
        backgroundColor: "#f4f4f4",
    },
    surface: {
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#fff",
        width: 300,
        // height: 200,
        padding: 20,
    },
});

export default App;
