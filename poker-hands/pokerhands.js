const Hand = require('./hand.js')

class PokerHands {
    constructor(stringInput) {
        this.stringInput = stringInput
        this.players = this.parseStringInput(stringInput)
    }

    parseStringInput(string) {
        let player1 = {}
        let player2 = {}

        const nameRegEx = /[a-zA-Z]*:/g
        const nameArray = string.match(nameRegEx)
        player1.name = nameArray[0].replace(':', '')
        player2.name = nameArray[1].replace(':', '')

        const cardRegEx = /([0-9A-Z][A-Z] ){4}[0-9A-Z][A-Z]/g
        const deckArray = string.match(cardRegEx)
        player1.cards = deckArray[0].split(' ')
        player2.cards = deckArray[1].split(' ')

        return {
            player1,
            player2
        }
    }

    findWinner() {
        const player1Hand = new Hand(this.players.player1.cards)
        const player2Hand = new Hand(this.players.player2.cards)
        const hand1Info = player1Hand.classifyHand()
        const hand2Info = player2Hand.classifyHand()
        let winner = {}
        
        if (hand1Info.rank > hand2Info.rank) {
            winner.name = this.players.player1.name
            winner.play = hand1Info.type
        }
        else if (hand1Info.rank < hand2Info.rank) {
            winner.name = this.players.player2.name
            winner.play = hand2Info.type
        }   
        else {
            winner = this.tieBreaker(player1Hand, player2Hand)
        }

        if (winner.name === 'tie') {
            return `It's a tie! Both players have ${winner.play}.`
        } else {
            return `${winner.name} wins with ${winner.play}.`
        }
    }

    tieBreaker(player1Hand, player2Hand) {
        const player1Tie = player1Hand.getTieCriteria()
        const player2Tie = player2Hand.getTieCriteria()
        const winner = {}

        for (let i = 0; i < player1Tie.length; i++) {
            if (player1Tie[i] > player2Tie[i]) {
                winner.name = this.players.player1.name
                winner.play = player1Hand.classifyHand().type
                return winner
            } else if (player2Tie[i] > player1Tie[i]) {
                winner.name = this.players.player2.name
                winner.play = player2Hand.classifyHand().type
                return winner
            } 
        }
        
        winner.name = 'tie'
        winner.play = player1Hand.classifyHand().type

        return winner
    }
}

module.exports = PokerHands;