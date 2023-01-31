class GameOfLife {
    constructor(grid) {
        this.grid = grid;
        this.height = this.grid.length;
        this.width = this.grid[0].length;
        this.generation = 1;
    }

    calculateNextGen() {

        if (this.hasSingleCell()) {
            this.grid = [0];
            return;
        }
        
        const newGrid = this.createNewGrid();

        this.grid = newGrid;
        this.generation++;
    }

    hasSingleCell() {
        return this.grid.flat().length === 1;
    }

    createNewGrid() {
        const emptyGrid = this.createEmptyGrid();
        const filledGrid = this.fillGrid(emptyGrid);
        return filledGrid;
    }

    createEmptyGrid() {
        let emptyGrid = new Array(this.height);
        for (let column = 0; column < emptyGrid.length; column++) {
            emptyGrid[column] = new Array(this.width);
        }
        return emptyGrid;
    }

    fillGrid(grid) {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                grid[row][column] = this.generateNewCell(row, column);
            }
        }
        return grid;
    }

    generateNewCell(row, column) {
        const currentCell = this.grid[row][column];
        const liveNeighbours = this.calculateLiveNeighbours(row, column);
        const newCell = this.deadOrAlive(currentCell, liveNeighbours);
        return newCell;
    }

    calculateLiveNeighbours(row, column) {
        let liveNeighbours = 0;

        for (let rowToCheck = row - 1; rowToCheck <= row + 1; rowToCheck++) {
            for (let colToCheck = column - 1; colToCheck <= column + 1; colToCheck++) {
                if (this.cellIsWithinGrid(rowToCheck, colToCheck) && this.cellIsANeighbour(rowToCheck, colToCheck, row, column)) {
                        liveNeighbours += this.grid[rowToCheck][colToCheck]
                }
            }
        }

        return liveNeighbours;
    }

    cellIsWithinGrid(row, column) {
        return row > -1 && column > -1 && row < this.height && column < this.width;
    }

    cellIsANeighbour(rowToCheck, colToCheck, row, column) {
        return rowToCheck !== row || colToCheck !== column
    }

    deadOrAlive(cell, liveNeighbours) {
        if (cell === 0) {
            return liveNeighbours === 3 ? 1 : 0;
        }
        if (cell === 1) {
            return liveNeighbours === 2 || liveNeighbours === 3? 1 : 0;
        }
    }
}



module.exports = GameOfLife