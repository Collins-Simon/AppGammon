import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'



const LoginScreen = ({navigation }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    let authInprogress = false;


    const registerUser = () => {
        
        if(authInprogress){ console.log("authorisation in progress"); return;}
        authInprogress = true;
        console.log("Registering user...")
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Logged in as: " + user.email)
            authInprogress = false;
            navigation.navigate('Register')
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage)
            authInprogress = false;
            Alert.alert("failed to Register", errorMessage)
          });

    }
    const signInUser = () => {

        if(authInprogress){ console.log("authorisation in progress"); return;}
        authInprogress = true;
        const auth = getAuth();
        console.log("Logging in")
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Logged in as: " + user.email)
            authInprogress = false;
            navigation.navigate('Home')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error")
            console.log(errorMessage)
            authInprogress = false;
            Alert.alert("failed to Sign in", errorMessage)
        });
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

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            ></TextInput>
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            ></TextInput>

        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => { signInUser() }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { registerUser() }}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
            

        </View>
    </KeyboardAvoidingView>
    
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingvertical: 20,
        fontSize: 14,

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