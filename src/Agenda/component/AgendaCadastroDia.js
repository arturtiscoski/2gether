// @flow
import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, Button, Pressable } from 'react-native'
import styles from './LoginScreen.style'
import AgendaHttpService from '../http/agenda-http';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const LoginScreen = ({ route, navigation }) => {
    const [ linhas, setLinhas ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const onSubmit = async () => {
        console.log('onSubmit -> ',linhas);

        try {
            setLoading(true);
            const finalLinhas = linhas.filter((linha) => !(linha.name == ''));

            if (finalLinhas.length > 0) {
                const params = { momento: moment(route.params.dia, 'DD/MM/YYYY').format('YYYY-MM-DD') }

                const agenda = await AgendaHttpService.save(params);

                for (let i = 0; i < finalLinhas.length; i++) {
                    const linha = finalLinhas[i];
                    
                    await AgendaHttpService.saveItem({ agendaId: agenda.data.id, ...linha });
                }

                setLoading(false);
                navigation.navigate('Agenda', { onHide: () => Math.random() });
            }
        } catch (error) {
            console.log('erro -> ', error)
            setLoading(false);
            alert('Erro: ' + error.message);
        }
    }

    const onLoad = async () => {
        try {
            setLoading(true);
            const params = { momento: moment(route.params.dia, 'DD/MM/YYYY').format('YYYY-MM-DD') }

            const response = await AgendaHttpService.getItems(params);

            const data = response?.data?.data[0].agendaItems;
            
            setLinhas(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert('Error: ' + error.message);
        }
    }

    const onChangeText = (value, index, field) => {
        const obj = linhas[index];

        obj[field] = value;

        linhas[index] = obj;

        setLinhas([...linhas]);
    };

    const onRemove = (index) => {
        const newLinhas = [ ...linhas ];

        newLinhas[index] = { ...newLinhas[index], remove: true }

        console.log('newLinhas -> ', newLinhas);

        setLinhas([...newLinhas]);
    };

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.label}>Descrição do evento</Text>
                {linhas &&
                    linhas.map((item, index) => {
                        if (item.remove) {
                            return
                        }
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    key={index}
                                    style={[styles.input]}
                                    placeholder={'Digite uma breve descrição'}
                                    onChangeText={text => onChangeText(text, index, 'name')}
                                    value={item.name}
                                />
                                <Icon 
                                    name="minuscircleo" 
                                    style={{ marginTop: 5, marginLeft: 10 }} 
                                    size={30} 
                                    color="#455471"
                                    onPress={() => onRemove(index)} />
                            </View>
                        )
                    })
                }
                <View style={{ flexDirection: "row" }}>
                    <Pressable style={styles.buttonNew} onPress={() => setLinhas([...linhas, {id: undefined, name: ''}])}>
                        <Text style={styles.text}>Nova linha</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={onSubmit}>
                        <Text style={styles.text}>Atualizar novos pontos</Text>
                    </Pressable>
                </View>
                {loading && <ActivityIndicator style={{ marginTop: 20 }} color='#455471'/>}
            </View>
        </View>
    )
}

export default LoginScreen