// @flow
import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, Pressable } from "react-native";
import styles from "./ListaCompras.style";
import ShopListHttpService from "../http/shoplist-http";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

const ListaComprasCadastro = ({ route, navigation }) => {
    const [linhas, setLinhas] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        console.log("onSubmit -> ", linhas);

        try {
            setLoading(true);
            const finalLinhas = linhas.filter((linha) => !(linha.name == ""));

            if (finalLinhas.length > 0) {
                for (let i = 0; i < finalLinhas.length; i++) {
                    const linha = finalLinhas[i];

                    await ShopListHttpService.save({
                        ...linha,
                    });
                }

                setLoading(false);
                navigation.navigate("Lista de Compras", { onHide: () => Math.random() });
            }
        } catch (error) {
            console.log("erro -> ", error);
            setLoading(false);
            alert("Erro: " + error.message);
        }
    };

    const onLoad = async () => {
        try {
            setLoading(true);
            const response = await ShopListHttpService.index();

            const data = response?.data?.data;

            setLinhas(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Error: " + error.message);
        }
    };

    const onChangeText = (value, index, field) => {
        const obj = linhas[index];

        obj[field] = value;

        linhas[index] = obj;

        setLinhas([...linhas]);
    };

    const onRemove = (index) => {
        const newLinhas = [...linhas];

        newLinhas[index] = { ...newLinhas[index], remove: true };

        console.log("newLinhas -> ", newLinhas);

        setLinhas([...newLinhas]);
    };

    useEffect(() => {
        onLoad();
    }, []);

    function MyQtdInput({ onChange, value = 1 }) {
        return (
            <View style={styles.formQtdInput}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => onChange(value - 1)} style={styles.formQtdAction}>
                        <Text style={{ color: "#fff" }}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.formQtdShadow}>{value}</Text>
                    <TouchableOpacity onPress={() => onChange(value + 1)} style={styles.formQtdAction}>
                        <Text style={{ color: "#fff" }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                {linhas &&
                    linhas.map((item, index) => {
                        if (item.remove) {
                            return;
                        }
                        return (
                            <View key={index} style={{ flexDirection: "row" }}>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder={"Digite uma breve descrição"}
                                    onChangeText={(text) =>
                                        onChangeText(text, index, "name")
                                    }
                                    value={item.name}
                                />
                                <MyQtdInput
                                    onChange={value => onChangeText(value, index, "qtd")}
                                    value={item.qtd}
                                />
                            </View>
                        );
                    })}
                <View style={{ flexDirection: "row" }}>
                    <Pressable
                        style={styles.buttonNew}
                        onPress={() =>
                            setLinhas([...linhas, { id: undefined, name: "", qtd: 1 }])
                        }
                    >
                        <Text style={styles.text}>Nova linha</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={onSubmit}>
                        <Text style={styles.text}>Atualizar novos pontos</Text>
                    </Pressable>
                </View>
                {loading && (
                    <ActivityIndicator
                        style={{ marginTop: 20 }}
                        color="#455471"
                    />
                )}
            </View>
        </View>
    );
};

export default ListaComprasCadastro;
