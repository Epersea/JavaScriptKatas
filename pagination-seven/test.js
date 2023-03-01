const { assert } = require('chai');
const mocha = require('mocha');
const Pagination = require('./pagination.js');

describe('Pagination Seven',() => {

    it('Paginates less than 7 pages', () => {
        const pageMaker = new Pagination(5, 2);
        
        const fivePages = pageMaker.pagination();

        assert.equal(fivePages, '1 (2) 3 4 5');
    })

    it('Paginates 7 pages', () => {
        const pageMaker = new Pagination(7, 3);
        
        const sevenPages = pageMaker.pagination();

        assert.equal(sevenPages, '1 2 (3) 4 5 6 7');
    })

    it('Paginates +7 pages when current page is within the first 4', () => {
        const pageMaker = new Pagination(28, 3);
        
        const currentFirst = pageMaker.pagination();

        assert.equal(currentFirst, '1 2 (3) 4 5 ... 28');
    })

    it('Paginates +7 pages when current page is the fifth', () => {
        const pageMaker = new Pagination(17, 5);
        
        const currentThird = pageMaker.pagination();

        assert.equal(currentThird, '1 ... 4 (5) 6 ... 17');
    })

    it('Paginates +7 pages when current page is in the middle', () => {
        const pageMaker = new Pagination(80, 6);
        
        const currentMiddle = pageMaker.pagination();

        assert.equal(currentMiddle, '1 ... 5 (6) 7 ... 80');
    })

    it('Paginates +7 pages when current page is fifth to last', () => {
        const pageMaker = new Pagination(12, 8);
        
        const currentFourthToLast = pageMaker.pagination();

        assert.equal(currentFourthToLast, '1 ... 7 (8) 9 ... 12');
    })

    it('Paginates +7 pages when current page is within the last 4', () => {
        const pageMaker = new Pagination(100, 99);
        
        const currentSecondToLast = pageMaker.pagination();

        assert.equal(currentSecondToLast, '1 ... 96 97 98 (99) 100');
    })

})