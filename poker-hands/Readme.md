# The challenge

The goal of this kata is to simulate a subset of a game of poker, where two player's hands are classified according to a predetermined ranking and then compared to establish a winner.

Hands can be classified in 9 different ranked types depending on different combinations of card suits and values, from straight flush (the highest rank) to high card (the lowest). 

For more details, please see the full kata [here](https://codingdojo.org/kata/PokerHands/)

# Notes

- The main challenge here was to find the rank of a hand in the simplest way possible. In the end, the method Hand.classifyHand() compares each hand against each hand type in descending ranking order. The classification criteria boils down to three functions: sameSuit() (finds out if all cards in the hand belong to the same suit), consecutiveValues() (finds out if all cards in the hand have consecutive values) and groupCardsByValue() (finds out the frequency of cards of a same value in the hand).

- Another point of note was finding out the criteria for tie breaking. The original kata is a bit inconsistent regarding the requirements. For some hand types, it specifies all the cards in the hand should be compared; for others, only the cards belonging to the biggest "value group" should be compared; and yet for others, no tie breaking criteria was specified. In some cases this made sense as a tie was not possible (for instance, there is no possible tie between two hands of the type "four of a kind").
To simplify, I decided that my tie breaking function will compare all cards in the hand, ordering them by value groups first and by value second. The function is called only if there is indeed a tie, so it avoids innecessary calculations.

- Also, to improve efficiency, the function groupCardsByValue() is only called if the hand is not a straight flush, and the classifying function stops running as soon as it finds the hand type, thus performing the minimum amount of calculations possible.

- I originally created a Player class, but in the end found it redundant, as the information about players could easily be stored within the PokerHands class and the class didn't have any relevant methods.

- I simplified the output format, since I preferred to focus on the game logic.