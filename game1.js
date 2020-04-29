$(document).ready(function() {
var canvas = $("#canvas_1")[0];
var intialCanvas = document.getElementById("canvas_1");
intialCanvas.width = 400;
intialCanvas.height = 400;
var canvasContext = intialCanvas.getContext("2d");
var cellStartPoint_X = 0;
var cellStartPoint_Y = 0;
var cellEndPoint_X = intialCanvas.width;
var cellEndPoint_Y = intialCanvas.height;
var player_who = 0;
var cells = [];
var all_Players = [0, 0];
var array_canvas = [];
var cells = [];
var temp = [];
var box = [];




function intial() {
    if (canvasContext) {
      canvasContext.strokeStyle = "black";
      canvasContext.lineWidth = 2;
    }
  }

function draw_columns(cell_num, x, y){
    var distance = intialCanvas.width / cell_num;
    var start_point_X = cellStartPoint_X + x;
    var start_point_Y = cellStartPoint_Y + y;
    var end_point_Y = cellEndPoint_Y + y;
    canvasContext.beginPath();
        for(var i = 0; i <= cell_num; ++i){
            canvasContext.moveTo(start_point_X, start_point_Y);
            canvasContext.lineTo(start_point_X, end_point_Y);
            start_point_X = start_point_X + distance;
        }
        canvasContext.stroke();
        canvasContext.closePath(); 
    }

    function draw_rows(cell_num, x, y){
        var distance = intialCanvas.height / cell_num;
        var start_point_X = cellStartPoint_X + x;
        var start_point_Y = cellStartPoint_Y + y;
        var end_point_X = cellEndPoint_X + x;
        canvasContext.beginPath();
        for(var i = 0; i <= cell_num; ++i){
            canvasContext.moveTo(start_point_X, start_point_Y);
            canvasContext.lineTo(end_point_X, start_point_Y);
            start_point_Y = start_point_Y + distance;
        }
        canvasContext.stroke();
        canvasContext.closePath();
    }

var player_status;

canvasContext.clearRect(0, 0, intialCanvas.height, intialCanvas.width);

var blue_canvas = document.createElement("canvas");
blue_canvas.height = 20;
blue_canvas.width = 20;
var blue_can_context = blue_canvas.getContext("2d");
var side = blue_canvas.width / 2;
blue_can_context.fillStyle = "#0000FF";
blue_can_context.fillRect(0, 0, blue_canvas.width, blue_canvas.height);
array_canvas.push(blue_canvas);

var red_canvas = document.createElement("canvas");
red_canvas.height = 20;
red_canvas.width = 20;
var red_can_context = red_canvas.getContext("2d");
var side = red_canvas.width / 2;
red_can_context.fillStyle = "#FF0000";
red_can_context.fillRect(0, 0, red_canvas.width, red_canvas.height);
array_canvas.push(red_canvas);

var player_colors = ["#0000FF", "#FF0000"];



function d_box(side, player_who, x, y){
    canvasContext.beginPath();
    canvasContext.drawImage(array_canvas[player_who], y - side, x - side, side << 1, side << 1);
    canvasContext.closePath();
}

function box_intialize(rows, columns){
  for (j = 0; j < columns; ++j) {
    box[j] = [];
    for (i = 0; i < rows; ++i) {
      box[j][i] = 0;
    }
  }
}


function place_detection(x, y, cells){

  var hdis = 40;
  var vdis = 40;

  for(var i = 0; i < 10; i++){
    
    for(var j = 0; j <10; j++){
      if(x <= (vdis * (j + 1)) && y <= (hdis * (i + 1))){
        if(box[j][i] == 0){
            box[j][i] = 1;
            return [i, j];
        }
        
        else{
          return;
        }
      }
      }
    }
    
}

  function cell_intialize(rows, columns, cells){    
      for(var j = 0; j < columns; j++){
        cells[j] = [];
        for(var i = 0; i < rows; i++){
          cells[j][i] = {x: 0, y: 0, player_num: 0, active: 0}; 
        }
      }
  }

  function cell_update(x, y, player_who, i, j, cells){
        if(box[j][i] === 1){
          cells[j][i].active = 1;
          cells[j][i].player_num = player_who;
          cells[j][i].x = x;
          cells[j][i].y = y;
        }
      
    
  }

  function cell_status_checker(x, y, i, j, rows, columns, cells, player_num){
    var x = x;
    var y = y;
      
    if(box[j][i] == 1){
      
      if(j == 0 && i == 0){
        if(cells[j + 1][i].active == 1 && cells[j][i + 1].active == 1 && cells[j + 1][i + 1].active == 1 && (cells[j][i].player_num == cells[j][i + 1].player_num) && (cells[j][i].player_num == cells[j + 1][i].player_num) && (cells[j][i].player_num == cells[j + 1][i + 1].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].x, cells[j][i].y);
          canvasContext.lineTo(cells[j + 1][i].x, cells[j + 1][i].y);
          canvasContext.moveTo(cells[j + 1][i].x, cells[j + 1][i].y);
          canvasContext.lineTo(cells[j + 1][i + 1].x, cells[j + 1][i + 1].y);
          canvasContext.moveTo(cells[j + 1][i + 1].x, cells[j + 1][i + 1].y);
          canvasContext.lineTo(cells[j][i + 1].x, cells[j][i + 1].y);
          canvasContext.moveTo(cells[j][i + 1].x, cells[j][i + 1].y);
          canvasContext.lineTo(cells[j][i].x, cells[j][i].y);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
        }
      }
      if((j == 0 && i == 1) || (i != 0 && i < rows && j == 0)){
        if(cells[j][i - 1].active == 1 && cells[j + 1][i].active == 1 && cells[j + 1][i - 1].active == 1 && (cells[j][i].player_num == cells[j][i - 1].player_num) && (cells[j][i].player_num == cells[j + 1][i].player_num)&& (cells[j][i].player_num == cells[j + 1][i - 1].player_num)) {
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j][i - 1].y, cells[j][i - 1].x);
          canvasContext.moveTo(cells[j][i - 1].y, cells[j][i - 1].x);
          canvasContext.lineTo(cells[j + 1][i - 1].y, cells[j + 1][i - 1].x);
          canvasContext.moveTo(cells[j + 1][i - 1].y, cells[j + 1][i - 1].x);
          canvasContext.lineTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.moveTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
        }
       }

       if((j == 0 && i != 0 && i < rows - 1)){
         if(cells[j + 1][i].active == 1 && cells[j][i + 1].active == 1 && cells[j + 1][i + 1].active == 1 && (cells[j][i].player_num == cells[j + 1][i].player_num) && (cells[j][i].player_num == cells[j][i + 1].player_num)&& (cells[j][i].player_num == cells[j + 1][i + 1].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.moveTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.lineTo(cells[j + 1][i + 1].y, cells[j + 1][i + 1].x);
          canvasContext.moveTo(cells[j + 1][i + 1].y, cells[j + 1][i + 1].x);
          canvasContext.lineTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.moveTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
         }
       }

       if((j < columns && i == 0 && j != 0) ||  (j < columns - 1 && j > 0 && i > 0 && i < rows - 1)){
         if(cells[j - 1][i].active == 1 &&  cells[j][i + 1].active == 1 && cells[j - 1][i + 1].active == 1 &&  (cells[j][i].player_num == cells[j - 1][i].player_num) && (cells[j][i].player_num == cells[j][i + 1].player_num) && (cells[j][i].player_num == cells[j - 1][i + 1].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.moveTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.lineTo(cells[j - 1][i + 1].y, cells[j - 1][i + 1].x);
          canvasContext.moveTo(cells[j - 1][i + 1].y, cells[j - 1][i + 1].x);
          canvasContext.lineTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.moveTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
         }
       }

       if((j < rows - 1 && j != 0 && i == 0) || (j < columns - 1 && j > 0 && i > 0 && i < rows - 1)){
         if(cells[j + 1][i].active == 1 && cells[j + 1][i + 1].active == 1 && cells[j][i + 1].active == 1 && (cells[j][i].player_num == cells[j + 1][i].player_num) && (cells[j][i].player_num == cells[j + 1][i + 1].player_num) && (cells[j][i].player_num == cells[j][i + 1].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.moveTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.lineTo(cells[j + 1][i + 1].y, cells[j + 1][i + 1].x);
          canvasContext.moveTo(cells[j + 1][i + 1].y, cells[j + 1][i + 1].x);
          canvasContext.lineTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.moveTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
         }
       }

       if(j == columns - 1 && i < rows && i > 0){
         if(cells[j - 1][i].active == 1 && cells[j - 1][i - 1].active == 1 && cells[j][i - 1].active == 1 && (cells[j][i].player_num == cells[j - 1][i].player_num) && (cells[j][i].player_num ==  cells[j - 1][i - 1].player_num) && (cells[j][i].player_num == cells[j][i - 1].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.moveTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.lineTo(cells[j - 1][i - 1].y, cells[j - 1][i - 1].x);
          canvasContext.moveTo(cells[j - 1][i - 1].y, cells[j - 1][i - 1].x);
          canvasContext.lineTo(cells[j][i - 1].y, cells[j][i - 1].x);
          canvasContext.moveTo(cells[j][i - 1].y, cells[j][i - 1].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
         }
       }

       if(j == columns - 1 && i > 0 && i < rows - 1){
        if(cells[j - 1][i].active == 1 && cells[j - 1][i + 1].active == 1 && cells[j][i + 1].active == 1 && (cells[j][i].player_num == cells[j - 1][i].player_num) && (cells[j][i].player_num ==  cells[j - 1][i + 1].player_num) && (cells[j][i].player_num == cells[j][i + 1].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.moveTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.lineTo(cells[j - 1][i + 1].y, cells[j - 1][i + 1].x);
          canvasContext.moveTo(cells[j - 1][i + 1].y, cells[j - 1][i + 1].x);
          canvasContext.lineTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.moveTo(cells[j][i + 1].y, cells[j][i + 1].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
        }
       }

       if((j > 0 && j < columns && i == rows - 1) ||  (j < columns - 1 && j > 0 && i > 0 && i < rows - 1)){
        if(cells[j - 1][i].active == 1 && cells[j - 1][i - 1].active == 1 && cells[j][i - 1].active == 1 && (cells[j][i].player_num == cells[j - 1][i].player_num) && (cells[j][i].player_num ==  cells[j - 1][i - 1].player_num) && (cells[j][i].player_num == cells[j][i - 1].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.moveTo(cells[j - 1][i].y, cells[j - 1][i].x);
          canvasContext.lineTo(cells[j - 1][i - 1].y, cells[j - 1][i - 1].x);
          canvasContext.moveTo(cells[j - 1][i - 1].y, cells[j - 1][i - 1].x);
          canvasContext.lineTo(cells[j][i - 1].y, cells[j][i - 1].x);
          canvasContext.moveTo(cells[j][i - 1].y, cells[j][i - 1].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
        }
       }

       if((j < columns - 1 && i == rows - 1 && j > 0) || (j < columns - 1 && j > 0 && i > 0 && i < rows - 1)){
        if(cells[j][i - 1].active == 1 && cells[j + 1][i - 1].active == 1 && cells[j + 1][i].active == 1 && (cells[j][i].player_num == cells[j][i - 1].player_num) && (cells[j][i].player_num ==  cells[j + 1][i - 1].player_num) && (cells[j][i].player_num == cells[j + 1][i].player_num)){
          canvasContext.strokeStyle = player_colors[player_num];
          canvasContext.beginPath();
          canvasContext.moveTo(cells[j][i].y, cells[j][i].x);
          canvasContext.lineTo(cells[j][i - 1] .y, cells[j][i - 1].x);
          canvasContext.moveTo(cells[j][i - 1].y, cells[j][i - 1].x);
          canvasContext.lineTo(cells[j + 1][i - 1].y, cells[j + 1][i - 1].x);
          canvasContext.moveTo(cells[j + 1][i - 1].y, cells[j + 1][i - 1].x);
          canvasContext.lineTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.moveTo(cells[j + 1][i].y, cells[j + 1][i].x);
          canvasContext.lineTo(cells[j][i].y, cells[j][i].x);
          canvasContext.stroke();
          all_Players[player_num] = all_Players[player_num] + 1;
        }
       }
    }
    document.querySelector('#score-' + player_who).textContent = all_Players[player_who];  
  return;
        
  }

  function count_box(all_Players, rows, columns){
    if(all_Players[0] >= 8){
      alert("Game Over! Player 1 won the game!");
      window.location.reload();
    }  if(all_Players[1] >= 8){
      alert("Game Over! Player 2 won the game!");
      window.location.reload();
    }
  }

  function gameOver(box, rows, columns){
    flag = 0;
    for(var i = 0; i < rows; i++){
      for(var j = 0; j < columns; j++){
        if(box[j][i] == 1){
          continue;
        }
        else{
          flag = 1;
          break;
        }
      }
    }

    if(flag == 0){
      alert("Game Over! All cells are filled!");
      window.location.reload();
    }
  }


function toggle(arg) {
  if (arg == 0) {
    arg = 1;
  } else {
     arg = 0;
     }
    return arg;
}
    
      function getMousePosition(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        const a = event.clientX - rect.left;
        const b = event.clientY - rect.top;
        return {a, b};
      }
    
      var can_element = document.querySelector("canvas");
    
      can_element.addEventListener("mousedown", function(e) {
        const co_ordinates = getMousePosition(can_element, e);
        xpos = co_ordinates.a;
        ypos = co_ordinates.b;
        
        var hdis = 40;
        var vdis = 40;
        var temp = [];

        temp = place_detection(xpos, ypos, cells);
        var a = temp[0];
        var b = temp[1];
        let xposition = temp[0] * vdis + vdis / 2;
        let yposition = temp[1] * hdis + hdis / 2;
        player_status = player_who;
        d_box(5, player_who, xposition, yposition);
        cell_update(xposition, yposition, player_who, temp[0], temp[1], cells);
      
        cell_status_checker(xposition, yposition, temp[0], temp[1], 10, 10, cells, player_who);

        setTimeout(function()  {
          count_box(all_Players, 10, 10);
        }, 200);

        gameOver(box, 10, 10);

        player_who = toggle(player_who);
       
});

intial();
box_intialize(10, 10);
cell_intialize(10, 10, cells);
draw_columns(10, 0, 0);
draw_rows(10, 0, 0);
});