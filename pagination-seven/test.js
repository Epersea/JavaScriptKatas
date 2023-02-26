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

    it('Paginates +7 pages when current page is the first', () => {
        const pageMaker = new Pagination(12, 1);
        
        const currentFirst = pageMaker.pagination();

        assert.equal(currentFirst, '(1) 2 3 4 5 ... 12');
    })

    it('Paginates +7 pages when current page is the third', () => {
        const pageMaker = new Pagination(12, 3);
        
        const currentThird = pageMaker.pagination();

        assert.equal(currentThird, '1 2 (3) 4 5 ... 12');
    })

    it('Paginates +7 pages when current page is in the middle', () => {
        const pageMaker = new Pagination(12, 6);
        
        const currentMiddle = pageMaker.pagination();

        assert.equal(currentMiddle, '1 ... 5 (6) 7 ... 12');
    })

    it('Paginates +7 pages when current page is fourth to last', () => {
        const pageMaker = new Pagination(12, 9);
        
        const currentFourthToLast = pageMaker.pagination();

        assert.equal(currentFourthToLast, '1 ... 8 (9) 10 11 12');
    })

    it('Paginates +7 pages when current page is second to last', () => {
        const pageMaker = new Pagination(12, 11);
        
        const currentSecondToLast = pageMaker.pagination();

        assert.equal(currentSecondToLast, '1 ... 8 9 10 (11) 12');
    })
})