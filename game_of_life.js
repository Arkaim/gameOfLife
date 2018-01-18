
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
var running = false;
var grid;
let cols;
let rows;
let resolution = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(windowWidth / resolution);
  rows = floor(windowHeight / resolution);

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function draw() {
  background(125);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(145,145,255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      } else {
        fill(100);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

   let next = make2DArray(cols, rows);

  if(running) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
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
  

}

function mousePressed() {
  for (var i = 0; i < cols; i++) {  
    for (var j = 0; j < rows; j++) {     
      if (mouseX >= i * resolution && mouseX <= i * resolution + resolution && mouseY >= j * resolution && mouseY <= j * resolution + resolution ) {
        if (grid[i][j] == 0) {
          grid[i][j] = 1; 
        } else {
          grid[i][j] = 0;
        }
      } 
    }
  }
}

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

function changeRunningState() {
  running = !running;
  if(running) {
    document.getElementById('state-btn').innerHTML = 'STOP';
    document.getElementById('state-btn').style.backgroundColor = "red";
  }else {
    document.getElementById('state-btn').innerHTML = 'RUN';
  }
  
  return !running;
}