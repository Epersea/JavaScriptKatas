# The challenge
This is my implementation of Conway's Game of Life, following the below rules:

- You start with a two dimensional grid of cells, where each cell is either alive or dead. In this version of the problem, the grid is finite, and no life can exist off the edges. When calcuating the next generation of the grid, follow these rules:

- Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.

- Any live cell with more than three live neighbours dies, as if by overcrowding.

- Any live cell with two or three live neighbours lives on to the next generation.

- Any dead cell with exactly three live neighbours becomes a live cell.

- You should write a program that can accept an arbitrary grid of cells, and will output a similar grid showing the next generation.

For more background about the problem, please check its Wikipedia page [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

# Notes
- Since the kata description didn't specify the input/output format, I decided to work with bi-dimensional arrays, since it struck me as the most straightforward way to represent a grid.

- I focused on breaking down the process of generating the new grid as much as possible and assigning a method to each step: create a new empty grid with the same height and width as the original and filling it cell by cell. To do so, the program checks the number of living neighbours of each cell, making sure that each neighbour is within the grid bounds and is indeed a neighbour and not the cell itself. Finally, the program assigns a "dead or alive" state based on the live neighbours count.

- In each method, I tried to make the code readable and semantic, using explainer functions were needed.

- I used Mocha as my test suite. Since this library does not include array comparisons natively, I implemented a custom funcion in my test suite to be able to compare bi-dimensional arrays by flattening them and comparing each element.