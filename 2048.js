
var grid;
var score = 0;
var row = 4;
var col = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    grid = [ [0,0,0,0],
             [0,0,0,0],
             [0,0,0,0],
             [0,0,0,0] ]

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = grid[r][c];
            updateTile(tile, num);
            document.getElementById("grid").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function gameOver() {
    let game = document.createElement("div");
    game.classList.add("gameOver");
    game.innerText = "GAME OVER";
    document.getElementById("grid").append(game);
}

function change() {

}

function hasEmptyTile() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            if (grid[r][c] == 0) {
                return true;
            }
        } 
    }
    return false;  
}

function setTwo() {
    if (!hasEmptyTile()) {
        gameOver();
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * row);
        let c = Math.floor(Math.random() * col);
    
        if (grid[r][c] == 0) {
            grid[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("t2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
	tile.innerText = "";
	tile.classList.value = ""; //clears the tile
	tile.classList.add("tile");
	if (num > 0) {
	    tile.innerText = num;
	    if (num <= 4096) {
	        tile.classList.add("t" + num.toString());
	    }
	    else {
	        tile.classList.add("t8192");
	    }
	}
}

document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowLeft") {
        slideLeft();
    }
    else if (event.code == "ArrowRight") {
        slideRight();
    }
    else if (event.code == "ArrowDown") {
        slideDown();
    }
    else if (event.code == "ArrowUp") {
        slideUp();
    }
    document.getElementById("score").innerText = score;
})

function slide(row) {
    //filter out zeros
    row = row.filter(num => num != 0);
    //slide
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    //filter out zeros again
    row = row.filter(num => num != 0);
    //add zeros back to the end
    while (row.length < col) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    
    for (let r = 0; r < row; r++) {
        let row = grid[r];
        row = slide(row);
        grid[r] = row;
        

        for (let c = 0; c < col; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = grid[r][c];
            updateTile(tile, num);
        }
    }
    if (change) setTwo();
    
}

function slideRight() {
    for (let r = 0; r < row; r++) {
        let row = grid[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        if (row != grid[r]) {
            change = true;
        }
        grid[r] = row;

        for (let c = 0; c < col; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = grid[r][c];
            updateTile(tile, num);
        }
    }
    if (change) setTwo();
}

function slideUp() {
    for (let c = 0; c < col; c++) {
        let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
        row = slide(row);

        for (let r = 0; r < col; r++) {
            grid[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = grid[r][c];
            updateTile(tile, num);
        }
    }
    if (change) setTwo();
}

function slideDown() {
    for (let c = 0; c < col; c++) {
        let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < col; r++) {
            grid[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = grid[r][c];
            updateTile(tile, num);
        }
    }
    if (change) setTwo();
}

