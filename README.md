# Game of Life

![Demo 1](https://github.com/Arkaim/Arkaim.github.io/raw/master/demo.gif)

![Demo 2](https://github.com/Arkaim/Arkaim.github.io/raw/master/demo2.gif)

## Used technologies:

1. JavaScript
2. [p5.js](https://p5js.org/)

## Report

Game of Life as a lab for 'Computer Simulation'. Written in _JS_, using _p5_.js as a library for visual side of simulation.

---

Creating 2D grid for cells, each value on the grid is a cell. Number on the grid are to denote the life stage of a cell (0 - dead, 1 - alive). When **RUN** button is clicked, the simualtion begins. First of all program created second array filled with zeros.

```javascript
let next = make2DArray(cols, rows);

if (running) {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let state = grid[i][j];
			let sum = 0;
			let neighbors = countNeighbors(grid, i, j);

			if (state == 0 && neighbors == 3) {
				next[i][j] = 1;
			} else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
				next[i][j] = 0;
			} else {
				next[i][j] = state;
			}
		}
	}

	grid = next;
}
```

Then program goes through each cell in first (real) array and checks if cell will be alive at the next frame (checks 3 rules of Game of Life). The second array fills with this 'new' values. Then second array becomes the 'real' array and the loop continues.

```javascript
function countNeighbors(grid, x, y) {
	let sum = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			let col = (x + i + cols) % cols;
			let row = (y + j + rows) % rows;
			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}
```

Also, you can fill the array with random values by clicking **GET RANDOM** button

## Demo

https://arkaim.github.io/
