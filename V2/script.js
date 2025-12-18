var tablle;
isWin = false;

lblPlayer = "X";
lblAI = "O";

AI_Score = 0;
PL_Score = 0;

WinRule = [   
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],]

homes = document.querySelectorAll(".btn");

Main();

function Main()
{

    document.getElementById("endGame").style.display = "none";
    tablle = Array.from(Array(10).keys());
    // console.log(tablle);

    //Reset
    lh = homes.length;
    console.log(lh);
    for(var i = 0; i <= lh - 1; i++)
    {

        homes[i].innerText = "";
        homes[i].style.backgroundColor = "transparent";
        // homes[i].onclick = btns_Click();
        homes[i].addEventListener('click',btns_Click,false);
    }
}

function btn_Reset()
{
    location.reload();
}

function btns_Click(ids)
{
   // alert();
    // homes[ids.target.id].innerText = "X";

    if(typeof tablle[ids.target.id] == 'number')
    {
        clicked(ids.target.id,lblPlayer);

        if(!checkAI())
        {           
            if(isWin != true)
            {
             clicked(moveAI(),lblAI);
            }
        }
    }

}

function clicked(ids,lblpl)
{

    //Add to array
    tablle[ids] = lblpl;
    //Add to text
    document.getElementById(ids).innerText = lblpl;

    if(isWin != true)
    {
        if(checkWinner(tablle,lblpl))
        {
             GameOver(gameWon);   
        }
    }


}


function checkWinner(board, player) {
	 plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	 gameWon = null;
	for ( [index, win] of WinRule.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function GameOver(gameWon) {
	for ( index of WinRule[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == lblPlayer ? "rgba(4, 167, 255, 0.8" : "red";
	}
	for (i = 0; i < homes.length; i++) {
		homes[i].removeEventListener('click', btns_Click, false);
	}
    isWin = true;
    message(gameWon.player == lblPlayer ? "شما برنده شدید !" : "شما باختیدید !");

}



function emptyHome()
{
    
	 //return minimax(table, lblAI).index;
    return tablle.filter( s => typeof s == 'number');
}

function minimax(newBoard, player) 
{
    availSpots = emptyCells();

    if (checkWinner(newBoard, lblPlayer)) 
    {
        return {score: -10};
    } 
    else if (checkWinner(newBoard, lblAI)) 
    {
        return {score: 10};
    } 
    else if (availSpots.length === 0) 
    {
        return {score: 0};
    }

     moves = [];

    for (i = 0; i < availSpots.length; i++) 
    {
         move = {};
        
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

         result = null;

        if (player === lblAI)
         {
            result = minimax(newBoard, lblPlayer);
            move.score = result.score;
        } 
        else 
        {
            result = minimax(newBoard, lblAI);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

     bestMove;

    if(player === lblAI) 
    {
         bestScore = -10000;

        for( i = 0; i < moves.length; i++)
         {
            if (moves[i].score > bestScore) 
            {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }

    } 
    else 
    {
         bestScore = 10000;

        for( j = 0; j < moves.length; j++) 
        {
            if (moves[j].score < bestScore) 
            {
                bestScore = moves[j].score;
                bestMove = j;
            }
        }
    }

    return moves[bestMove];
}

function message(lblText)
{
    alert(lblText);
}

function moveAI()
{
    return emptyHome()[1];
}

function checkAI()
{
    if(emptyHome().length == 0)
    {
        for(i = 0; i < homes.length; i++)
        {
            homes[i].style.backgroundColor = "red";
            homes[i].removeEventListener('click', btns_Click, false);
        }

        message("بازی مساوی شد !");
       return true;
    }

    return false;
}
