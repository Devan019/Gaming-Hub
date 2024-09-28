function createEmptyGrid() {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] == num || grid[x][col] == num) {
            return false;
        }
    }
    let startRow = row - row % 3,
        startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(grid) {
    let l = findEmptyLocation(grid);
    if (!l) {
        return true;
    }
    let row = l[0],
        col = l[1];

    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) {
                return true;
            }
            grid[row][col] = 0;
        }
    }
    return false;
}

function findEmptyLocation(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] == 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function fillDiagonal(grid) {
    for (let i = 0; i < 9; i += 3) {
        fillBox(grid, i, i);
    }
}

function fillBox(grid, row, col) {
    let num;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            do {
                num = randomNum();
            } while (!isSafeInBox(grid, row, col, num));
            grid[row + i][col + j] = num;
        }
    }
}

function isSafeInBox(grid, row, col, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[row + i][col + j] == num) {
                return false;
            }
        }
    }
    return true;
}

function randomNum() {
    return Math.floor(Math.random() * 9) + 1;
}

function removeDigits(grid, numHoles) {
    let count = numHoles;
    while (count != 0) {
        let cellId = Math.floor(Math.random() * 81);
        let row = Math.floor(cellId / 9);
        let col = cellId % 9;
        if (grid[row][col] != 0) {
            grid[row][col] = 0;
            count--;
        }
    }
}

function generateSudoku(numHoles = 20) {
    let grid = createEmptyGrid();
    fillDiagonal(grid);
    solveSudoku(grid);
    removeDigits(grid, numHoles);
    return grid;
}

function printGrid(grid) {
    for (let row = 0; row < 9; row++) {
        console.log(grid[row].join(" "));
    }
}

let sudokuPuzzle = generateSudoku(30); // Adjust the number of holes as needed
printGrid(sudokuPuzzle);
