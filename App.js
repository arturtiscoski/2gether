import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Agenda from './src/Agenda/component/Agenda';
import Logo from './assets/logo.png'
import { Button, Surface } from 'react-native-paper';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={Logo}
        style={styles.logo}
      ></Image>
      <Text>Home Screen</Text>
      <Button
        mode='elevated'
        style={styles.button}
        title='Details' onPress={() => navigation.navigate('Details')}>Details</Button>
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.MainView}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Details Screen</Text>
        <Button style={styles.button} mode='elevated' title='Home' onPress={() => navigation.navigate('Home')} >Home</Button>
        <Button style={styles.button} mode='elevated' title='Agenda' onPress={() => navigation.navigate('Agenda')} >Agenda</Button>
      </Surface>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Agenda" component={Agenda} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#FFD2D9",
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
    backgroundColor: "#ffb6c1",
  },
  surface: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    width: 300,
    height: 200,
    padding: 20,

  }
});

export default App;