import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({navigation }) {
    const [player1, setPlayer1] = React.useState('')
    const [player2, setPlayer2] = React.useState('')

    React.useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
          }),
        [navigation]
      );
    const saveNamesAndmoveToGame = async () => {
        if (player1 === '' || player2 === '') {
            Alert.alert('Please enter both names')
        } else {
            await AsyncStorage.setItem('player1', player1)
            await AsyncStorage.setItem('player2', player2)
            navigation.navigate('NewGame', {
                player1: player1,
                player2: player2,
                gameID: "",
                moves: [],
                doubles: [],
                doublepos: 0,
                turn: 0,
                lastDatePlayed: new Date().getTime(),
                createdDate: new Date().toDateString(),

                })
        }
    }
  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={
        Platform.select({
           ios: () => -100,
           android: () => -200
        })()
      }>

        <View
        style={styles.textbox}>
            <Text style={styles.buttonOutlineText}>Please enter the names of your two players</Text>
        </View>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Player 1 Name"
                value={player1}
                onChangeText={text => setPlayer1(text)}
                style={styles.input}
            ></TextInput>
            <TextInput
                placeholder="Player 2 Name"
                value={player2}
                onChangeText={text => setPlayer2(text)}
                style={styles.input}
            ></TextInput>

        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={saveNamesAndmoveToGame}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Start Playing!</Text>
            </TouchableOpacity>
            

        </View>
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
    textbox:{
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",},

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: '60%',


    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingvertical: 20,
        fontSize: 14,
        marginTop:10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#3ed0d6',
        textAlign: 'center',
        fontSize: 20,

    },
    buttonContainer: {
        width: '60%',
        justifyContent:"center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: '#3ed0d6',
        width:'100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    
    buttonOutline: {
        backgroundColor: '#fff',
        marginTop: 5,
        boarderRadius: 0,
        borderColor: '#3ed0d6',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,

    },
    buttonOutlineText: {
        color: '#3ed0d6',
        fontWeight: '700',
        fontSize: 18,
    },
    
})