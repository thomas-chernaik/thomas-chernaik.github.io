function draw(){
    for(let i=0; i<width; i++){
        for(let j=0; j<height; j++){
                ctx.fillStyle = "hsl("+array[j][i]+",100%,50%)";
                ctx.fillRect( i, j, 1, 1 );

        }
    }

}
async function escape(c, z, escapeNum){
    var count = 0;
    while(z.re+z.im < escapeNum && count < escapeNumber){
        z = math.add(math.multiply(z,z),c);
        count++;
    }
    return count;
}
function generate(){
        $("#gen").html("Generating");
        setTimeout(generateJulia, 1);
}
async function generateJulia(){
    escapeNumber = parseFloat($("#esc").val());
    c.re = parseFloat($("#cx").val());
    c.im = parseFloat($("#cy").val());

    array = []
    arrayOfPromises = []
    for(let j=0; j<height; j++){
        arrayOfPromises.push([]);
        for(let i=0; i<width; i++){
            arrayOfPromises[j].push(escape(c, math.complex((j/height)*4-2,(i/width)*4-2), 2));

        }
    }
    for(let j=0; j<height; j++){
        array.push([]);
        for(let i=0; i<width; i++){
            num = await arrayOfPromises[j][i];
            array[j].push((num/escapeNumber)*360);

        }
    }
    draw();
    $("#gen").html("Generate");
}
var escapeNumber;
var width=300;
var height=300;
var c = math.complex(0,0);
var array;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(2,2);
generate();