btns = document.querySelectorAll(".btns");

lblAIScore = document.getElementById('lblAIScore');
lblPLScore = document.getElementById('lblPLScore');

AI_Score = 0;
PL_Score = 0;

winRules = 
[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [3,6,9],
    [2,5,8],

];

btnNull = ["","","","","","","","","",""];
currentPlayer = "X";
Gamerunning = true;

btns.forEach(cell => cell.addEventListener("click",btnsClick));  


function btnReseet()
{
    //location.reload();
    btnNull = ["","","","","","","","","",""];
    currentPlayer = "X";
    Gamerunning = true;
    btns.forEach(btn=> btn.textContent = "");
    btns.forEach(btn=> btn.style.backgroundColor = "white");
}

function btnsClick()
{

    btnIndex = this.getAttribute("id");

    if(btnNull[btnIndex] != "" || !Gamerunning)
    {
        return;
    }

    checkBtns(this,btnIndex);
    checkWinner(this,btnIndex);

    currentPlayer = "O";

    AIcheckBtns(this,btnIndex);
    checkWinner(this,btnIndex);

    currentPlayer = "X";
}

function checkBtns(btns,index)
{ 
    btnNull[index] = currentPlayer;
    btns.textContent = currentPlayer;
}

function AIcheckBtns(btns,index)
{
    AI_Choose = Math.floor(Math.random() * 9) + 1;

    if(btnNull[AI_Choose] != "" || !Gamerunning)
    {
        AIcheckBtns(null,null);
        return;
    }

    btnNull[AI_Choose] = currentPlayer;
    document.getElementById(`${AI_Choose}`).textContent = currentPlayer;

}

function checkBtns(btns,index)
{ 
    btnNull[index] = currentPlayer;
    btns.textContent = currentPlayer;
}



function checkWinner(btns,index)
{    
    for(i = 0; i < winRules.length; i++)
    {

        rule = winRules[i];

        btnA = btnNull[rule[0]];
        btnB = btnNull[rule[1]];
        btnC = btnNull[rule[2]];


        if(btnA == "" || btnB == "" || btnC == "")
        {
            continue;
        }

   
        if(btnA == btnB && btnB == btnC)
        {
            alert(`بازیکن : ${currentPlayer} برنده شد !`);
			
            if(currentPlayer == "X")
            {
                PL_Score++;
                lblPLScore.innerText = `امتیاز کاربر : ${PL_Score}`;
            }
            else
            {
                AI_Score++;
                lblAIScore.innerText = `امتیاز سیستم : ${AI_Score}`;
            }
			
            Gamerunning = false;
            colored(rule[0],rule[1],rule[2]);
            break;
        }
        // else
        // {
        //   for(i = 1; i<= 10; i++)
        //   {
        //     if(btnNull[i] != "")
        //     {
        //         alert();
        //     }
        //   }
        // }
       


    }
}




function colored(i1,i2,i3)
{
    document.getElementById(`${i1}`).style.backgroundColor = "red";
    document.getElementById(`${i2}`).style.backgroundColor = "red";
    document.getElementById(`${i3}`).style.backgroundColor = "red";

}