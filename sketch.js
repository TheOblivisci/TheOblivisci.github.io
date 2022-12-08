let AlgorithmNumber = 1;

let cells = [];
let desFlag = false;

let tCell = 0;
let trace = -1;

let X = 100;
let cellSize = 20;

let cell = 0;

let weightRatio = 3;

let source = false;
let destination = false;

let m;
let n;

let visualizeButton;
let refreshButton;
let sourceButton;
let destinationButton;
let obstacleButton;
let weightButton;
let obsatacleMazeButton;
let weightMazeButton;
let homeButton;

let queue = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(255);

let buttonLength = 120
  let gap = (width - 9*buttonLength)/10;
  console.log(gap);

  textHeight = 35;
  
  position = gap;
  visualizeButton = createButton("Visualize");
  visualizeButton.position(position, textHeight);
  visualizeButton.mousePressed(visualizePath);
  visualizeButton.size(120,30);  
  visualizeButton.addClass('b1');

  position += gap + buttonLength;
  refreshButton = createButton("Refresh");
  refreshButton.position(position , textHeight);
  refreshButton.mousePressed(refreshScreen);
  refreshButton.size(120,30);
  refreshButton.addClass('b1');

  position += gap + buttonLength;
  sourceButton = createButton(" Source");
  sourceButton.position(position + 0.99*gap, textHeight);
  sourceButton.mousePressed(chooseSource);
  sourceButton.size(120,30);
  sourceButton.addClass('b3');

  position += gap + buttonLength;
  destinationButton = createButton(" Destination");
  destinationButton.position(position + 0.33*gap, textHeight);
  destinationButton.mousePressed(chooseDestination);
  destinationButton.size(120,30);
  destinationButton.addClass('b3');
  
  position += gap + buttonLength;
  obstacleButton = createButton(" Obstacle");
  obstacleButton.position(position - 0.33*gap, textHeight);
  obstacleButton.mousePressed(chooseObstacle);
  obstacleButton.size(120,30);
  obstacleButton.addClass('b3');

  position += gap + buttonLength;
  weightButton = createButton(" Weight");
  weightButton.position(position - 0.99*gap, textHeight);
  weightButton.mousePressed(chooseWeight);
  weightButton.size(120,30);
  weightButton.addClass('b3');
  
  position += gap + buttonLength;
  obsatacleMazeButton = createButton("Obstacle Maze");
  obsatacleMazeButton.position(position + 0.33*gap, textHeight);
  obsatacleMazeButton.mousePressed(createObstacleMaze);
  obsatacleMazeButton.size(120,30);
  obsatacleMazeButton.addClass('b3');
  
  position += gap + buttonLength;
  weightMazeButton = createButton("Weight Maze");
  weightMazeButton.position(position - 0.33*gap, textHeight);
  weightMazeButton.mousePressed(createWeightMaze);
  weightMazeButton.size(120,30);
  weightMazeButton.addClass('b3');
  
  position += gap + buttonLength;
  homeButton = createButton("Home Page");
  homeButton.position(position, textHeight);
  homeButton.mousePressed(backToHome);
  homeButton.size(120,30);
  homeButton.addClass('b1');

  speedSlider = createSlider(1, 30, 2);
  WeightHeavinessSlider = createSlider(1, 1000, 3);

  n = (height - X) / cellSize;
  m = width / cellSize;

  for (i = 0; i < m; i++) {
    cells[i] = [];
    for (j = 0; j < n; j++) {
      cells[i][j] = new Cell(i, j);
    }
  }

  display();
}

function draw() {
  background(255);
  size = queue.length;

  if (desFlag) {
    frameRate(speedSlider.value());
    if (size == 0) {
      textSize(10);
      fill(0);
      text("No path found between the source and the destination", 20, 80);
    } else if (AlgorithmNumber == 1) {
      for (k = 0; k < size; k++) {
        let curCell = queue.shift();
        a = curCell.a;
        b = curCell.b;

        if (a != 0) {
          cells[a - 1][b].visit(curCell);
        }
        if (a != m - 1) {
          cells[a + 1][b].visit(curCell);
        }
        if (b != 0) {
          cells[a][b - 1].visit(curCell);
        }
        if (b != n - 1) {
          cells[a][b + 1].visit(curCell);
        }
      }
    } else if (AlgorithmNumber == 2) {
      let curCell = popFromqueue();
      if (curCell.v == 3) {
        desFlag = false;
        tCell = curCell.pCell;
      }
      a = curCell.a;
      b = curCell.b;

      if (a != 0) {
        pushToqueue(cells[a - 1][b], curCell);
      }
      if (b != 0) {
        pushToqueue(cells[a][b - 1], curCell);
      }
      if (a != m - 1) {
        pushToqueue(cells[a + 1][b], curCell);
      }
      if (b != n - 1) {
        pushToqueue(cells[a][b + 1], curCell);
      }
    } else if (AlgorithmNumber == 3) {
      minVal = 100000000;
      for (k = size - 1; k >= 0; k--) {
        if (queue[k].d < minVal) minVal = queue[k].d;
      }

      for (k = size - 1; k >= 0; k--) {
        if (queue[k].d == minVal) {
          let curCell = queue[k];
          a = curCell.a;
          b = curCell.b;

          queue.splice(k, 1);

          if (a != 0) {
            cells[a - 1][b].visit(curCell);
          }
          if (a != m - 1) {
            cells[a + 1][b].visit(curCell);
          }
          if (b != 0) {
            cells[a][b - 1].visit(curCell);
          }
          if (b != n - 1) {
            cells[a][b + 1].visit(curCell);
          }
        }
      }
    } else if (AlgorithmNumber == 4) {
      k = 0;
      for (i = 1; i < size; i++) {
        if (queue[i].h < queue[k].h) k = i;
      }

      let curCell = queue[k];
      a = curCell.a;
      b = curCell.b;

      queue.splice(k, 1);

      if (a != 0) {
        cells[a - 1][b].visit(curCell);
      }
      if (a != m - 1) {
        cells[a + 1][b].visit(curCell);
      }
      if (b != 0) {
        cells[a][b - 1].visit(curCell);
      }
      if (b != n - 1) {
        cells[a][b + 1].visit(curCell);
      }
    } else if (AlgorithmNumber == 5) {
      k = 0;
      for (i = 1; i < size; i++) {
        if (queue[i].h + queue[i].d < queue[k].h + queue[k].d) k = i;
      }

      let curCell = queue[k];
      a = curCell.a;
      b = curCell.b;

      queue.splice(k, 1);

      if (a != 0) {
        cells[a - 1][b].visit(curCell);
      }
      if (a != m - 1) {
        cells[a + 1][b].visit(curCell);
      }
      if (b != 0) {
        cells[a][b - 1].visit(curCell);
      }
      if (b != n - 1) {
        cells[a][b + 1].visit(curCell);
      }
    }
  } else if (tCell != 0 && tCell.pCell != 0) {
    frameRate(speedSlider.value() * 3);
    tCell.drawPath();
    tCell = tCell.pCell;
  }

  display();

  if (cell) cell.highlightSelected();
}

