var moves = 0;
var tbl, rows, cols, totalSquares, blankSpot; //cols ==width  rows ==height
var array = []; //temp may change later DL
var array2d = [];
var correct2d = [];
var correctOrder = []; // to compare with array later... with 0
var perm = new Array(totalSquares);
var flag = new Array(totalSquares);

// function to increment move html element
function incrementMoves() {
    moves++;
    document.getElementById("moves").innerHTML = moves;
}

// shuffle array
function shuffle(array) { // Fisher-Yates shuffle aka Knuth shuffle
    //this shuffle allows the same an equal chance for every permutation because
    var index = array.length,
        temp, rand; //it is like randomly picking things out of a hat all permutation have same probability
    while (0 != index) //while still elements
    {
        rand = Math.floor(Math.random() * index);
        index -= 1;
        temp = array[index];
        array[index] = array[rand];
        array[rand] = temp;
    }
    return array; //return the shuffled array
}

// Function to return index in array
function findPieceInArray(pieceVal) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == pieceVal)
            break;
    }
    //console.log("index of piece to move in array: "+i);
    return i;
}

// Function to move handle moving pieces by user
function movePiece(piece) {
    //console.log(piece);
    // blankSpot-1 = the blankSpot location in array
    var arrLocation = blankSpot - 1; // location of blank spot in array
    var pieceLocation = findPieceInArray(piece);

    //console.log("Blank Spot Array location: "+arrLocation);
    // only allowable move if +-1 / +-cols
    if (((arrLocation + cols) == pieceLocation)) {
        //console.log("move piece up");
        moveUp(pieceLocation);
    } else if (((arrLocation - cols) == pieceLocation)) {
        //console.log("move piece down");
        moveDown(pieceLocation);
    } else if (((arrLocation + 1) == pieceLocation)) {
        //  console.log("move piece left");
        moveLeft(pieceLocation);
    } else if (((arrLocation - 1) == pieceLocation)) {
        //console.log("move piece right");
        moveRight(pieceLocation);
    } else {
        //console.log("illegal move");
        document.getElementById(piece).className += " illegal";
        // piece.style.backgroundColor = "#FF3300";
        // piece.style.color = "#FFFFFF";
        setTimeout("RemoveHighlight('" + piece + "');", 500);
    }
    checkBoard();
}

function RemoveHighlight(piece) {
    document.getElementById(piece).classN
    document.getElementById(piece).style.backgroundColor = "#FFFFCC";
    document.getElementById(piece).style.color = "#2c3e50";
}

function moveUp(pieceLocation) {
    //console.log("Moving piece up");
    var pieceToMove = pieceLocation;
    var blankLocation = blankSpot - 1;
    var temp;
    // console.log(array); // print array before swap

    // swap places in array
    temp = array[pieceToMove];
    //console.log(temp);
    // put 0 into pieceToMove
    array[pieceToMove] = array[blankLocation];

    array[blankLocation] = temp;
    //console.log(array); // print array after swap
    updateBoard(); // update board after move
    incrementMoves();
}

function moveDown(pieceLocation) {
    //console.log("Moving piece down");
    var pieceToMove = pieceLocation;
    var blankLocation = blankSpot - 1;
    var temp;
    // console.log(array); // print array before swap

    // swap places in array
    temp = array[blankLocation];
    //console.log(temp);
    // put 0 into pieceToMove
    array[blankLocation] = array[pieceToMove];
    array[pieceToMove] = temp;
    //console.log(array); // print array after swap
    updateBoard(); // update board after move
    incrementMoves();

}

function moveRight(pieceLocation) {
    //console.log("Moving piece right");
    var pieceToMove = pieceLocation;
    var blankLocation = blankSpot - 1;
    var temp;
    // console.log(array); // print array before swap

    // swap places in array
    temp = array[pieceToMove];
    //console.log(temp);
    // put 0 into pieceToMove
    array[pieceToMove] = array[blankLocation];

    array[blankLocation] = temp;
    //console.log(array); // print array after swap
    updateBoard(); // update board after move
    incrementMoves();

}

function moveLeft(pieceLocation) {
    //console.log("Moving piece left");
    var pieceToMove = pieceLocation;
    var blankLocation = blankSpot - 1;
    var temp;
    // console.log(array); // print array before swap

    // swap places in array
    temp = array[blankLocation];
    //console.log(temp);
    // put 0 into pieceToMove
    array[blankLocation] = array[pieceToMove];
    array[pieceToMove] = temp;
    //console.log(array); // print array after swap
    updateBoard(); // update board after move
    incrementMoves();

}

