var game = {
	player: "x",
	usedCells: [],
	usedCellsX: [],
	usedCellsO: [],
	openCells: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
	ongoing: true,
	winOptions: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]],
	level: [computersTurnImpossible, computersTurnHard ,computersTurnEasy],
	difficulty: "Hard"
}

$(document).on("click", ".playagain", function(){
	game.usedCells = [];
	game.usedCellsX = [];
	game.usedCellsO = [];
	game.openCells = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
	$(".ticTacToeCell img").removeAttr("style");
	game.ongoing = true;
	$(".container").css("opacity", "1");
	$("#messageWrapper").css("display", "none");
	$("#messageWrapper").css("opacity", "0");
});

$(document).on("click", ".ticTacToeCell", function(){
	//If the clicked cell is not used, add X to cell, put in used Cells array, remove from openCells.
	if(game.usedCellsX.length === game.usedCellsO.length){
		if(game.usedCells.indexOf($(this).attr('id')) == -1 && game.ongoing){
			if(game.player === "x"){
				$(this).find(".x").css("opacity","1");
			} else{
				$(this).find(".o").css("opacity","1");
			}
			game.usedCells.push($(this).attr('id'));
			game.usedCellsX.push($(this).attr('id'));
			game.openCells.splice(game.openCells.indexOf($(this).attr('id')), 1);
			if(game.usedCellsX.length >= 3){
				if(checkForWinX()){
					setTimeout(function(){
					$("h2").text("You Win!");
					$("#messageWrapper").css("display", "block");
					game.ongoing = false;
					setTimeout(function(){
						$(".container").css("opacity", "0.5");
						setTimeout(function(){
							$("#messageWrapper").css("opacity", "1");
						}, 500);
					}, 500);
				}, 100);
					return;
				}
			}
			if(game.difficulty === "Impossible"){
				game.level[0]();
			}
			if(game.difficulty === "Hard"){
				game.level[1]();
			}
			if(game.difficulty === "Easy"){
				game.level[2]();
			}		
		}
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

function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}

function makeComputerMove(cell){
	// game.openCells.splice(game.openCells.indexOf(pickedCell), 1);
	setTimeout(function(){
		if(game.player === "x"){
			$("#" + cell).find(".o").css("opacity","1");
		} else{
			$("#" + cell).find(".x").css("opacity","1");
		}
		game.usedCells.push(cell);
		game.usedCellsO.push(cell);
	
	
		// CHECK IF O WON
		if(game.usedCellsO.length >= 3){
			if(checkForWinO()){
				game.ongoing = false;
				setTimeout(function(){
					$("h2").text("You Lose!");
					$("#messageWrapper").css("display", "block");
					
					setTimeout(function(){
						$(".container").css("opacity", "0.5");
						setTimeout(function(){
							$("#messageWrapper").css("opacity", "1");
						}, 500);
					}, 500);
				}, 510);
			}
		}
	}, 500)
}

function checkForWinX(){
	for(var i = 0; i < 8; i++){
		if(game.winOptions[i].every(findNumberInArrayX)){
			return true;
		}
	}
}

function checkForWinO(){
	for(var i = 0; i < 8; i++){
		if(game.winOptions[i].every(findNumberInArrayO)){
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

function computersTurnImpossible(){
	var pickedCell;
	if(game.usedCells.length === 9){
		setTimeout(function(){
				$("h2").text("It's a tie!");
				$("#messageWrapper").css("display", "block");
				game.ongoing = false;
				setTimeout(function(){
					$(".container").css("opacity", "0.5");
					setTimeout(function(){
						$("#messageWrapper").css("opacity", "1");
					}, 500);
				}, 500);
			}, 100);
		return
	}
	//FIRST MOVE
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
				if(checkAvailability(game.winOptions[i], firstXmove)){
					for(var j=0; j < 3; j++){
						if(game.winOptions[i][j] !== firstXmove){
							options.push(game.winOptions[i][j]);
						}
					}
				}
			}
			pickedCell = options.splice(pickRandomNumber(options.length), 1)[0];
		}
	}
	//END FIRST MOVE
	if(game.usedCellsX.length >= 2){
		//CHECK IF X HAS 2 X'S IN THE SAME ROW
		var pairs = findPairs(game.usedCellsX);
		for(var j=0; j< pairs.length; j++){
			for (var i=0; i < 8; i++){
				if(checkAvailability(game.winOptions[i], pairs[j][0]) && checkAvailability(game.winOptions[i], pairs[j][1])){
					for(var k=0; k < 3; k++){
						if(game.winOptions[i][k] !== pairs[j][0] && game.winOptions[i][k] !== pairs[j][1]){
							if(checkAvailability(game.openCells, game.winOptions[i][k])){
								pickedCell = game.winOptions[i][k];
							}
						}
					}
				}
			}
		}
	}
	// IF X DOESN'T HAVE 2 XX IN SAME ROW
	// Find O spot on open winning Line
	if(!pickedCell){
		var options = [];
		var options2 = [];
		for(var p=0; p< game.usedCellsO.length; p++){
			var moveO = game.usedCellsO[p];
			for(var i=0; i< 6; i++){
				if(checkAvailability(game.winOptions[i], moveO)){
					options.push(game.winOptions[i]);		
				}
			}
		}
		for(var j=0; j< game.usedCellsX.length; j++){
			for(var i=0; i< options.length; i++){
				if(checkAvailability(options[i], game.usedCellsX[j])){
					options.splice(i,1);
				}
			}
		}
		for(var i=0; i<options.length; i++){
			for(var j=0; j<options[i].length; j++){
				if(checkAvailability(game.openCells, options[i][j])){
					options2.push(options[i][j])
				}
			}
		}
		if(options2.length >= 1){
			pickedCell = options2[pickRandomNumber(options2.length)];
		} else{
			pickedCell = game.openCells[pickRandomNumber(game.openCells.length)];
		}
	}
	//CHECK IF O CAN WIN
	if(game.usedCellsO.length >= 2){
		var pairs = findPairs(game.usedCellsO);
		for(var j=0; j< pairs.length; j++){
			for (var i=0; i < 8; i++){
				if(checkAvailability(game.winOptions[i], pairs[j][0]) && checkAvailability(game.winOptions[i], pairs[j][1])){
					for(var k=0; k < 3; k++){
						if(game.winOptions[i][k] !== pairs[j][0] && game.winOptions[i][k] !== pairs[j][1]){
							if(checkAvailability(game.openCells, game.winOptions[i][k])){
								pickedCell = game.winOptions[i][k];
							}
						}
					}
				}
			}
		}
	}
	//MAKE MOVE
	game.openCells.splice(game.openCells.indexOf(pickedCell), 1);
	makeComputerMove(pickedCell);
}

// COMPUTERS TURN HARD
function computersTurnHard(){
	var pickedCell;
	if(game.usedCells.length === 9){
		setTimeout(function(){
				$("h2").text("It's a tie!");
				$("#messageWrapper").css("display", "block");
				game.ongoing = false;
				setTimeout(function(){
					$(".container").css("opacity", "0.5");
					setTimeout(function(){
						$("#messageWrapper").css("opacity", "1");
					}, 500);
				}, 500);
			}, 100);
		return
	}
	//FIRST MOVE
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
				if(checkAvailability(game.winOptions[i], firstXmove)){
					for(var j=0; j < 3; j++){
						if(game.winOptions[i][j] !== firstXmove){
							options.push(game.winOptions[i][j]);
						}
					}
				}
			}
			pickedCell = options.splice(pickRandomNumber(options.length), 1)[0];
		}
	}
	//END FIRST MOVE
	if(game.usedCellsX.length >= 2){
		//CHECK IF X HAS 2 X'S IN THE SAME ROW
		var pairs = findPairs(game.usedCellsX);
		for(var j=0; j< pairs.length; j++){
			for (var i=0; i < 8; i++){
				if(checkAvailability(game.winOptions[i], pairs[j][0]) && checkAvailability(game.winOptions[i], pairs[j][1])){
					for(var k=0; k < 3; k++){
						if(game.winOptions[i][k] !== pairs[j][0] && game.winOptions[i][k] !== pairs[j][1]){
							if(checkAvailability(game.openCells, game.winOptions[i][k])){
								pickedCell = game.winOptions[i][k];
							}
						}
					}
				}
			}
		}
	}
	if(!pickedCell){
		pickedCell = game.openCells[pickRandomNumber(game.openCells.length)];
	}
	//CHECK IF O CAN WIN
	if(game.usedCellsO.length >= 2){
		var pairs = findPairs(game.usedCellsO);
		for(var j=0; j< pairs.length; j++){
			for (var i=0; i < 8; i++){
				if(checkAvailability(game.winOptions[i], pairs[j][0]) && checkAvailability(game.winOptions[i], pairs[j][1])){
					for(var k=0; k < 3; k++){
						if(game.winOptions[i][k] !== pairs[j][0] && game.winOptions[i][k] !== pairs[j][1]){
							if(checkAvailability(game.openCells, game.winOptions[i][k])){
								pickedCell = game.winOptions[i][k];
							}
						}
					}
				}
			}
		}
	}
	//MAKE MOVE
	game.openCells.splice(game.openCells.indexOf(pickedCell), 1);
	makeComputerMove(pickedCell);
}

