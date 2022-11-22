import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Pressable,
} from "react-native";
import { ActivityIndicator, Card, Modal } from "react-native-paper";

const ListaComprasComponent = ({ route, navigation }) => {
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);
    const params = route.params;

    const loadListaCompras = async () => {
        try {
            setLoading(true);
            setItems();

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

    useEffect(() => {
        loadListaCompras();
    }, [params?.onHide]);

    return (
        <View styles={styles.container}>
            <TouchableOpacity style={styles.item}>
                {/* {loading && (
                    <ActivityIndicator
                    style={{ marginTop: 20 }}
                    color="#455471"
                    />
                )} */}
            </TouchableOpacity>
            <Card style={{ marginLeft: 10, marginRight: 10 }}>
                <Card.Content>
                    <View>
                        <Text style={{ textAlign: "center" }}>
                            Nenhum item adicionado à lista de compras
                        </Text>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
});

export default ListaComprasComponent;
