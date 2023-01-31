const assert = require('assert');
//const { it } = require('mocha');
const GameOfLife = require('./gameOfLife.js');

const compareArrays = (a, b) => {
    a = a.flat();
    b = b.flat();
    return a.length === b.length &&
    a.every((element, index) => element === b[index]);
}

// Test examples taken from http://pi.math.cornell.edu/~lipa/mec/lesson6.html
describe('Game of Life', () => {
    it('A single live cell ends up dead', () => {
        const grid = [1];
        const game = new GameOfLife(grid);
    
        game.calculateNextGen();
    
        const nextGrid = [0];
        assert.equal(compareArrays(game.grid, nextGrid), true);
    })

    it('Calculates next generation with a 2x2 grid', () => {
        const grid = [[1, 1], [1, 0]];
        const game = new GameOfLife(grid);
    
        game.calculateNextGen();
    
        const nextGrid = [[1, 1], [1, 1]];
        assert.equal(compareArrays(game.grid, nextGrid), true);
    })

    it('Calculates next generation with a different 2x2 grid', () => {
        const grid = [[1, 1], [0, 0]];
        const game = new GameOfLife(grid);
    
        game.calculateNextGen();
    
        const nextGrid = [[0, 0], [0, 0]];
        assert.equal(compareArrays(game.grid, nextGrid), true);
    })

    it('Calculates next generation with a 3x3 grid', () => {
        const grid = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
        const game = new GameOfLife(grid);
    
        game.calculateNextGen();
    
        const nextGrid = [[0, 0, 0], [1, 1, 1], [0, 0, 0]];
        assert.equal(compareArrays(game.grid, nextGrid), true);
    })

    it('Calculates next generation with a 4x4 grid', () => {
        const grid = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
        const game = new GameOfLife(grid);
    
        game.calculateNextGen();
    
        const nextGrid = [[0, 0, 0, 0], [1, 1, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0]];
        assert.equal(compareArrays(game.grid, nextGrid), true);
    })

    it('Calculates two generations in the future', () => {
        const grid = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
        const game = new GameOfLife(grid);
    
        game.calculateNextGen();
        game.calculateNextGen();
    
        const nextGrid = [[0, 1, 0, 0], [1, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 0]];
        assert.equal(compareArrays(game.grid, nextGrid), true);
    })

    it('Calculates three generations in the future', () => {
        const grid = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
        const game = new GameOfLife(grid);
    
        game.calculateNextGen();
        game.calculateNextGen();
        game.calculateNextGen();
    
        const nextGrid = [[0, 0, 0], [1, 1, 1], [0, 0, 0]];
        assert.equal(compareArrays(game.grid, nextGrid), true);
    })
})