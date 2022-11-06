const assert = require('assert');
const stringCalculator = require('./stringCalc.js');

describe('String Calculator', function() {
    it('returns 0 if string is empty', function() {
        const emptyString = '';
        const result = stringCalculator(emptyString);
        assert.equal(result, '0');
    });

    it('returns number if just one', function() {
        const oneNumberString = '7';
        const result = stringCalculator(oneNumberString);
        assert.equal(result, '7');
    });

    it('adds two numbers', function() {
        const twoNumbersString = '7, 2';
        const result = stringCalculator(twoNumbersString);
        assert.equal(result, '9');
    });

    it('adds more than two numbers', function() {
        const threeNumbersString = '7, 2, 8';
        const result = stringCalculator(threeNumbersString);
        assert.equal(result, '17');
    });

    it('handles new lines between numbers', function() {
        const stringWithNewLines = '1\n2,3';
        const result = stringCalculator(stringWithNewLines);
        assert.equal(result, '6');
    });

    it('supports delimiters', function() {
        const stringWithDelimiters = '//;\n1;2';
        const result = stringCalculator(stringWithDelimiters);
        assert.equal(result, '3');
    })

    it('should not allow negatives', function() {
        const stringWithNegatives = '1,4,-1';
        const result = stringCalculator(stringWithNegatives);
        assert.equal(result, 'negatives not allowed: -1')
    })

    it('should include multiple negatives in error message', function() {
        const stringWithMultipleNegatives = '1,4,-1,-8';
        const result = stringCalculator(stringWithMultipleNegatives);
        assert.equal(result, 'negatives not allowed: -1, -8')
    })

    it('should ignore numbers bigger than 1000', function() {
        const stringWithBigNumber = '2, 1001';
        const result = stringCalculator(stringWithBigNumber);
        assert.equal(result, '2');
    })

})