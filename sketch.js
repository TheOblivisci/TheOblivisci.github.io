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

let queue = [];

function setup() {
  let params = getURLParams();
  changeAlgorithmNumber(params.algo);
  
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(255);

  textHeight = 30;
  visualizeButton = createButton("Visualize");
  visualizeButton.position(20, textHeight);
  visualizeButton.mousePressed(visualizePath);

  refreshButton = createButton("Refresh");
  refreshButton.position(100, textHeight);
  refreshButton.mousePressed(refreshScreen);

  sourceButton = createButton("Choose Source");
  sourceButton.position(180, textHeight);
  sourceButton.mousePressed(chooseSource);

  destinationButton = createButton("Choose Destination");
  destinationButton.position(300, textHeight);
  destinationButton.mousePressed(chooseDestination);

  destinationButton = createButton("Choose Obstacle");
  destinationButton.position(440, textHeight);
  destinationButton.mousePressed(chooseObstacle);

  destinationButton = createButton("Choose Weight");
  destinationButton.position(560, textHeight);
  destinationButton.mousePressed(chooseWeight);

  obsatacleMazeButton = createButton("Obstacle Maze");
  obsatacleMazeButton.position(680, textHeight);
  obsatacleMazeButton.mousePressed(createObstacleMaze);

  weightMazeButton = createButton("Weight Maze");
  weightMazeButton.position(790, textHeight);
  weightMazeButton.mousePressed(createWeightMaze);

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
      fill(255);
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

function changeAlgorithmNumber(n) {
    AlgorithmNumber = n;
}
