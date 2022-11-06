# The challenge
The main goal of this kata was to create a string calculator that takes a string with several numbers as an input and returns a sum of said numbers in string format, with the following instructions:

- If the string is empty, it should return 0.

- The numbers can be separated by commas, newlines or other delimiters.

- Negative numbers should trigger an error listing all them.

- Numbers bigger than 1,000 should not be taken into account.

A more complete description of specifications can be found [here](https://katayuno-app.herokuapp.com/katas/5).

# Notes

- Since my version uses regex to find numbers in the string, it doesn't check for different delimiters –it simply ignores all of them. Since the kata description does not specify how to proceed if different delimiters are used, I have considered this to meet the requirements.

- The kata was relatively straightforward, so I tried to solve it without using loops for a bit of an extra challenge.

- Test are implemented with Mocha.