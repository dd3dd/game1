//const myarr = [];
for(i=1;i<=42;i++)
{
  //myarr[i] = 0;
  document.getElementById("mygrid").innerHTML +=`<div id="grid`+i+`"class=""></div>`;
}

document.getElementById("grid39").className = "role";
var rolepos =39;
var score = 0;
//console.log(myarr);
newrow();
keeprolecolor ="role";

var totalSeconds = 30;

function generateNewrow() {
  for(i=42;i>=8;i--)
  {
    if(i>=36)
    {
      temp = i-7;
      temp = "grid"+temp;
      if(document.getElementById(temp).className !="")
      {
        childgrid = "grid"+i;
        document.getElementById(childgrid).className = document.getElementById(temp).className;
      }
    }
    else
    {
      temp = i-7;
      temp = "grid"+temp;
      childgrid = "grid"+i;
      document.getElementById(childgrid).className = document.getElementById(temp).className;
    }
  }     
 
    newrow();  
    for(i=36;i<=42;i++)
    {
      checkfail = "grid" + i;
     // console.log(checkfail);
      if(i!=rolepos && document.getElementById(checkfail).className != "" && document.getElementById(checkfail).className != "role")
      {
        totalSeconds = 0;
        break; 
      }  
    }
}

function updateCountdown() {
  //var seconds = totalSeconds % 60;
 // console.log(totalSeconds);
  document.getElementById("time").innerHTML = totalSeconds;
  totalSeconds--;

  if (totalSeconds < 0) {
    clearInterval(countdownInterval);
    clearInterval(blockIntervalId);
    document.getElementById("time").innerHTML = "Game Over";
    window.removeEventListener("keydown", handleKeyDown);
    
  }
}
updateCountdown();

var blockIntervalId = setInterval(generateNewrow, 2000);
var countdownInterval = setInterval(updateCountdown, 1000);



