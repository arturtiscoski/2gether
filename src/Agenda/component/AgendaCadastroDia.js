// @flow
import React, { useEffect } from 'react'
import { Alert, Text, TextInput, View, Button } from 'react-native'
import styles from './LoginScreen.style'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import AgendaHttpService from '../http/agenda-http';
import moment from 'moment';

const fieldValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('A descrição não pode ficar vazia'),
})

const LoginScreen = ({ route }) => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(fieldValidationSchema) })
    const onSubmit = async (data) => {
        console.log(data);

        try {
            const params = { momento: moment(route.params.dia, 'DD/MM/YYYY').format('YYYY-MM-DD'), ...data }

            console.log('params -> ', params);

            const agenda = await AgendaHttpService.save(params);

            console.log('agenda -> ', agenda.data.id)

            const response = await AgendaHttpService.saveItem({ agendaId: agenda.data.id, ...data });

            console.log('response -> ', response);
            alert('Sucesso!');
        } catch (error) {
            console.log('erro -> ', error)
            alert('Erro: ' + error.message);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <TextField
                label={'Descrição do evento'}
                error={errors?.name}
                placeholder={'Digite uma breve descrição'}
                onChangeText={text => setValue('name', text)}
                input="name"
                register={register}
            />
            <Button onPress={handleSubmit(onSubmit)} title={'Continuar'} />
        </View>
    )
}

const TextField = ({ error, label, input, register, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.input, !!error && styles.borderError]}
            {...register(input, { required: true })}
            {...inputProps}
        />
        {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
)

export default LoginScreen