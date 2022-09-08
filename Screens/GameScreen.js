import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'


export default function GameScreen({route, navigation }) {

    let rolls = route.params.moves;
    let doubles = route.params.doubles;
    //let doublepos = route.params.doublepos;

  
    const [turn, setTurn] = React.useState(route.params.turn);
    const [doublepos, setDoublepos] = React.useState(route.params.doublepos);
    const [player, setPlayer] = React.useState(route.params.player1);
    const [color, setColor] = React.useState(route.firstPlayerColor);

    const [leftDice, setLeftDice] = React.useState(rolls[(turn-1) * 2]);
    const [rightDice, setRightDice] = React.useState(rolls[((turn-1) * 2) + 1]);


   
    
    const endGame = () => {
        console.log("Game Ended");
    }
    const advanceTurn = () => {
        console.log("------------------");
        if(rightDice != undefined && leftDice === rightDice){
            
            console.log("doubles");
            setDoublepos(doublepos + 1);
            const [left, right] = getOrAddrandomroll(doublepos - 1, doubles);
            setLeftDice(left);
            setRightDice(right);
        }else{
            setTurn(turn + 1);
            const [left, right] = getOrAddrandomroll(turn - 1, rolls);
            setLeftDice(left);
            setRightDice(right);
            console.log("turn: " + turn)
            
            console.log("rolls.length: " + rolls.length/2)
            if(turn % 2){
                setPlayer(route.params.player2);
                setColor(route.secondPlayerColor);
            }else{
                setPlayer(route.params.player1);
                setColor(route.firstPlayerColor);
            }
        }
    }

    useEffect(()=>{
        console.log("useEffect");
        advanceTurn();
    }, [])


  return (
    <View style={styles.base}>
      <Text style = {styles.playerText}>{player}</Text>
      <View style ={styles.endGameContainer}>
      <TouchableOpacity
                onPress={endGame}
                style={[styles.button, {height: 50,}]}
            >
                <Text style={[styles.buttonText, {fontSize: 15, textAlign: 'center'}]}>Game Over?</Text>
        </TouchableOpacity>
      </View>
      <View style = {stylesvar(color).diceContainer}>
        <Text style = {styles.diceText}>{leftDice}</Text>
        <Text style = {styles.diceText}>{rightDice}</Text>
      </View>
      <View style = {styles.endTurnContainer}>
      <TouchableOpacity
                onPress={advanceTurn}
                style={styles.button}
            >
                <Text style={styles.buttonText}>End Turn</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const getOrAddrandomroll = (pos, rolllist) => {
    if(pos >= rolllist.length/ 2){
        console.log("New Dice Roll");
        const newroll = Math.floor(Math.random() * 6) + 1;
        rolllist.push(newroll);
        const newroll2 = Math.floor(Math.random() * 6) + 1;
        rolllist.push(newroll2);
        return [newroll, newroll2];
    }else{
        console.log("retrieved Dice Roll");
        console.log([rolllist[(pos-1) * 2], rolllist[((pos-1) * 2) + 1]])
        return [rolllist[(pos-1) * 2], rolllist[((pos-1) * 2) + 1]];
    }
}

const stylesvar = (StringColour) =>StyleSheet.create({
    diceContainer:{
        flex: 5,
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "60%",
        alignItems: "center",

        backgroundColor: StringColour,

    },


})

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    playerText: {
        flex: 2,
        fontSize: 30,
    },
    Container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,
        
    },
    
    diceText: {
        fontSize: 100,
    },
   
    endGameContainer:{
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 30,

    },
    endTurnContainer:{
        flex: 3,
    },
    button: {
        flex: 1,
        backgroundColor: '#3ed0d6',
        flexDirection: 'row',
        width: "60%",
        maxHeight: 70,
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        flex: 1,
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,

    },

})