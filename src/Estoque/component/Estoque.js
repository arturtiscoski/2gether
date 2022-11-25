import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
} from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { Card, Checkbox, ActivityIndicator } from "react-native-paper";
import EstoqueHttpService from "../http/estoque-http";
import { MyQtdInput } from '../../utils/components/CadastroItem';

const ARRAY_NUM = 15;
function getColor(i) {
    const multiplier = 255 / (ARRAY_NUM - 1);
    const colorVal = i * multiplier;
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}
const initialData = [...Array(ARRAY_NUM)].map((d, index) => {
    const backgroundColor = getColor(index);
    return {
        key: index + 1,
        label: String(index) + "",
        height: 100,
        width: 60 + Math.random() * 40,
        backgroundColor,
        checked: false,
    };
});

const EstoqueComponent = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const params = route.params;

    const loadEstoque = async () => {
        try {
            setLoading(true);

            const response = await EstoqueHttpService.index();

            const data = response?.data?.data;

            data.map((item, index) => item.key = index)

            setData(data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error -> ", error);
        }
    };

    const onSave = async () => {
        try {
            setLoading(true);

            data.map((item, index) => item.ordination = index+1)

            console.log('Data -> ', data)

            for (let i = 0; i < data.length; i++) {
                const dat = data[i];

                await EstoqueHttpService.save(dat);
            }

            setLoading(false);
            loadEstoque();
        } catch (error) {
            setLoading(false);
            console.log("error -> ", error);
        }
    }

    const onChangeText = (value, indexField, field) => {
        const index = data.findIndex((item) => item.key == indexField);

        const obj = data[index];

        obj[field] = value;

        data[index] = { ...obj, remove: value == 0 ? true : undefined };;

        setData([...data]);
    };

    const renderItem = ({ item, drag, isActive }) => {
        if (item.remove) {
            return;
        }
        return (
            <ScaleDecorator key={item.key}>
                <TouchableOpacity style={styles.item} onLongPress={drag}>
                    {/* {loading && (
                        <ActivityIndicator
                        style={{ marginTop: 20 }}
                        color="#455471"
                        />
                    )} */}
                    <Card style={{ marginHorizontal: 10 }}>
                        <Card.Content>
                            <View style={{ flexDirection: "row", alignContent: 'space-between' }}>
                                {/* <Icon
                                    name="minuscircleo"
                                    style={{ marginTop: 5, marginHorizontal: 5 }}
                                    size={25}
                                    color="#455471"
                                    onPress={() => onRemove(item.index)}
                                /> */}
                                {/* <Text style={styles.itemCircle}>
                                    {item.qtd}
                                </Text> */}
                                <Text
                                    style={[styles.input]}
                                >{item.name}</Text>
                                <MyQtdInput
                                    onChange={(value) =>
                                        onChangeText(value, item.key, "qtd")
                                    }
                                    value={item.qtd}
                                />
                                {/* <Checkbox 
                                    style={styles.check}
                                    status={item.checked ? "checked" : "unchecked"}
                                    onPress={() => {item.checked = !item.checked; handleOrganization([...data])}}
                                /> */}
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    useEffect(() => {
        loadEstoque();
    }, [params?.onHide]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '67.7%' }}/>
                    <Pressable style={styles.button} onPress={() => navigation.navigate("Cadastro de item", { type: 'ESTOQUE' })}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </Pressable>
                </View>
                <DraggableFlatList
                    data={data}
                    onDragEnd={({ data }) => setData(data)}
                    keyExtractor={(item) => item.key}
                    renderItem={renderItem}
                />
                <Pressable style={styles.saveButton} onPress={onSave}>
                    <Text style={styles.textButton}>Salvar</Text>
                </Pressable>
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    container: {
        width: '100%',
        borderRadius: 10,
        marginBottom: 10,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        paddingVertical: 5,
        marginHorizontal: 25
    },
    text: {
        marginVertical: 10,
        marginLeft: 35,
        fontSize: 17
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    buttonNew: {
        alignSelf: "flex-start",
        marginTop: 15,
        marginLeft: 30,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#455471",
    },
    button: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginVertical: 7,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#455471",
    },
    saveButton: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 34,
        marginVertical: 7,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#455471",
    },
    input: {
        fontSize: 15,
        marginTop: 6,
        width: '69.5%'
    },
    itemCircle: {
        backgroundColor: "rgba(231, 224, 236, 1)",
        marginRight: 10,
        paddingVertical: 9,
        paddingHorizontal: 11,
        textAlign: "center",
        width: '16%',
        borderRadius: 11,
        overflow: "hidden",
    },
    check: {
        alignItems: 'flex-end'
    }
});

export default EstoqueComponent;