// ******* RANDOM COMPUTER EASY *************
function computersTurnEasy(){
	if(game.usedCells.length === 9){
		setTimeout(function(){
				$("h2").text("It's a tie!");
				$("#messageWrapper").css("display", "block");
				game.ongoing = false;
				setTimeout(function(){
					$(".container").css("opacity", "0.5");
					setTimeout(function(){
						$("#messageWrapper").css("opacity", "1");
					}, 500);
				}, 500);
			}, 100);
		return;
	}
	randomCell = game.openCells.splice(pickRandomNumber(game.openCells.length), 1)[0];
	makeComputerMove(randomCell)
}
// TOGGLE PLAYER
$('.toggle').click(function(e) {
  var toggle = this;
  e.preventDefault();
  if(game.player === "x"){
  	game.player = "o"
  } else{
  	game.player = "x"
  }
  
  $( ".playagain" ).trigger( "click" );

  $(toggle).toggleClass('toggle--on')
         .toggleClass('toggle--off')
         .addClass('toggle--moving');
  
  setTimeout(function() {
    $(toggle).removeClass('toggle--moving');
  }, 200)
});

// DIFFICULTY GAME


$('.placeholder').on('click', function (ev) {
  // $('.placeholder').css('opacity', '0');
  $('.list__ul').toggle();
  $(".controls").css("border-radius", "10px 10px 0 10px");
});

$('.list__ul a').on('click', function (ev) {
   ev.preventDefault();
   var index = $(this).parent().index();
   $('.placeholder').text( $(this).text() ).css('opacity', '1');
   game.difficulty = $(this).text()
   $('.list__ul').toggle();   
   $( ".playagain" ).trigger( "click" );
   $(".controls").css("border-radius", "10px");
});

