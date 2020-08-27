let turn=1;
let name1="",name2="";
let gameover=false;
let grid=0;
let board=[];
const calcWinner=()=>
{
  if (turn < grid) {
    return false;
  }
  for (let i = 0; i < board.length; i++) {
    let val=board[i][0];
    if(val==="")continue;
    let flag=0;
    for(let j=1;j<board.length;j++)
    {
      if (board[i][j]===""||board[i][j]!==val) 
      {
        flag=1;
      }
    }
    if(flag===0)
    {
      for(let j=0;j<grid;j++)
      {document.getElementById(`${i}${j}`).classList.add("gren");}
      return true;
    }
  }
  for (let i = 0; i < board.length; i++) {
    let val=board[0][i];
    if(val==="")continue;
    let flag=0;
    for(let j=1;j<board.length;j++)
    {
      if (board[j][i]===""||board[j][i]!==val) 
      {
        flag=1;
      }
    }
    if(flag===0)
    {
      for(let j=0;j<board.length;j++)
      {document.getElementById(`${j}${i}`).classList.add("gren");}
      return true;
    }
  }
  let flag=0;
    let i=1;
    let val=board[0][0];
    if(val!=="")
    {
    for(let j=1;j<board.length;j++)
    {
      if (board[i][j]===""||board[i][j]!==val) 
      {
        flag=1;
      }
      i++;
    }
    if(flag===0)
    {
      i=0;
      for(let j=0;j<board.length;j++)
      {document.getElementById(`${i}${j}`).classList.add("gren");i++;}
      return true;
    }
    }
    i=board.length-1;
    val=board[board.length-1][0];
    if(val!=="")
    {
      flag=0;
    i--;
    for(let j=1;j<board.length;j++)
    {
      if (board[i][j]===""||board[i][j]!==val) 
      {
         flag=1;
      }
      i--;
    }
    if(flag===0)
    {
      i=board.length-1;
      for(let j=0;j<board.length;j++)
      {document.getElementById(`${i}${j}`).classList.add("gren");i--;}
      return true;
    }
  }
  return false;
}
const rem=()=>
{
  if(gameover===true)
  return;
  name1=document.getElementById("player1").value;
  name2=document.getElementById("player2").value;
  grid=document.getElementById("grid").value;
  if(name1===""||name2==="")
  {
    alert("Type Name of Both Players");
    return ;
  }
  else if(name1===name2)
  {
    alert("Players name cannot be same");
    return;
  }
  else if(grid==="")
  {
    alert("Enter the dimensions");
    return ;
  }
  else if(grid>10)
  {
    alert("Enter dimension less than equal to 8");
    return;
  }
  else if(grid<0)
  {
    alert("Dimension cannot be nefative");
    return;
  }
  else
  {
    if(grid<5)
    {
      document.getElementById("game-container").className="game-container";
    }
    else if(grid<=6)
    {
      document.getElementById("game-container").className="game-container1";
    }
    else
    {
      document.getElementById("game-container").className="game-container2";
    }
    document.getElementById("pl1").innerHTML=`Player 1:${name1}`;
    document.getElementById("pl2").innerHTML=`Player 2:${name2}`;
    document.getElementById("turn").innerHTML=`${name1}'s turn`;
  }
  let ele=document.getElementById("game-container");
  ele.classList.remove("hide");
  for(let i=0;i<grid;i++)
  {
    let arr=[];
    let r=document.createElement("div");
    r.className="row";
    for(let j=0;j<grid;j++)
    {
      arr.push("");
      let c=document.createElement("div");
      c.className="cell";
      c.id=`${i}${j}`;
      c.setAttribute("onclick","clicked(this)");
      r.appendChild(c);
    }
    ele.appendChild(r);
    board.push(arr);
  }
};
const clicked=(el)=>
{
  if(el.innerHTML!==""||gameover)
  return;
  let id=el.id;
  let a=parseInt(id[0]);
  let b=parseInt(id[1]);
  board[a][b]=turn%2===0?"X":"0";
  el.innerHTML=board[a][b];
  turn++;
  gameover=calcWinner();
  if(gameover===true)
  {
    let nam=turn%2===0?name1:name2;
    nam=nam.toUpperCase();
    setTimeout(function(){alert(`${nam} WIN!!!!!`)},60);
    return;
  }
  if(turn===grid*grid+1)
  {
    for(let i=0;i<grid;i++)
    {
      for(let j=0;j<grid;j++)
      {
        document.getElementById(i.toString()+j).classList.add("yell");
      }
    }
     setTimeout(function(){alert(`IT'S A DRAW!!!!!`);},60);
     gameover=true;
  }
  if(turn%2===0)
  document.getElementById("turn").innerHTML=`${name2}'s turn`;
  else 
  document.getElementById("turn").innerHTML=`${name1}'s turn`;
};