class Cell {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.v = 1;
    this.d = -1;
    this.h = -1;
    this.pCell = -1;
  }

  visit(pCell) {
    if (this.v == 0 || this.v == 2) return;
    if (this.pCell == -1) this.pCell = pCell;
    if (this.v == 3) {
      desFlag = false;
      tCell = this.pCell;
    } else if (this.v == 1) {
      if (pCell != 0) this.d = pCell.d + 1;
      this.h = heuristic(this, destination);
      this.visited();
      queue.push(this);
    } else if (this.v == 5) {
      this.d = pCell.d + WeightHeavinessSlider.value();
      this.h = heuristic(this, destination);
      this.v = 6;
      queue.push(this);
    }
  }

  visited() {
    this.v = 0;
  }

  chooseAsSource() {
    this.visit(0);
    this.v = 4;
    this.d = 0;
  }

  chooseAsDestination() {
    this.v = 3;
  }

  chooseAsObstacle() {
    this.v = 2;
  }

  chooseAsWeight() {
    this.v = 5;
  }

  draw() {
    if (this.v == 0) fill(0, 200, 200);
    else if (this.v == 1) fill(225, 225, 225);
    else if (this.v == 2) fill(30);
    else if (this.v == 3) fill(255, 100, 100);
    else if (this.v == 4) fill(255, 102, 255);
    else if (this.v == 5) fill(200 - WeightHeavinessSlider.value() * 0.07);
    else if (this.v == 6) fill(0, 120, 120);
    else if (this.v == 7) fill(0, 60, 120);
    else if (this.v < 0) fill(255, 255, 102);

    rect(this.a * cellSize, this.b * cellSize + X, cellSize, cellSize);
    //text(this.v, this.a*cellSize + 5, this.b*cellSize + X + 15);
  }

  drawPath() {
    if (this.v != 6) this.v = trace;
    else this.v = 7;
    trace--;
  }

  highlightSelected() {
    fill(40, 250, 40);
    rect(this.a * cellSize, this.b * cellSize + X, cellSize, cellSize);
  }
}

function pushToqueue(cell, pCell) {
  if (cell.v == 1 || cell.v == 3 || cell.v == 5) {
    queue.push(cell);
    cell.pCell = pCell;
  }
}

function popFromqueue() {
  tempCell = queue.pop();
  if (tempCell.v == 1) tempCell.v = 0;
  if (tempCell.v == 5) tempCell.v = 6;
  return tempCell;
}

function display() {
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      cells[i][j].draw();
    }
  }
}

function heuristic(cellA, cellB) {
  return Math.abs(cellA.a - cellB.a) + Math.abs(cellA.b - cellB.b);
}

function visualizePath() {
  desFlag = true;
}

function refreshScreen() {
  cells = [];
  for (i = 0; i < m; i++) {
    cells[i] = [];
    for (j = 0; j < n; j++) {
      cells[i][j] = new Cell(i, j);
    }
  }
  desFlag = false;

  tCell = 0;
  trace = -1;

  cell = 0;

  source = false;
  destination = false;

  queue = [];
}

function mousePressed() {
  A = mouseX;
  B = mouseY;
  a = Math.floor(A / cellSize);
  b = Math.floor((B - X) / cellSize);

  cell = cells[a][b];
}

function chooseSource() {
  if (!source) {
    cell.chooseAsSource();
    source = cell;
    cell = 0;
  }
}

function chooseDestination() {
  if (!destination) {
    cell.chooseAsDestination();
    destination = cell;
    cell = 0;
  }
}

function chooseObstacle() {
  cell.chooseAsObstacle();
  cell = 0;
}

function chooseWeight() {
  cell.chooseAsWeight();
  cell = 0;
}

function createObstacleMaze() {
  for (i = 0; i < 40; i++) {
    cells[int(random(m))][int(random(n))].chooseAsObstacle();
  }
}

function createWeightMaze() {
  for (i = 0; i < 40; i++) {
    cells[int(random(m))][int(random(n))].chooseAsWeight();
  }
}

function backToHome(){
  window.open("https://www.w3schools.com");
}

function displaySelectFirstMessage(){
    textSize(10);
    fill(0);
    text("Please select a cell before clicking on the button.", 20, 80);
}
