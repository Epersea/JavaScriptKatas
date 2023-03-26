class Hand {
    constructor(cards) {
        this.hand = cards
    }

    cardValues = {
        'A' : 14,
        'K' : 13,
        'Q' : 12,
        'J' : 11,
        'T' : 10
    }

    classifyHand() {

        const straightFlush = this.isStraightFlush()
        if (straightFlush) return straightFlush

        const cardsByValue = this.groupCardsByValue()

        const fourOfAKind = this.isFourOfAKind(cardsByValue)
        if (fourOfAKind) return fourOfAKind

        const fullHouse = this.isFullHouse(cardsByValue)
        if (fullHouse) return fullHouse

        const flush = this.isFlush()
        if (flush) return flush
       
        const straight = this.isStraight()
        if (straight) return straight

        const threeOfAKind = this.isThreeOfAKind(cardsByValue)
        if (threeOfAKind) return threeOfAKind

        const twoPairs = this.isTwoPairs(cardsByValue)
        if (twoPairs) return twoPairs

        const pair = this.isPair(cardsByValue)
        if (pair) return pair

        const highCard = this.isHighCard()
        return highCard
    }

    isStraightFlush() {
        if (this.sameSuit() && this.consecutiveValues()) {
            return {
                type: 'straight flush',
                rank: 9,
            }
        }
    }

    isFourOfAKind(cardsByValue) {
        const numberOfcardsByValue = Object.values(cardsByValue)
        if (numberOfcardsByValue.includes(4)) {
            return {
                type: 'four of a kind',
                rank: 8
            }
        }
    }

    isFullHouse(cardsByValue) {
        const numberOfcardsByValue = Object.values(cardsByValue)
        if (numberOfcardsByValue.includes(3) && numberOfcardsByValue.includes(2)) {
            return {
                type: 'full house',
                rank: 7
            }
        }
    }

    isFlush() {
        if (this.sameSuit() && !this.consecutiveValues()) {
            return {
                type: 'flush',
                rank: 6
            }
        }
    }

    isStraight() {
        if (!this.sameSuit() && this.consecutiveValues()) {
            return {
                type: 'straight',
                rank: 5
            }
        }
    }

    isThreeOfAKind(cardsByValue) {
        const numberOfcardsByValue = Object.values(cardsByValue)
        if (numberOfcardsByValue.includes(3) && !numberOfcardsByValue.includes(2)) {
            return {
                type: 'three of a kind',
                rank: 4
            }
        }
    }

    isTwoPairs(cardsByValue) {
        const numberOfcardsByFrequency = Object.values(cardsByValue)
        const cardsOrderedByFrequency = numberOfcardsByFrequency.sort((a, b) => b - a)
        if (JSON.stringify(cardsOrderedByFrequency) === JSON.stringify([2, 2, 1])) {
            return {
                type: 'two pairs',
                rank: 3
            }
        }
    }

    isPair(cardsByValue) {
        const numberOfcardsByValue = Object.values(cardsByValue)
        if (numberOfcardsByValue.includes(2)) {
            return {
                type: 'pair',
                rank: 2
            }
        }
    }

    isHighCard() {
        return {
            type: 'high card',
            rank: 1
        }
    }

    sameSuit() {
        const firstSuit = this.hand[0][1]
        for (let i = 1; i < this.hand.length; i++) {
            if (this.hand[i][1] !== firstSuit) {
                return false
            }
        }

        return true
    }

    consecutiveValues() {
        let allValues = []
        for (let card of this.hand) {
            allValues.push(card[0])
        }
        allValues = allValues.sort((a, b) => a - b)
        for (let i = 1; i < allValues.length; i++) {
            if (allValues[i] - allValues[i - 1] !== 1) {
                return false
            }
        }

        return true
    }

    groupCardsByValue() {
        let allValues = []
        for (let card of this.hand) {
            if (card[0] in this.cardValues) {
                allValues.push(this.cardValues[card[0]])
            } else {
                allValues.push(card[0])
            }
        }

        let counts = {}
        allValues.forEach(e => counts[e] ? counts[e]++ : counts[e] = 1)

        return counts
    }

    getTieCriteria() {
        const cardsByValue = this.groupCardsByValue()
        const orderedValues = []
        const allEntries = Object.entries(cardsByValue)

        const indexOfQuartet = allEntries.findIndex(element => element[1] === 4)
        if(indexOfQuartet !== -1) {
            orderedValues.push(Number(allEntries[indexOfQuartet][0]))
            allEntries.splice(indexOfQuartet, 1)
        }

        const indexOfTrio = allEntries.findIndex(element => element[1] === 3)
        if(indexOfTrio !== -1) {
            orderedValues.push(Number(allEntries[indexOfTrio][0]))
            allEntries.splice(indexOfTrio, 1)
        }

        let pairValues = []

        const indexOfFirstPair = allEntries.findIndex(element => element[1] === 2)
        if(indexOfFirstPair !== -1) {
            pairValues.push(Number(allEntries[indexOfFirstPair][0]))
            allEntries.splice(indexOfFirstPair, 1)
        }

        const indexOfSecondPair = allEntries.findIndex(element => element[1] === 2)
        if(indexOfSecondPair !== -1) {
            pairValues.push(Number(allEntries[indexOfSecondPair][0]))
            allEntries.splice(indexOfSecondPair, 1)
        }

        pairValues = pairValues.sort((a, b) => b - a)
        orderedValues.push(...pairValues)

        let singleCardValues = []
        for (let card of allEntries) {
            singleCardValues.push(Number(card[0]))
        }

        singleCardValues = singleCardValues.sort((a, b) => b - a)
        orderedValues.push(...singleCardValues)

        return orderedValues   
    }
}


module.exports = Hand