// Function to update board after moving piece
function updateBoard() {
    var gameTable = document.getElementById("gameTable"); // get table HTML id
    // delete previous game table
    while (gameTable.rows.length > 0)
        gameTable.deleteRow(0);

    var n = 0;
    for (var i = 0; i < rows; i++) {
        gameTable.insertRow(i); // insert row
        var tr = gameTable.rows[i]; // assign tr
        for (var j = 0; j < cols; j++) {
            tr.insertCell(j);
            ///var td = tr.cells[j];
            // tr.cells[j].id = array[n];

            // if array[n] is a number
            // array[n] = 0, then it's the blank spot
            if (array[n] == 0) {
                //tr.cells[j].innerHTML = "<div id='blankSpace' class='tile'>" + " " + " </div>";
                blankSpot = n + 1; // blank spot location in
                tr.cells[j].id = "blankSpace";
                tr.cells[j].className = "tiles"
                tr.cells[j].innerHTML = " ";
            } else if (!(isNaN(array[n]))) {
                //tr.cells[j].innerHTML = "<div id='" + array[n] + "' class='num tile' onclick='movePiece(this.id)'>" + array[n] + "</div>"; //this is how numbers are output to the screen
                tr.cells[j].id = array[n];
                tr.cells[j].className = "num tile";
                tr.cells[j].innerHTML = array[n];
                tr.cells[j].setAttribute('onclick', 'movePiece(this.id)');
            }
            n++;
        }
    }
    // update array2d
    oneToTwo(cols, rows);
}

// checks after each turn to see if puzzle is in correct order
function checkBoard() {
    var solved = true;
    for (var i = 0; i < array.length; i++) {
        if (array[i] != correctOrder[i]) {
            solved = false;
            break;
        }
    }
    if (solved) {
        alert("You solved the puzzle in " + moves + " moves!");
    }
    return solved;
}

// on New Game button click
function resetBoard() {
    // Reset all game variables
    array = [];
    array2d = [];
    correctOrder = [];
    correct2d = [];
    moves = 0;
    document.getElementById("moves").innerHTML = moves; // reset moves on html back to 0

    // Get rows and cols values for new board
    // checks if, negative or Not-a-Number
    //    then defaults to a 4-by-4 or 15 Puzzle
    rows = document.getElementById("rows").value;
    if (isNaN(rows) || rows < 0) {
        rows = 4;
    } else {
        rows = Math.round(document.getElementById("rows").value); //set height
    }

    cols = document.getElementById("cols").value;
    if (isNaN(cols) || cols < 0) {
        cols = 4;
    } else {
        cols = Math.round(document.getElementById("cols").value); //set width
    }

    // set total Squares
    totalSquares = rows * cols;

    // get table
    var gameTable = document.getElementById("gameTable");

    // delete previous game table
    while (gameTable.rows.length > 0) {
        gameTable.deleteRow(0);
    }

    var gamePieces = (rows * cols) - 1; // help to create game pieces

    // push tile numbers into the array
    for (var i = 0; i <= gamePieces; i++) {
        array.push(i);
    }
    // set correctOrder array
    for (var i = 1; i <= gamePieces; i++) {
        correctOrder.push(i);
    }
    correctOrder.push(0); // add 'blank space' to the end of the CORRECT/GOAL array
    GoalOneToTwo(cols, rows); //push correct array into 2d Goal array

    array = shuffle(array); // shuffle order of elements in array

    //Custom array input only for 15
    array = [6, 15, 2, 14, 10, 3, 7, 11, 4, 12, 13, 8, 9, 5, 0, 1];

    oneToTwo(cols, rows);

    var n = 0;
    for (var i = 0; i < rows; i++) {
        gameTable.insertRow(i); // insert row
        var tr = gameTable.rows[i]; // assign tr
        for (var j = 0; j < cols; j++) {
            tr.insertCell(j);
            ///var td = tr.cells[j];
            // tr.cells[j].id = array[n];

            // array[n] == 0, then it's the blank spot
            if (array[n] == 0) {
                //tr.cells[j].innerHTML = "<div id='blankSpace' class='tile'>" + " " + " </div>";
                blankSpot = n + 1; // blank spot location in
                tr.cells[j].id = "blankSpace";
                tr.cells[j].className = "tile"
                tr.cells[j].innerHTML = " ";
            } else if (!(isNaN(array[n]))) { // if array[n] is a number
                //tr.cells[j].innerHTML = "<div id='" + array[n] + "' class='num tile' onclick='movePiece(this.id)'>" + array[n] + "</div>"; //this is how numbers are output to the screen
                tr.cells[j].id = array[n];
                tr.cells[j].className = "num tile";
                tr.cells[j].innerHTML = array[n];
                tr.cells[j].setAttribute('onclick', 'movePiece(this.id)');
            }
            n++;
        }
    }
    checkBoard(); // may get the winning combination - but good luck getting this! ;)
}

