import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Pressable,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { ActivityIndicator, Card, Modal } from "react-native-paper";
import AgendaHttpService from "../http/agenda-http";
import moment from "moment";

const AgendaComponent = ({ route, navigation }) => {
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);
    const params = route.params;

    const loadAgenda = async () => {
        try {
            setLoading(true);
            setItems();

            const agenda = await AgendaHttpService.index({});

            if (agenda?.data?.data) {
                const handledItems = await handleItems(agenda.data.data);

                console.log("handledItems -> ", handledItems);

                setItems(handledItems);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error -> ", error);
        }
    };

    const handleItems = async (items) => {
        const returnItems = {};

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            returnItems[item.momento] = [];

            for (let j = 0; j < item.agendaItems.length; j++) {
                const agendaItem = item.agendaItems[j];

                returnItems[item.momento].push({ name: agendaItem.name });
            }
        }

        return returnItems;
    };

    useEffect(() => {
        loadAgenda();
    }, [params?.onHide]);

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
                {loading && (
                    <ActivityIndicator
                        style={{ marginTop: 20 }}
                        color="#455471"
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Agenda
                theme={{
                    selectedDayBackgroundColor: "#455471",
                    todayTextColor: "#000",
                    dotColor: "#455471",
                }}
                items={items}
                renderEmptyData={() => (
                    <TouchableOpacity style={styles.item}>
                        <Card>
                            <Card.Content>
                                <View>
                                    <Text style={{ textAlign: "center" }}>
                                        Nenhum item cadastrado neste dia
                                    </Text>
                                </View>
                            </Card.Content>
                        </Card>
                        {loading && (
                            <ActivityIndicator
                                style={{ marginTop: 20 }}
                                color="#455471"
                            />
                        )}
                    </TouchableOpacity>
                )}
                onDayPress={(day) => {
                    console.log("day pressed");
                }}
                onDayLongPress={(day) => {
                    console.log("dia -> ", day);
                    navigation.navigate("Cadastro de dias", {
                        dia: moment(day.dateString, "YYYY-MM-DD").format(
                            "DD/MM/YYYY"
                        ),
                    });
                }}
                selected={moment().format()}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
            />
            <StatusBar />
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
        marginHorizontal: 25,
        marginTop: 17,
    },
});

export default AgendaComponent;
