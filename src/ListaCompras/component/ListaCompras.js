import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Pressable,
    TextInput
} from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { ActivityIndicator, Card, Checkbox, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

const ARRAY_NUM = 5;
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

const ListaComprasComponent = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [organization, setOrganization] = useState('manual');
    const params = route.params;

    const loadListaCompras = async () => {
        try {
            setLoading(true);

            // const listaCompras = await listaComprasHttpService.index({});

            // if (listaCompras?.data?.data) {
            //     const handledItems = await handleItems(listaCompras.data.data);

            //     console.log("handledItems -> ", handledItems);

            //     setItems(handledItems);
            // }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error -> ", error);
        }
    };

    const onChangeText = (value, indexField, field) => {
        const index = data.findIndex((item) => item.index == indexField);

        const obj = data[index];

        obj[field] = value;

        data[index] = obj;

        setData([...data]);
    };

    const onRemove = (indexField) => {
        const index = data.findIndex((item) => item.index == indexField);
        const newData = [...data];

        newData[index] = { ...newData[index], remove: true };

        setData([...newData]);
    };

    const renderItem = ({ item, drag, isActive }) => {
        if (item.remove) {
            return;
        }
        return (
            <ScaleDecorator>
                <TouchableOpacity style={styles.item} onLongPress={drag}>
                    {/* {loading && (
                        <ActivityIndicator
                        style={{ marginTop: 20 }}
                        color="#455471"
                        />
                    )} */}
                    <Card style={{ marginHorizontal: 10 }}>
                        <Card.Content>
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name="minuscircleo"
                                    style={{ marginTop: 5, marginHorizontal: 5 }}
                                    size={25}
                                    color="#455471"
                                    onPress={() => onRemove(item.index)}
                                />
                                <TextInput
                                    style={[styles.input]}
                                    placeholder={"Digite uma breve descrição"}
                                    onChangeText={(text) =>
                                        onChangeText(text, item.index, "name")
                                    }
                                    value={item.name}
                                />
                                <Checkbox 
                                    status={item.checked ? "checked" : "unchecked"}
                                    onPress={() => {item.checked = !item.checked; handleData([...data])}}
                                />
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    const handleData = (toHandle, org) => {
        const newData = toHandle;

        if (org == 'auto' || organization == 'auto') {
            newData.sort(function(x, y) {
                return (x.checked === y.checked)? 0 : x.checked? 1 : -1;
            });
        }

        console.log('newData -> ', newData);

        setData(newData);
    }   

    useEffect(() => {
        loadListaCompras();
    }, [params?.onHide]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                        const org = organization == 'manual' ? 'auto' : 'manual'
                        setOrganization(org)
                        handleData(data, org)
                    }}>
                    <Text style={styles.text}>Organização {organization == 'manual' ? 'manual' : 'automática'} ativada</Text>
                </TouchableOpacity>
                <DraggableFlatList
                    data={data}
                    onDragEnd={({ data }) => setData(data)}
                    keyExtractor={(item) => item.index}
                    renderItem={renderItem}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Pressable
                        style={styles.buttonNew}
                        onPress={() =>
                            setData([...data, {
                                index: data.length,
                                key: data.length + 1,
                                label: String(data.length) + "",
                                height: 100,
                                width: 60 + Math.random() * 40,
                                backgroundColor: getColor(data.length),
                                checked: false,
                                name: '',
                            }])
                        }
                    >
                        <Text style={styles.textButton}>Nova linha</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => console.log()}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </Pressable>
                </View>
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
        marginLeft: 32,
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
        marginTop: 15,
        marginLeft: 138,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#455471",
    },
    input: {
        width: '78%'
    },
});

export default ListaComprasComponent;
