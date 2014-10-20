// ***** Variables******

// getting canvas
var canvas = document.querySelector("#clock");
// getting context    
var context = canvas.getContext("2d");
// clock radius, can be change
var clockRadius = 100;
// width and height of clock can be change according to the size of canvas
var clockX = canvas.width / 2;
var clockY = canvas.height / 2;
// PI=180 degree to get complete roundtrip of a cirle we need PI*2
Math.TowPi = 2 * Math.PI;
/*
* gets system's time and displays
*/
function displayTime() {
   var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    
    /*
    * draws arms of clock
    */
    function drawArm(progress, armThickness, armLength, armColor) {
        var armRadians = (Math.TowPi * progress) - (Math.TowPi/4);
        var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
        var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);
        
      //  context.lineWidth = armThickness;
        context.strokeStyle = armColor;
        context.lineWidth=armThickness;
        context.beginPath();
        context.moveTo(clockX, clockY); // Starting point of line
        context.lineTo(targetX, targetY); // to the ending point of line
        context.stroke();
}
    //clear the canvas before next second
    context.clearRect(0, 0, canvas.width, canvas.height); 
    addDotsAndImages();
    drawArm(h / 12, 8, 0.50, 'black'); // Hour
    drawArm(m / 60,  4, 0.65, 'blue'); // Minute
    drawArm(s / 60,  2, 0.90, 'red'); // Second
}
/*
* add dots in circle
*/
function addDotsAndImages(){
    
    for(s=1;s<=60;s++){
        t=s/60;
        var armRadians = (Math.TowPi * t) - (Math.TowPi/4);
        var targetX = clockX + Math.cos(armRadians) * (1 * clockRadius);
        var targetY = clockY + Math.sin(armRadians) * (1 * clockRadius);
        var img=new Image();
        
        if(s==15){
            img.src= './folder/3.png';
            context.drawImage(img, targetX-6, targetY-7, 15, 15);
        }
        else if(s==30){
            img.src= './folder/6.png';
            context.drawImage(img, targetX-6, targetY-7, 15, 15);
        }
        else if(s==45){
            img.src= './folder/9.png';
            context.drawImage(img, targetX-6, targetY-7, 15, 15);
        }
        else if(s==60){
            img.src= './folder/12.png';
            context.drawImage(img, targetX-6, targetY-7, 15, 15);
        }
        else if(s%5==0){
            context.strokeStyle = 'black';
            context.lineWidth = 3;
            context.beginPath();
            context.arc(targetX,targetY,1,0,Math.TowPi);
            context.stroke();
        }
        else{
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.beginPath();
            context.arc(targetX,targetY,1,0,Math.TowPi);
            context.stroke();
        }
    }
}

function clockApp(){
    // 1000 miliseconds for make 1 sec to refresh the time
    setInterval(displayTime, 1000);
    displayTime();
}
clockApp();

//******************** Handeling Events

$("#rotateClockwise").click(function () {
     var canvas = document.getElementById('clock');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(20 * Math.PI / 180);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    clockApp();
});
$("#rotateCounterClockwise").click(function () {
    var canvas = document.getElementById('clock');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(-20 * Math.PI / 180);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    clockApp();
});

 
