import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


import { getAuth } from 'firebase/auth';


const HomeScreen = ({navigation}) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const printInfo = () => {
        if(user != null){ 
            console.log(user.email);
        }
        else{
            console.log("Not logged in")
        }
    }
    const signOut = () => {
        auth.signOut().then(() => {
            console.log("Signed out")
            navigation.navigate('Login')
        }).catch((error) => {
            console.log("Error")
        });
    }
  return (

    <View style={styles.container}>
      <Text>Email</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={signOut}
      >
        <Text style={styles.buttonText}>Log Out</Text>


      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: '#3ed0d6',
        width:'100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,

    },


})