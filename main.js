var game = {
	player: "x",
	Xturn: true,
	Oturn: false,
	usedCells: [],
	usedCellsX: [],
	usedCellsO: [],
	openCells: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
}


$(document).on("click", ".ticTacToeCell", function(){
	//If the clicked cell is not used, add X to cell, put in used Cells array, remove from openCells.
	if(game.usedCells.indexOf($(this).attr('id')) == -1){
		$(this).html('<img src="x.svg" alt="x"></div>');
		game.usedCells.push($(this).attr('id'));
		game.usedCellsX.push($(this).attr('id'));
		game.openCells.splice(game.openCells.indexOf($(this).attr('id')), 1);
		if(game.usedCellsX.length >= 3){
			if(checkForWinX()){
				alert("You Win!");
				return;
			}
			
		}
		computersTurn();
	}

})

function findNumberInArrayX(currentValue) {
  return game.usedCellsX.includes(currentValue)
}
function findNumberInArrayO(currentValue) {
  return game.usedCellsO.includes(currentValue)
}

function pickRandomNumber(num){
	return Math.floor((Math.random() * num));
}

function computersTurn(){
	randomCell = game.openCells.splice(pickRandomNumber(game.openCells.length), 1)[0];
	$("#" + randomCell).html('<img src="o.svg" alt="o"></div>');
	game.usedCells.push(randomCell);
	game.usedCellsO.push(randomCell);
	if(game.usedCellsO.length >= 3){
		if(checkForWinO()){
				alert("You Lose!");
				return;
			}
	}
}

function checkForWinX(){
	var winOptions = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]];
	for(var i = 0; i < 8; i++){
		if(winOptions[i].every(findNumberInArrayX)){
			return true;
		}
	}

}
function checkForWinO(){
	var winOptions = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]];
	for(var i = 0; i < 8; i++){
		if(winOptions[i].every(findNumberInArrayO)){
			return true;
		}
	}
}
