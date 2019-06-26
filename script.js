function startGame()
{
  var color_code = ['#FA8072','#FFD700','#7FFF00','#00FFFF','#00BFFF','#FF00FF','#FF1493'];
  var color = color_code[Math.floor(Math.random() * color_code.length)];
  document.body.style.background = color;
  var move=0;
  var count=0,c_id=1;
  var size=Math.floor(Math.random() * 10)+6;
  var table_size=(size)*30+10;
  document.getElementById('board').style.width=table_size+'px';
  document.getElementById('board').style.heigth=table_size+'px';
  document.getElementById("board").style.align = "center";

  for(var i=0;i<size;i++)
  {
    for(var j=0;j<size;j++)
    {
    var btn=document.createElement("button");
    count++;
    btn.id="btnid"+count;
    btn.setAttribute("value",count);
    c_id=(c_id+1)%2;
    btn.style.width = '30px';
    btn.style.height = '30px';
    if(c_id)
    btn.style.background ='red';
    else
    btn.style.background ='green';
    document.getElementById('board').appendChild(btn);
    }
    if((size)%2==0){
    c_id=(c_id+1)%2;}
  }

  var buttons = document.getElementsByTagName("button");
  var buttonsCount = buttons.length;

  for (var i = 0; i <= buttonsCount; i += 1) {
      buttons[i].onclick = function(e) {
      var radios = document.querySelectorAll('input[type="radio"]:checked');
      var radiovalue = radios.length>0? radios[0].value: null;
      var boxNo=parseInt(this.value);
      var row=Math.floor(boxNo/size);
      var col=boxNo%size;
      if(radiovalue=='1')
      {
        if(check(1,0,1,0,1,row,col,size,buttons))
        {
          move++;
          Nice();
          buttons[boxNo-1].style.background='blue';
          boxNo=(row-1)*size+col;
          buttons[boxNo-1].style.background='blue';
          boxNo=row*size+col-1;
          buttons[boxNo-1].style.background='blue';
            checkwin(buttons,size,move);
        }
        else {
          Illegal();
        }
      }
      else if(radiovalue=='2')
      {
        if(check(0,1,0,1,1,row,col,size,buttons))
        {
          move++;
          Nice();
          buttons[boxNo-1].style.background='blue';
          boxNo=(row+1)*size+col;
          buttons[boxNo-1].style.background='blue';
          boxNo=row*size+col+1;
          buttons[boxNo-1].style.background='blue';
            checkwin(buttons,size,move);
        }
        else {
          Illegal();
        }
      }
      else if(radiovalue=='3')
      {
        if(check(0,1,1,0,1,row,col,size,buttons))
        {
          move++;
          Nice();
          buttons[boxNo-1].style.background='blue';
          boxNo=(row+1)*size+col;
          buttons[boxNo-1].style.background='blue';
          boxNo=row*size+col-1;
          buttons[boxNo-1].style.background='blue';
            checkwin(buttons,size,move);
        }
        else {
          Illegal();
        }
      }
      else {
        if(check(1,0,0,1,1,row,col,size,buttons))
        {
          move++;
          Nice();
          buttons[boxNo-1].style.background='blue';
          boxNo=(row-1)*size+col;
          buttons[boxNo-1].style.background='blue';
          boxNo=row*size+col+1;
          buttons[boxNo-1].style.background='blue';
      checkwin(buttons,size,move);
        }
        else {
          Illegal();
        }
      }
      };
  }
}

function checkwin(buttons,size,move)
{
  var buttonsCount=buttons.length;
  var flag=true;
  for(var bt=0;bt<buttonsCount;bt++)
  {
    if(buttons[bt].style.background=='green')
    {
      flag=false;
      break;
    }
  }
  if(flag)
  {
    if((size%2==1 && move==((size+1)*(size+1)/4))||(size%2==0 && move==((size*size)/4)))
    {
      won();
      block();

    }
    else if((size%2==1 && move>((size+1)*(size+1)/4))||(size%2==0 && move>((size*size)/4)))
    {
      high();
      block();
    }
    else {
      lose();
      block();
    }
  }
  else {
    var box,count=0;
    var flag1=true,tp=true,bt=true,lt=true,rt=true;
    for(var row=0;row<size;row++)
    {
      for(var col=0;col<size;col++)
      {
        tp=false;bt=false;lt=false;rt=false;
        box=row*size+col;
        count=0;
        if(buttons[box].style.background=='blue')
        continue;

        if(row!=0)
        {
          box=(row-1)*size+col;
          if(buttons[box].style.background!='blue')
          {
          count++;
          tp=true;
         }
        }
        if(row!=(size-1))
        {
          box=(row+1)*size+col;
          if(buttons[box].style.background!='blue')
          {
          count++;
          bt=true;
          }
        }
        if(col!=0)
        {
          box=(row*size)+col-1;
          if(buttons[box].style.background!='blue')
          {
          count++;lt=true;
        }
        }
        if(col!=(size-1))
        {
          box=(row*size)+col+1;
          if(buttons[box].style.background!='blue')
          {
          count++;rt=true;
         }
        }
             //document.getElementById('write').innerHTML='ILLEGAL MOVE'+count+" "+row+" "+col;
        if(count>=2)
        {
          if((tp && lt)||(tp && rt)||(bt && lt)||(bt && rt))
          {
          flag1=false;
          break;
          }
        }
      }
      if(!flag1)
      break;
    }
    if(flag1)
    {
      lose();
      block();
    }
  }
}

function newGame()
{
  location.reload();
}

function check(top,bottom,left,right,center,row,col,size,buttons)
{
   if(center==1)
   {
     var boxNo=row*size+col;
     if(buttons[boxNo-1].style.background=='blue')
     return false;
   }
   if(top==1)
   {
      var boxNo=(row-1)*size+col;
      if(boxNo < 1)
      return false;

      if(buttons[boxNo-1].style.background=='blue')
      return false;
   }
   if(bottom==1)
   {
     var boxNo=(row+1)*size+col;
     if(boxNo > size*size)
     return false;

     if(buttons[boxNo-1].style.background=='blue')
     return false;
   }
   if(left==1)
   {
     var boxNo=(row)*size+col-1;
     if(col==1)
     return false;

     if(buttons[boxNo-1].style.background=='blue')
     return false;
   }
   if(right==1)
   {
     var boxNo=(row)*size+col+1;
     if(col==0)
     return false;

     if(buttons[boxNo-1].style.background=='blue')
     return false;
   }
   return true;
}

function Nice() {
  var x = document.getElementById("nice");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

function Illegal() {
  var x = document.getElementById("illegal");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

function won() {
  var x = document.getElementById("won");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 20000);
}

function lose() {
  var x = document.getElementById("lose");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 20000);
}

function high() {
  var x = document.getElementById("high");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 20000);
}

function block()
{
  var radios = document.getElementsByName('pattern');
  for (var n = 0; n< radios.length;  n++){
       radios[n].disabled = true;
     }
  var buttons = document.getElementsByTagName("button");
  for (var n = 0; n< buttons.length;  n++){
       buttons[n].disabled = true;
     }
}
