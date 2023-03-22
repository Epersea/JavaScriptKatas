const assert = require('assert');
const mocha = require('mocha');
const PokerHands = require('./pokerhands.js');
const Hand = require('./hand.js');

describe('Poker Hands', () => {
    describe('Game set up', () => {
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

    describe('Hand classification', () => {
        it('Identifies straight flush', () => {
            const game = new PokerHands('Black: 2S 5S 3S 4S 6S   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'straight flush',
                rank: 9,
                tie: [6,5,4,3,2]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))

        })
        it('Identifies four of a kind', () => {
            const game = new PokerHands('Black: 8S 8D 8H 8C 6S   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'four of a kind',
                rank: 8,
                tie: [8,6]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
        it('Identifies full house', () => {
            const game = new PokerHands('Black: 8S 8D 8H AC AS   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'full house',
                rank: 7,
                tie: [8, 14]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
        it('Identifies flush', () => {
            const game = new PokerHands('Black: 7D 2D AD 9D 8D   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'flush',
                rank: 6,
                tie: [14,9,8,7,2]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
        it('Identifies straight', () => {
            const game = new PokerHands('Black: 2H 5C 3S 4D 6S   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'straight',
                rank: 5,
                tie: [6,5,4,3,2]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
        it('Identifies three of a kind', () => {
            const game = new PokerHands('Black: 8S 8D 8H QC AS   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'three of a kind',
                rank: 4,
                tie: [8, 14, 12]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
        it('Identifies two pairs', () => {
            const game = new PokerHands('Black: 8S 8D QH QC AS   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'two pairs',
                rank: 3,
                tie: [12, 8, 14]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
        it('Identifies pair', () => {
            const game = new PokerHands('Black: 8S 8D QH 6C AS   White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'pair',
                rank: 2,
                tie: [8, 14, 12, 6]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
        it('Identifies high card', () => {
            const game = new PokerHands('Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH')

            const player1 = game.players.player1
            const player1Hand = new Hand(player1.cards)
            const handClassification = player1Hand.classifyHand()

            const handStats = {
                type: 'high card',
                rank: 1,
                tie: [13, 9, 5, 3, 2]
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
    })
    
})