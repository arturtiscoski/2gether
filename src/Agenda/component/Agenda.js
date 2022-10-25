import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import AgendaHttpService from '../http/agenda-http';
import moment from 'moment';

const AgendaComponent = () => {
    const [items, setItems] = useState({});
    
    const loadAgenda = async () => {
        try {
            setItems();

            const agenda = await AgendaHttpService.index({});

            if (agenda?.data?.data) {
                const handledItems = await handleItems(agenda.data.data);

                console.log('handledItems -> ', handledItems);
    
                setItems(handledItems)
            }
        } catch (error) {
            console.log('error -> ', error);
        }
    }

    const handleItems = async (items) => {
        const returnItems = {};

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            returnItems[item.momento] = [];

            for (let j = 0; j < item.agendaItems.length; j++) {
                const agendaItem = item.agendaItems[j];

                returnItems[item.momento].push({ name: agendaItem.name })
            }
        }

        return returnItems;
    }

    useEffect(() => {
        loadAgenda();
    }, [])

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
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                // loadItemsForMonth={loadItems}
                onDayPress={day => {
                    console.log('day pressed');
                }}
                onDayLongPress={() => console.log('looooooong press')}
                selected={moment().format()}
                minDate={moment().format()}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
            />
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});

export default AgendaComponent;