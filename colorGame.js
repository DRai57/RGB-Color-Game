console.log("colorGame.js is connected");
// selecting all divs 
let divs = document.body.getElementsByClassName("square");
let randomColorList = [];
let randomlyPickedColor ;
let setPick ;
// function for checking randomly picked color. 
function checkRandomColor(randomColorList){
    randomlyPickedColor = randomColorList[Math.ceil(Math.random()*randomColorList.length-1)];
    console.log(" after checking value",randomlyPickedColor);
    if(randomlyPickedColor==="rgb(35, 35, 35)"){
        randomlyPickedColor = checkRandomColor(randomColorList);
    }
    return randomlyPickedColor;
}
// function for randomly picking color for matching. When the result is shown. 
function setRandomPickedColor(randomColorList){
    // Getting randomly picked color from the list and setting on the page.
    randomlyPickedColor =  checkRandomColor(randomColorList);    
    setPick = document.getElementById("pickedOne");
    setPick.innerText = randomlyPickedColor;
}
// defining function for randomly selecting the div colors . 
// When the result is shown. 
let flagForNextLevel ;
let noOfDivs =(n)=>{return n};
function setRandomDivs(noOfDivs=0){
    // looping through divs and adding them to the list.
    randomColorList = [];
    if(noOfDivs === 0 || noOfDivs === 6){
        flagForNextLevel = false;
        for(i=0; i<divs.length; i++){
            divs[i].style.backgroundColor = "rgb("+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+")";
            randomColorList.push(divs[i].style.backgroundColor);
        }
        setRandomPickedColor(randomColorList);
    }else{
        if(noOfDivs===3){
            flagForNextLevel = true;
            for(i=0; i<divs.length; i++){
                if(i<noOfDivs){
                    divs[i].style.backgroundColor = "rgb("+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+")";
                    randomColorList.push(divs[i].style.backgroundColor);
                }else{
                    divs[i].style.backgroundColor = "rgb(35, 35, 35)";
                    randomColorList.push(divs[i].style.backgroundColor);
                }
            }
            setRandomPickedColor(randomColorList);
        }
    }
}
setRandomDivs();
// Score board Settings.
let result = document.querySelector("#result");
let score = document.querySelector("#score");
let lives = document.querySelector("#lives");
let header = document.querySelector("#top");
//header.style.backgroundColor = "rgb(100, 171, 253)";
// function to set all divs = correct color (when the answer is right)
function ansIsTrue(randomlyPickedColor){
    if(flagForNextLevel){
        for(i=0; i<divs.length; i++){
            if(i<3){
                divs[i].style.backgroundColor = randomlyPickedColor;
            }else{
                divs[i].style.backgroundColor = "rgb(35, 35, 35)";
            }
        }
    }else{
        for(i=0; i<divs.length; i++){
            divs[i].style.backgroundColor = randomlyPickedColor;
        }
    }
    header.style.backgroundColor = randomlyPickedColor;
    setTimeout(function(){
        header.style.backgroundColor = "rgb(100, 171, 253)";
    },1000); 
}
// Main game loop 
for(i=0; i<divs.length; i++){
    // Adding event listeners and checking the answer.
    divs[i].addEventListener("click",function(){
        current = this.style.backgroundColor;
        // To check if lives is equal to zero or not (to continue or stop game). 
        if(Number(lives.innerText)===0){
            alert("GAME OVER!!!");
            location.reload(true);
        }
        // If the selected color is right.
        if(current  === randomlyPickedColor){
            result.innerText = "Correct";
            ansIsTrue(randomlyPickedColor);
            setTimeout(function(){
                result.innerText = "----";
                score.innerText = Number(score.innerText)+1;
                if(Number(score.innerText)%3===0){
                    lives.innerText = Number(lives.innerText)+1;
                }
                if(flagForNextLevel){
                    setRandomDivs(3);
                }else{
                    flagForNextLevel = false;
                    setRandomDivs();
                }
            },1000);
        }else if(current !== "rgb(35, 35, 35)"){
            this.style.backgroundColor = "#232323";
            result.innerText = "Try Again";
            lives.innerText = Number(lives.innerText) - 1;
        }            
    });
}