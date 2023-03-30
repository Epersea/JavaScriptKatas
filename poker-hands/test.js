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
                rank: 9
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
                rank: 8
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
                rank: 7
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
                rank: 6
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
                rank: 5
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
                rank: 4
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
                rank: 3
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
                rank: 2
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
                rank: 1
            }
            assert.equal(JSON.stringify(handClassification), JSON.stringify(handStats))
        })
    })

    describe('Winner selection', () => {
        it('Finds winner when rankings differ - Black wins', () => {
            const game = new PokerHands('Black: 2S 5S 3S 4S 6S  White: 8S 8D QH 6C AS')

            const winner = game.findWinner()

            assert.equal(winner, 'Black wins with straight flush.')
        })
        it('Finds winner when rankings differ - White wins', () => {
            const game = new PokerHands('Black: 2H 3D 5S 9C KD  White: 8S 8D QH 6C AS')

            const winner = game.findWinner()

            assert.equal(winner, 'White wins with pair.')
        })
        it('Finds winner when there is a tie', () => {
            const game = new PokerHands('Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH')

            const winner = game.findWinner()

            assert.equal(winner, 'White wins with high card.')
        })
        it('Declares tie when there is one', () => {
            const game = new PokerHands('Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH')

            const winner = game.findWinner()

            assert.equal(winner, "It's a tie! Both players have high card.")
        })

        
    })
    
})

let testData = [
    {
      name: "Test highest card win with no tie",
      round: "Black: 2H 3D 5S 9C KD    White: 2C 3H 4S 8C AH",
      expected: "White wins with high card.",
    },
    {
      name: "Test highest card win with one tie",
      round: "Black: 2H 3D 5S 9C KD    White: 2C 3H 4S 8C KH",
      expected: "Black wins with high card.",
    },
    {
      name: "Test tie on highest cards",
      round: "Black: 5H 6D JS KC AH    White: 5S 6S JC KH AS",
      expected: "It's a tie! Both players have high card.",
    },
    {
      name: "Test highest card win with no tie, reverse order",
      round: "Black: KD 9C 5S 3D 2H     White: AH 8C 4S 3H 2C",
      expected: "White wins with high card.",
    },
    {
      name: "Test highest card win with one tie, reverse order",
      round: "Black: KD 9C 5S 3D 2H    White: KH 8C 4S 3H 2C",
      expected: "Black wins with high card.",
    },
    {
      name: "Test tie on highest cards, reverse order",
      round: "Black: AH JD TS 8C 4H    White: AS JT TS 8S 4D",
      expected: "It's a tie! Both players have high card.",
    },
    {
      name: "Test highest card win with no tie, random order",
      round: "Black:  5S 9C 2H KD 3D     White: 8C 2C 4S AH 3H",
      expected: "White wins with high card.",
    },
    {
        name: "Test highest card win with one tie, reverse order",
        round: "Black: KD 9C 5S 3D 2H    White: KH 8C 4S 3H 2C",
        expected: "Black wins with high card.",
    },
    {
      name: "Test tie on highest cards, randomn order",
      round: "Black:  4H JD 8C AH TS     White: JT AS 4D 8S TS",
      expected: "It's a tie! Both players have high card.",
    },
    {
      name: "Test pair wins over highest card",
      round: "Black: 3S AS JH AH 5D    White: 5S QD AC 3S 8H",
      expected: "Black wins with pair.",
    },
    {
      name: "Test pair wins over smaller pair",
      round: "Black: 3S QS JH QH 5D    White: 5S AD AC 3S 8H",
      expected: "White wins with pair.",
    },
    {
      name: "Test pair wins over same pair thanks to one highest card",
      round: "Black: 3S QS JH QH 5D    White: 5S QD QC 3S 8H",
      expected: "Black wins with pair.",
    },
    {
      name: "Test pair wins over same pair thanks to three highest card",
      round: "Black: 3S QS JH QH 5D    White: 5S QD QC JS 4H",
      expected: "White wins with pair.",
    },
    {
      name: "Test two pairs win over single bigger pair",
      round: "Black: 3S 8S 5D 5H AS     White: 2S 2D 6S 4C 4D",
      expected: "White wins with two pairs.",
    },
    {
      name: "Test two pairs win over same pair thanks to second pair",
      round: "Black: 8S 8S 5D 5H AS     White: 2S 2D 6S 4C 4D",
      expected: "Black wins with two pairs.",
    },
    {
      name: "Test two pairs win over same two pair thanks to highest card",
      round: "Black: 8D 8S 5D 5H AS     White: 8C 8H 5C 5D QD",
      expected: "Black wins with two pairs.",
    },
    {
      name: "Test three of a kind wins over two bigger pairs",
      round: "Black: 8D 3S 3D 3H AS     White: 8C 8H 5C 5D QD",
      expected: "Black wins with three of a kind.",
    },
    {
      name: "Test three of a kind wins smaller three of a kind",
      round: "Black: 8D 3S 3D 3H AS     White: 8C 8H 8S 5D QD",
      expected: "White wins with three of a kind.",
    },
    {
      name: "Test straight wins bigger three of a kind",
      round: "Black: 2D 3S 4D 5H 6S     White: 8C 8H 8S 5D QD",
      expected: "Black wins with straight.",
    },
    {
      name: "Test straight wins smaller straight",
      round: "Black: 2D 3S 4D 5H 6S     White: 6D 7S 8D 9H TS",
      expected: "White wins with straight.",
    },
    {
      name: "Test flush wins bigger straight",
      round: "Black: 6D 7S 8D 9H TS     White: 2C 3C 5C 6C 8C",
      expected: "White wins with flush.",
    },
    {
      name: "Test flush wins smaller flush",
      round: "Black: TD 2D 5D 7D AD     White: 2C 3C 5C 6C 8C",
      expected: "Black wins with flush.",
    },
    {
      name: "Test full house wins over bigger flush",
      round: "Black: 2D 2S 2H 5H 5S     White: 6D 3D 4D AD QD",
      expected: "Black wins with full house.",
    },
    {
      name: "Test full house wins over smaller full house",
      round: "Black: 3D 3S 3H 5H 5S     White: 6D 6S 6C 2H 2S",
      expected: "White wins with full house.",
    },
    {name: "Test four of a kind wins over bigger full house",
    round: "Black: 3D 3S 3H 3C 5S     White: 6D 6S 6C 2H 2S",
    expected: "Black wins with four of a kind.",
  },
  {
    name: "Test four of a kind wins over smaller four of a kind",
    round: "Black: 3D 3S 3H 3C 5S     White: 6D 6S 6C 6H 2S",
    expected: "White wins with four of a kind.",
  },
  {
    name: "Test straight flush wins over bigger four of a kind",
    round: "Black: AS AD AH AC 3H     White: 4C 5C 6C 7C 8C",
    expected: "White wins with straight flush.",
  },
  {
    name: "Test straight flush wins over smaller straight flush",
    round: "Black: AS AD AH AC 3H     White: 4C 5C 6C 7C 8C",
    expected: "White wins with straight flush.",
  },
]


describe('External tests', function () {


  testData.forEach(test => {

    if (test.expected !== "") {
      describe(test.name, function () {
        it('Testing string: ' + test.round, function () {
            const game = new PokerHands(test.round)

            const winner = game.findWinner()
          assert.equal(winner, test.expected, 'Wrong winner!')
          // ;
        });
      });
    }
  });


});