function handleKeyDown(event) {
  
  var keyCode = event.keyCode;
  
  if (keyCode === 90) {
    
  /*for(i=35;i>=8;i--)
  {
    temp = i-7;
    temp = "grid"+temp;
    childgrid = "grid"+i;
    document.getElementById(childgrid).className = document.getElementById(temp).className;
  }     
      newrow(); */
  } 
  else if(keyCode === 39)
  {
    if(rolepos<42)
    {
      currentrolepos = "grid" + rolepos;
      document.getElementById(currentrolepos).className = "";
      rolepos ++;
      newrolepos = "grid"+rolepos;
      document.getElementById(newrolepos).className = keeprolecolor;
      
      
    }
  }
  else if(keyCode === 37)
  {
    if(rolepos>36)
    {
      currentrolepos = "grid" + rolepos;
      document.getElementById(currentrolepos).className = "";
      rolepos --;
      newrolepos = "grid"+rolepos;
      document.getElementById(newrolepos).className = keeprolecolor;
      
      
    }
  }
  else if(keyCode === 40)
  {
    firsttime = rolepos - 7;
    for(i=firsttime;i>=1;i-=7)
    {
      parentgrid = "grid" + i;
      if(document.getElementById(parentgrid).className != "" && keeprolecolor == "role")
      {
        keeprolecolor = document.getElementById(parentgrid).className;
        currentpos ="grid" + rolepos;
        document.getElementById(currentpos).className = keeprolecolor;
        document.getElementById(parentgrid).className = "";
        break;
      }
    }
  }
  else if(keyCode === 38)
  {
    var starteli;
    firstrow = rolepos - 35;
    alleligrid=[];
    alreadycheck = [];
    for(i=1;i<=35;i++)
    {
      alreadycheck[i]=0;
    }
    for(i=firstrow;i<=rolepos;i+=7)
    {
      currentrow = "grid" + i;
      if(document.getElementById(currentrow).className == "")
      {
        //alert(i);
        starteli = i;
        alleligrid.push(starteli);
        break;
      }
      else if(i==29 || i==30||i==31 ||i==32 ||i==33 ||i==34 ||i==35)
      {
        checkbotcolor = "grid"+i;
        if(keeprolecolor == document.getElementById(checkbotcolor).className)
        {
          //alert(i);
          starteli = i;
          alleligrid.push(starteli);
          break;
        }
       
      }
    }

    
   // alert(starteli);
    eliminate(starteli);
    
    console.log(alleligrid);


    if(alleligrid.length == 1 && keeprolecolor != "role")
    {
      noeliminate = "grid" + alleligrid[0];
      if(document.getElementById(noeliminate).className != keeprolecolor)
        document.getElementById(noeliminate).className = keeprolecolor;
      else
      {
        eliminategrid = "grid" + alleligrid[0];
        document.getElementById(eliminategrid).className = "";

        thistimescore = alleligrid.length * 10;
        score += thistimescore;
        document.getElementById("score").innerHTML = `Score = `+score+``;
      }
      
    }
    else
    {
      for(i=0;i<alleligrid.length;i++)
      {
        eliminategrid = "grid" + alleligrid[i];
        document.getElementById(eliminategrid).className = "";
      }
      
      if(alleligrid.length != 1)
      {
        thistimescore = alleligrid.length * 10;
        score += thistimescore;
        document.getElementById("score").innerHTML = `Score = `+score+``;
      }
    }

    if(alleligrid.length != 0)
    {
      clearrolecolor = "grid" + rolepos;
      keeprolecolor = "role"
      document.getElementById(clearrolecolor).className = keeprolecolor;
    }

    for(i=1;i<=7;i++)
    {
      for(j=i+7;j<=i+28;j+=7)
      {
        temp = j;
        while(temp>=8)
        {
          currentgrid = "grid" + temp;
          parentgrid = "grid" + (temp-7);
          if(document.getElementById(currentgrid).className !="" && document.getElementById(parentgrid).className == "")
          {
            document.getElementById(parentgrid).className = document.getElementById(currentgrid).className;
            document.getElementById(currentgrid).className ="";
          }
          temp -= 7;
        }
      }
    }

  
    

   

  }

}
function newrow(){
  for(i=1;i<=7;i++)
  {
    myrandom = Math.floor(Math.random() * 3);
    myrandom = "grid-item"+myrandom;
    targetgrid = "grid" + i;
    document.getElementById(targetgrid).className = myrandom;
    //document.getElementById("mygrid").innerHTML +=`<div class="grid-item`+myrandom+`"></div>`;
    //myarr[i]=1;
  }
}

function eliminate(starteli)
{
  
 
  alreadycheck[starteli] = 1;
  //alleligrid.push(starteli);
  if(alreadycheck[starteli-1]== 0 && starteli != 1 && starteli != 8 && starteli != 15 && starteli != 22 && starteli != 29 && starteli != 36)
  {
    checkleft = "grid" + (starteli-1);
    if(document.getElementById(checkleft).className == keeprolecolor)
      {
        alleligrid.push(starteli-1);
        eliminate(starteli-1);
      }
  }
    
  if(alreadycheck[starteli+1]== 0 && starteli != 7 && starteli != 14 && starteli != 21 && starteli != 28 && starteli != 35 && starteli != 42)
  {
    checkright = "grid" + (starteli+1);
    if(document.getElementById(checkright).className == keeprolecolor)
    {
      alleligrid.push(starteli+1);
      eliminate(starteli+1);
    }
      
  }
    
  if(alreadycheck[starteli-7]== 0 && starteli != 1 && starteli != 2 && starteli != 3 && starteli != 4 && starteli != 5 && starteli != 6 && starteli != 7)
  {
    checkup = "grid" + (starteli-7);
    if(document.getElementById(checkup).className == keeprolecolor)
    {
      alleligrid.push(starteli-7);
      eliminate(starteli-7);
    }
     
  }
  if(alreadycheck[starteli+7]== 0 && starteli != 29 && starteli != 30 && starteli != 31 && starteli != 32 && starteli != 33 && starteli != 34 && starteli != 35)
  {
    checkup = "grid" + (starteli+7);
    if(document.getElementById(checkup).className == keeprolecolor)
    {
      alleligrid.push(starteli+7);
      eliminate(starteli+7);
    }
     
  }
 
}
function restart()
{
  window.location.reload();
}


window.addEventListener("keydown", handleKeyDown);