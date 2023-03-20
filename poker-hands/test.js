const assert = require('assert');
const mocha = require('mocha');
const PokerHands = require('./pokerhands.js');

describe('Poker Hands', () => {
    it('Parses string input and creates Player objects', () => {
        const game = new PokerHands('Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH')

        const players = game.players
        const player1 = players.player1
        const player2 = players.player2
        const player1Name = 'Black'
        const player1Cards = ['2H', '3D', '5S', '9C', 'KD']
        const player2Name = 'White'
        const player2Cards = ['2C', '3H', '4S', '8C', 'AH']
        assert.equal(player1.name, player1Name)
        assert.equal(JSON.stringify(player1.cards), JSON.stringify(player1Cards))
        assert.equal(player2.name, player2Name)
        assert.equal(JSON.stringify(player2.cards), JSON.stringify(player2Cards))
    })
})