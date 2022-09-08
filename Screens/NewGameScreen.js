import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native-stack';
import { firebase } from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'


TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

export default function NewGameScreen({route, navigation }) {
    const [firstPlayer, setFirstPlayer] = React.useState(route.params.player1)
    const [secondPlayer, setSecondPlayer] = React.useState(route.params.player2)
    const [firstPlayerColor, setFirstPlayerColor] = React.useState('#02e024')
    const [secondPlayerColor, setSecondPlayerColor] = React.useState('#fc03e7')

    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')

    let createdDate;
    let lastDatePlayed = new Date();
    if(route.params.createdDate != null){
        createdDate = (route.params.createdDate);
    }
    if(route.params.lastDatePlayed != null){
        lastDatePlayed = new Date(route.params.lastDatePlayed);
    }

    const swapColours = () => {
        const color = firstPlayerColor;
        setFirstPlayerColor(secondPlayerColor)
        setSecondPlayerColor(color)
    }
    const swapPlayers = () => {
        const player1 = firstPlayer;
        setFirstPlayer(secondPlayer);
        setSecondPlayer(player1);
    }
    const movetoGame = () => {
        navigation.navigate('Game', {
            player1: firstPlayer,
            player2: secondPlayer,
            gameID: route.params.gameID,
            moves: route.params.moves,
            doubles: route.params.doubles,
            doublepos: route.params.doublepos,
            turn: route.params.turn,
            lastDatePlayed: route.params.lastDatePlayed,
            createdDate: route.params.createdDate,
            })
    }

  return (
    <View style={styles.base}>
      <View style={styles.container}>{/* first date played  */}
            <Text style={styles.dateText}>Date Created: {createdDate}</Text>
      </View>

        <View style= {styles.container}>{/* Last date played */}
            <Text style={styles.dateText}>Last Played: {timeAgo.format(lastDatePlayed)}</Text>

        </View>


      <View style={styles.splitContainer}>{/* first second box */}
        <Text style= {styles.nameText}>First</Text>
        <Text style= {styles.nameText}>Second</Text>
      </View>


      <View style={styles.splitContainer}>{/* Player names */}
        <Text style= {styles.nameText}>{firstPlayer}</Text>
        <TouchableOpacity
                onPress={swapPlayers}
                style={styles.swapButton}
            >
                <Image
                    style={styles.icon}
                    source={require('../assets/swapIcon.png')}
                />
            </TouchableOpacity>
        <Text style= {styles.nameText}>{secondPlayer}</Text>
      </View>

      <View style={styles.splitContainer}>{/* colour section */}
        <View style= {stylesvar(firstPlayerColor).colorContainer}/>
        <TouchableOpacity
                onPress={swapColours}
                style={styles.swapButton}
            >
                <Image
                    style={styles.icon}
                    source={require('../assets/swapIcon.png')}
                />
            </TouchableOpacity>
        <View style= {stylesvar(secondPlayerColor).colorContainer}/>
      </View>



      <View style={[styles.container, {flex:2}]}>{/* PLay Button */}
      <TouchableOpacity
                onPress={movetoGame}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            
      </View>

    </View>
  )
}

const stylesvar = (StringColour) =>StyleSheet.create({
    colorContainer: {
        backgroundColor: StringColour,
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        color: "#f35",
        height: "100%",
    },


})

const styles =StyleSheet.create({
    base:{
        flex:1,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,


    },
    splitContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,
        
    },
    swapButton: {

    },
    dateContainer:{
        flex: 1,

    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    nameText: {
        fontSize: 20,
        width: "40%",
        textAlign: "center",
    },
    icon: {
        flex: 1,
        width: 50,
        marginHorizontal: 10,
        resizeMode: 'contain',


    },
    button: {
        backgroundColor: '#3ed0d6',
        width:'75%',
        height: '50%',

        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",

    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 30,

    },
    

})