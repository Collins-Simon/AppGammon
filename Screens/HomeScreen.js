import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'


import { getDatabase, ref, child, get, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

let games;


const HomeScreen = ({route, navigation}) => {

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const dbRef = ref(db);


    let keyList = [];
    const [keys, setKeys] = React.useState([]);
    const [player1, setPlayer1] = React.useState("");
    const [player2, setPlayer2] = React.useState("");
    

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getData();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    

    function getData(){get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            //console.log(snapshot.val());
            
            snapshot.val()["games"] != null ? games = snapshot.val()["games"] : games = null;
            snapshot.val()["player1"] != null ? setPlayer1(snapshot.val()["player1"]) : setPlayer1(null);
            snapshot.val()["player2"] != null ? setPlayer2(snapshot.val()["player2"]) : setPlayer2 (null);
            //console.log(games["75045"]);
            //console.log(snapshot.val()["games"])
            
            Object.keys(games).forEach(function(key,index) {
                // key: the name of the object key
                // index: the ordinal position of the key within the object 
                //console.log(key, games[key]);
                keyList.push(key);
            });
            } else {
                console.log("No data available");
            }
            
            setKeys(keyList);


        }).catch((error) => {
        console.error(error);
        }); 
    }
    
    const signOut = () => {
        auth.signOut().then(() => {
            console.log("Signed out");

        }).catch((error) => {
            console.log("Error")
        });
        navigation.navigate('Login')
    }


    console.log(games)
    const resumeSavedGame = (gameId) => {
        console.log("====================================");
        console.log("gameid: " + gameId)
        console.log(games)
        navigation.navigate('NewGame', {
            player1: player1,
            player2: player2,
            gameID: gameId,
           
            moves: games[gameId]["rolls"],
            doubles: games[gameId]["doubles"],
            doublepos: 1,
            turn: 1,
            lastDatePlayed: new Date().getTime(),
            createdDate: new Date().toDateString(),

            })
        
    }
    console.log("player1: " + player1);
    const startnewgame = () => {
        navigation.navigate('NewGame', {
            player1: player1,
            player2: player2,
            gameID: "",
            moves: [],
            doubles: [],
            doublepos: 1,
            turn: 1,
            lastDatePlayed: new Date().getTime(),
            createdDate: new Date().toDateString(),

            })
    };
  return (

    <View style={styles.container}>
      <Text>Email: {user?.email}</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={signOut}
      >
        <Text style={styles.buttonText}>Log Out</Text>


      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {keys.map((item) => {
            return(<View style = {styles.gameContainer}>
                <Text style= {styles.textId}>{item}</Text>
                <TouchableOpacity
                style={styles.playButton}
                onPress={() => resumeSavedGame(item)}
                >
                    <Text style={styles.buttonText}>Play</Text>


                </TouchableOpacity>
            
            </View>)
        })}
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text>Email: {user?.email}</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={startnewgame}
            >
            <Text style={styles.buttonText}>New Game</Text>


      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    playButton: {
        backgroundColor: '#3ed0d6',

        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    gameContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',

        padding: 15,
        borderRadius: 10,
        borderColor: 'black',


    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,

    },
    text:{
        fontSize: 42,

    },


})