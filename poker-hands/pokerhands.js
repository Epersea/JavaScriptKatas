const Player = require('./player.js');

class PokerHands {
    constructor(stringInput) {
        this.stringInput = stringInput
        this.players = this.parseStringInput(stringInput)
    }

    parseStringInput(string) {

        const nameRegEx = /[a-zA-Z]*:/g
        const nameArray = string.match(nameRegEx)
        const player1Name = nameArray[0].replace(':', '')
        const player2Name = nameArray[1].replace(':', '')

        const cardRegEx = /([0-9A-Z][A-Z] ){4}[0-9A-Z][A-Z]/g
        const deckArray = string.match(cardRegEx)
        const player1Cards = deckArray[0].split(' ')
        const player2Cards = deckArray[1].split(' ')

        const player1 = new Player (player1Name, player1Cards)
        const player2 = new Player (player2Name, player2Cards)

        return {
            player1 : player1,
            player2 : player2
        }
    }
}

module.exports = PokerHands;