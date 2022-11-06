# The challenge
The goal of this kata is to design a `checkCashRegister()` function which takes 3 arguments:

- The price of the items bought (`price`).

- The money given by the client (`cash`).

- The cash in drawer (`cid`). This is a bidimensional array with all coins available and the total amount of each one.

The function should return an object with two keys:

- `status`: "INSUFFICIENT_FUNDS" if there isn't enough change, "CLOSED" if there is no money left after giving change, "OPEN" if there is change left.

- `change`: an array of change given, ordered from highest to lowest coin denomination.

# Notes
- This kata was tested against a suite of tests found [here](https://gitlab.com/devscola/katasrunners/-/blob/master/ejercicios_basicos/4-cash-register/javascript/spec/cash_register.spec.js)