// Check parity / solvability of board layout
function solvability() { //a function to test for the solvability of the puzzle

    var invers = 0; //variable to count the number of inversion in the puzzle
    var inverPolar, widthPolar, blankPolar;

    for (var i = 0; i < array.length; i++) {
        for (var j = i; j < array.length; j++) {
            if (isNaN(array[i]) || isNaN(array[j])) //you skip the blank spot when looking for inversions
            {} else
            if (array[i] > array[j]) {
                invers++;
            }
        }
    }
    //alert(blankSpot);
    widthPolar = (cols % 2); //find polarity of width
    inverPolar = (invers % 2); //find polarity of # of inversions.
    blankPolar = (blankSpot % 2);
    /**  will add other 2 test cases as we I figure out the blank situation    **/
    //find the polarity will never change in a state as long a legal move is made.
    //if (( (grid width odd) && (inversions even) )  ||  ( (grid width even) && ((blank on odd row from bottom) == (inversions even)) ))  //need to find correct variables
    if ((((widthPolar == 1) && (inverPolar == 0)) || ((widthPolar == 0) && ((blankPolar == 1)) && (inverPolar == 0)))) //added && double check later
    { //but this should be correct
        alert("Puzzle is solvable");
        return true;
    } else
        alert("Puzzle is not solvable in this state");
    return false;
}

// make game array into 2d array
function oneToTwo(cols, rows) {
    array2d = new Array(rows);
    var count = 0;
    for (var i = 0; i < rows; i++) {
        array2d[i] = new Array(cols); //create an array of arrays
    }
    for (var a = 0; a < rows; a++)
        for (var b = 0; b < cols; b++) {
            array2d[a][b] = array[count];
            count++;
        }
}

// make goal array (for heuristics) into 2d array
function GoalOneToTwo(cols, rows) {
    correct2d = new Array(rows);
    var count = 0;
    for (var i = 0; i < rows; i++) {
        correct2d[i] = new Array(cols); //create an array of arrays
    }
    for (var a = 0; a < rows; a++)
        for (var b = 0; b < cols; b++) {
            correct2d[a][b] = correctOrder[count];
            count++;
        }
}

// getRow where element's game array row
function getRow(expected) {
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++)
            if (array2d[i][j] == expected)
                return i;
}

// getColumn where element's game array column
function getColumn(expected) {
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++)
            if (array2d[i][j] == expected)
                return j;
}

// Heuristic function // h(n): manhattan distance heuristic
function manhattanPriority() {
    var expected = 1,
        distance = 0,
        manhattan = 0,
        currentRow, currentCol;
    for (var a = 0; a < rows; a++) {
        for (var b = 0; b < cols; b++) {
            // if element matches expected value then break out of loop
            if (expected == totalSquares) { // if space is 0 then, break out of loop
                break;
            } else if (array2d[a][b] != expected) {
                currentRow = getRow(expected);
                currentCol = getColumn(expected);
                //console.log("a: " + a + " b: " + b + " goalRow: " + goalRow + "Col: " + goalCol);
                manhattan = Math.abs(currentRow - a) + Math.abs(currentCol - b);
                distance += manhattan;
            }
            expected++;
        }
    }
    alert("The Manhattan Distance is " + distance);
    //console.log("MANHATTAN DISTANCE: " + distance);
    return distance; // total Manhattan distance
}

var solution;
var count = 0;

function Nsolver() {
    if (solvability()) {
        // adjust array to have "" instead of 0
        for (var a = 0; a < rows; a++) {
            for (var b = 0; b < cols; b++) {
                if (array2d[a][b] == 0) { // if space is 0 then, break out of loop
                    array2d[a][b] = ""; //replace with ""
                }
            }
        }
        var start = performance.now();
        var solver = new NPuzzleSolver(array2d);
        count = 0;
        solution = solver.solve();
        var end = performance.now();
        var time = end - start;
        alert("Execution time: " + time + " ms.");
        console.log(solution);
    } else {
        console.log("Can't solve this permutation.");
    }
}

function playSolution() {
    if (count < solution.length) {
        document.getElementById("solveMoves").innerHTML += "Moving tile: " + solution[count].number + "&#13;&#10;"; // next line for textarea html
        movePiece(solution[count].number);
        count++;
        document.getElementById("solveMoves").scrollTop = document.getElementById("solveMoves").scrollHeight;
    }
}