var game = {
	player: "x",
	Xturn: true,
	Oturn: false,
	usedCells: [],
	usedCellsX: [],
	usedCellsO: [],
	openCells: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
}
var winOptions = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]];


$(document).on("click", ".ticTacToeCell", function(){
	//If the clicked cell is not used, add X to cell, put in used Cells array, remove from openCells.
	if(game.usedCells.indexOf($(this).attr('id')) == -1){
		$(this).html('<img src="x.svg" alt="x"></div>');
		game.usedCells.push($(this).attr('id'));
		game.usedCellsX.push($(this).attr('id'));
		game.openCells.splice(game.openCells.indexOf($(this).attr('id')), 1);
		if(game.usedCellsX.length >= 3){
			if(checkForWinX()){
				setTimeout(function(){alert("You Win!");}, 10)
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
// ******* RANDOM COMPUTER EASY *************
// function computersTurn(){
// 	randomCell = game.openCells.splice(pickRandomNumber(game.openCells.length), 1)[0];
// 	$("#" + randomCell).html('<img src="o.svg" alt="o"></div>');
// 	game.usedCells.push(randomCell);
// 	game.usedCellsO.push(randomCell);
// 	if(game.usedCellsO.length >= 3){
// 		if(checkForWinO()){
// 			setTimeout(function(){alert("You Lose!");}, 10)
// 			return;
// 		}
// 	}
// }
function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}

function computersTurn(){
	var pickedCell;
	if(game.usedCells.length === 9){
		setTimeout(function(){alert("It's a tie!");}, 10);
		return
	}
	if(game.usedCellsX.length === 1){
		var firstXmove = game.usedCellsX[0];
		if( firstXmove === "5"){
			var options = ["1", "3", "7", "9"];
			pickedCell = options.splice(pickRandomNumber(options.length), 1)[0];
		}
		if(firstXmove === "1" || firstXmove === "3" || firstXmove === "7" || firstXmove === "9"){
			pickedCell = "5";
		}
		if(firstXmove === "2" || firstXmove === "4" || firstXmove === "6" || firstXmove === "8"){
			var options = [];
			for (var i=0; i < 8; i++){
				if(checkAvailability(winOptions[i], firstXmove)){
					for(var j=0; j < 3; j++){
						if(winOptions[i][j] !== firstXmove){
							options.push(winOptions[i][j]);
						}
					}
				}
			}
			pickedCell = options.splice(pickRandomNumber(options.length), 1)[0];
		}
	}
	if(game.usedCellsX.length >= 2){
		var pairs = findPairs(game.usedCellsX);
		for(var j=0; j< pairs.length; j++){
			for (var i=0; i < 8; i++){
				if(checkAvailability(winOptions[i], pairs[j][0]) && checkAvailability(winOptions[i], pairs[j][1])){
					for(var k=0; k < 3; k++){
						if(winOptions[i][k] !== pairs[j][0] && winOptions[i][k] !== pairs[j][1]){
							if(checkAvailability(game.openCells, winOptions[i][k])){
								pickedCell = winOptions[i][k];
							}
						}
					}
				}
			}
		}
		if(!pickedCell){
			var options = [];
			var options2 = [];
			if(game.usedCellsO.length === 1){
				var moveO = game.usedCellsO[0];
					for(var i=0; i< 6; i++){
						if(checkAvailability(winOptions[i], moveO)){
							options.push(winOptions[i]);		
						}
					}
				for(var i=0; i< options.length; i++){
					for(var j=0; j< game.usedCellsX.length; j++){
						if(checkAvailability(options[i], game.usedCellsX[j])){
							options.splice(i,1);
						}
					}
				}
				for(var i=0; i<options.length; i++){
					for(var j=0; j<options[i].length; j++){
						if(options[i][j] !== moveO){
							options2.push(options[i][j])
						}
					}
				}
				pickedCell = options2[pickRandomNumber(options2.length)];
			}
			if(!pickedCell){
			var options = [];
			for (var k = 0; k < game.usedCellsX.length; k++){
				for (var h = 0; h < game.usedCellsO.length ; h++){
					for (var i=0; i < 8; i++){
						if(checkAvailability(winOptions[i], game.usedCellsX[k]) && !checkAvailability(winOptions[i], game.usedCellsO[h])){
							for(var j=0; j < 3; j++){
								if(winOptions[i][j] !== game.usedCellsX[k]){
									if(checkAvailability(game.openCells , winOptions[i][j])){
										options.push(winOptions[i][j]);
									}
								}
							}
						}
					}
				}
			}
			options.sort()
			for(var l = 0; l< options.length; l++){
				if (options[l] === options[l + 1]){
					pickedCell = options[l];
				}
			}
		}


		}

		// if(!pickedCell){
		// 	pickedCell = game.openCells[pickRandomNumber(game.openCells.length)];
		// 	console.log("picked random cell = " + pickedCell);
		// }
	}
	if(game.usedCellsO.length >= 2){
		var pairs = findPairs(game.usedCellsO);
		for(var j=0; j< pairs.length; j++){
			for (var i=0; i < 8; i++){
				if(checkAvailability(winOptions[i], pairs[j][0]) && checkAvailability(winOptions[i], pairs[j][1])){
					for(var k=0; k < 3; k++){
						if(winOptions[i][k] !== pairs[j][0] && winOptions[i][k] !== pairs[j][1]){
							if(checkAvailability(game.openCells, winOptions[i][k])){
								pickedCell = winOptions[i][k];
							}
						}
					}
				}
			}
		}
	}
	game.openCells.splice(game.openCells.indexOf(pickedCell), 1);
	setTimeout(function(){
		$("#" + pickedCell).html('<img src="o.svg" alt="o"></div>');
	}, 500)
	game.usedCells.push(pickedCell);
	game.usedCellsO.push(pickedCell);
	if(game.usedCellsO.length >= 3){
		if(checkForWinO()){
			setTimeout(function(){alert("You Lose!");}, 10)
			return;
		}
	}
}


function checkForWinX(){
	for(var i = 0; i < 8; i++){
		if(winOptions[i].every(findNumberInArrayX)){
			return true;
		}
	}
}

function checkForWinO(){
	for(var i = 0; i < 8; i++){
		if(winOptions[i].every(findNumberInArrayO)){
			return true;
		}
	}
}


function findPairs(arr){
	var options = []
	for(var i=0; i<arr.length; i++){
		var newArr = arr.slice();
		var firstChar = newArr.splice(i, 1);
		for(var j=0; j < newArr.length; j++){
			options.push([firstChar[0], newArr[j]]);
		}
	}
	return options;
}
