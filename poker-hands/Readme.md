# The challenge

The goal of this kata is to simulate a subset of a game of poker, where two player's hands are classified according to a predetermined ranking and then compared to establish a winner.

Hands can be classified in 9 different ranked types depending on different combinations of card suits and values, from straight flush (the highest rank) to high card (the lowest). 

For more details, please see the full kata [here](https://codingdojo.org/kata/PokerHands/)

# Notes

- The main challenge here was to find the rank of a hand in the simplest way possible. In the end, the method Hand.classifyHand() compares each hand against each hand type in descending ranking order. The classification criteria boils down to three functions: sameSuit() (finds out if all cards in the hand belong to the same suit), consecutiveValues() (finds out if all cards in the hand have consecutive values) and groupCardsByValue() (finds out the frequency of cards of a same value in the hand).

- Another point of note was finding out the criteria for tie breaking. The original kata is a bit inconsistent regarding the requirements. For some hand types, it specifies all the cards in the hand should be compared; for others, only the cards belonging to the biggest "value group" should be compared. This makes sense as in certain cases, a tie is not possible after a certain point (for instance, if there are two hands of the type "four of a kind", the value of the four-card group has to be necessarily different; likewise for hands that contain trios).
To simplify, I decided that my tie breaking function will call Hand.getTieCriteria(), which classifies all cards in the hand and stores them in an array, ordering them by value groups first and by value second. If the function detects a quartet or a trio of same-value cards, it stops running, since the rest of the values won't be needed.
After that, the tie breaker function compares the elements of both arrays in ascending order. The function stops running after finding the first differing element in the array, so it avoids innecessary calculations. There is a case where it does overcalculate: in hands with consecutive card values (straight flushes and straights), the tie can be decided on the value of the first card only. In this case, I have traded a bit of efficiency for the sake of convenience and simplification.

- Also, to improve efficiency, the function groupCardsByValue() is only called if the hand is not a straight flush, and the classifying function stops running as soon as it finds the hand type, thus performing the minimum amount of calculations possible.

- I originally created a Player class, but in the end found it redundant, as the information about players could easily be stored within the PokerHands class and the class didn't have any relevant methods.

- I simplified the output format, since I preferred to focus on the game logic.