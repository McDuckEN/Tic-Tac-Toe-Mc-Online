var table;
 isWin = false;

 lblPlayer = "X";
 lblAI = "O";

 AI_Score = 0;
 PL_Score = 0;

 WinRule = 
[   
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

 homes = document.querySelectorAll(".btn");

Main();

function Main() 
{
    document.getElementById("endGame").style.display = "none";
    table = Array.from(Array(10).keys());

    for(var i = 0; i < homes.length; i++) 
    {
        homes[i].innerText = "";
        homes[i].style.backgroundColor = "transparent";
        homes[i].addEventListener('click',btns_Click, false);
    }
}

function btn_Reset() 
{
    location.reload();
}

function btns_Click(ids) 
{
    var id = parseInt(ids.target.id);

    if(typeof table[id] === 'number')
     {
        clicked(id, lblPlayer);
        if(!checkAI() && !isWin) {
            clicked(moveAI(), lblAI);
        }
    }
}

function clicked(ids, lblpl) 
{
    table[ids] = lblpl;
    document.getElementById(ids).innerText = lblpl;

    if(!isWin && checkWinner(table, lblpl)) 
    {
        GameOver(gameWon);   
    }
}

function checkWinner(board, player) 
{
    plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);

    gameWon = null;

    for ([index, win] of WinRule.entries()) 
    {
        if (win.every(elem => plays.indexOf(elem) > -1)) 
        {
            gameWon = {index: index, player: player};
            break;
        }
    }

    return gameWon;
}

function GameOver(gameWon) 
{
    for (var index of WinRule[gameWon.index]) 
    {
        document.getElementById(index).style.backgroundColor = 
            (gameWon.player === lblPlayer) ? "rgba(4, 167, 255, 0.8" : "red";
    }
    for (var i = 0; i < homes.length; i++) 
    {
        homes[i].removeEventListener('click', btns_Click, false);
    }

    isWin = true;

	//ternary
    //کوتاه سازی شرط
    message((gameWon.player === lblPlayer) ? "شما برنده شدید !" : "شما باختیدید !");
}

function emptyCells() 
{   
    return table.filter(s => typeof s == 'number');
}

function minimax(newBoard, player) 
{
    var availSpots = emptyCells();

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

    var moves = [];

    for (var i = 0; i < availSpots.length; i++) 
    {
        var move = {};
        
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

    var bestMove;

    if(player === lblAI) 
    {
        var bestScore = -10000;

        for(var i = 0; i < moves.length; i++)
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
        var bestScore = 10000;

        for(var j = 0; j < moves.length; j++) 
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

function moveAI() 
{
    return minimax(table, lblAI).index;
}

function message(lblText) 
{
    alert(lblText);
}

function checkAI() 
{
    if(emptyCells().length === 0)
     {
        for(var i = 0; i < homes.length; i++) 
        {
            homes[i].style.backgroundColor = "red";
            homes[i].removeEventListener('click', btns_Click, false);
        }

        message("بازی مساوی شد !");
       return true;
    }
    
    return false;
}
