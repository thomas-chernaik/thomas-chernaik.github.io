function getNeighbours(location, width, height){
    unfilteredNeighbours = [[location[0] + 1, location[1]],
                             [location[0] + 1, location[1] + 1],
                             [location[0], location[1] + 1],
                             [location[0] - 1, location[1]],
                             [location[0] - 1, location[1] - 1],
                             [location[0], location[1] + -1],
                             [location[0] + 1, location[1] - 1],
                             [location[0] - 1, location[1] + 1]];
    filteredNeighbours = [];
    //filters out the out of range neighbours
    unfilteredNeighbours.forEach(neighbour =>   {
        if (neighbour[0] >= 0 && neighbour[1] >= 0 && neighbour[0] < width && neighbour[1] < height)
        {
            filteredNeighbours.push(neighbour)
        }
    });

    return filteredNeighbours;
}
function calculateNextPixelState(location){
    neighbours = getNeighbours(location, array[0].length, array.length);
    count = 0;
    neighbours.forEach(neighbour =>{
        if (array[neighbour[1]][neighbour[0]] == 1){
            count++;
        }
    });
    if(count == 3){
        return 1;
    }
    return 0;
}
function calculateNextGameState(){
    newArray = [];
    for(let i=0; i<array.length; i++){
        newArray.push([]);
        for(let j=0; j<array[0].length; j++){
            newArray[i].push(calculateNextPixelState([j,i]));
        }
    }
    array = newArray;
    draw();
}

function draw(){
    for(let i=0; i<200; i++){
        for(let j=0; j<100; j++){
            if(array[j][i] === 1){
                ctx.fillStyle = "rgba(177,156,217,255)";
                ctx.fillRect( i, j, 1, 1 );
            }
            else{
                ctx.fillStyle = "rgba(0,0,0,255)";
                ctx.fillRect( i, j, 1, 1 );
            }

        }
    }

}
function randomArray(width, height){
    array = [];
    for(let i=0; i<height; i++){
        array.push([]);
        for(let j=0; j<width; j++){
            array[i].push(Math.floor(Math.random()*2));
        }
    }
    draw();
}
function clearArray(width, height){
    array = [];
    for(let i=0; i<height; i++){
        array.push([]);
        for(let j=0; j<width; j++){
            array[i].push(0);
        }
    }
    draw();
}
function start(){
    interval = setInterval(calculateNextGameState, 100);
    $("#startstop").html("Stop");
    $("#startstop").attr("onclick","stop()");
}
function stop(){
    clearInterval(interval);
    $("#startstop").html("Start");
    $("#startstop").attr("onclick","start()");
}
function clickTheCanvas(event) {
            array[Math.floor(event.offsetY/3)][Math.floor(event.offsetX/3)] = array[Math.floor(event.offsetY/3)][Math.floor(event.offsetX/3)]==0?1:0;
            draw();
}
function loadCanvas(){
    var loadArray = JSON.parse(localStorage.getItem("gol"));
    if(loadArray){
        array = [...loadArray];
        draw();
        $("#load").html("Loaded.");
        setTimeout(function(){$("#load").html("Load")}, 1000);
    }
    else{
        $("#load").html("Failed.");
        setTimeout(function(){$("#load").html("Load")}, 1000);
    }
}
function saveCanvas(){
    localStorage.setItem("gol", JSON.stringify(array));
    $("#save").html("Saved.");
    setTimeout(function(){$("#save").html("Save")}, 1000);
}

var interval;
var array;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(3,3);
canvas.addEventListener("mousedown", function(e)
        {
            clickTheCanvas(e);
        });

randomArray(200,100);
draw();
