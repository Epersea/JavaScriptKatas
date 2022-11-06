module.exports = function stringCalculator(str) {
        if (!str) {
                return 0;
        }

        const allNumbers = getNumbers(str);

        if (hasNegatives(allNumbers)) {
                return negativeError(allNumbers);
        }

        const filteredNumbers = filterBigNumbers(allNumbers);

        return sumNumbers(filteredNumbers);
}


function getNumbers(str) {
        const numRegex = /-?[0-9]+/g;
        const numbers = str.match(numRegex).map(string => Number(string));
        return numbers;
}

function hasNegatives(numArray) {
        return !numArray.every(num => num >= 0);
}

function negativeError(numArray) {
        const negatives = [];

        numArray.forEach((num) => {
                if (num < 0) {
                        negatives.push(num);
                }
        })

        const errorMessage = 'negatives not allowed: ' + negatives.join(', ');
        return errorMessage;
}

function filterBigNumbers(numArray) {
        return numArray.filter(num => num <= 1000);
}

function sumNumbers(numArray) {
        const sum = numArray.reduce((acc, current) => {return acc + current});
        return sum;
}