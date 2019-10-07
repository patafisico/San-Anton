let tileX = localStorage.getItem('coordX');
let tileY = localStorage.getItem('coordY');
let zoom = localStorage.getItem('zoom');
localStorage.clear();
console.log(tileX);
console.log(tileY);
console.log(zoom);
const TILE_SIZE = 256;
const COLS = 15;
const ROWS = 15;
const MAP_VERSION = 855;
const DIST = 1;
let tileMap;
let mapa;
let pos = [
  [-TILE_SIZE/2, -TILE_SIZE/2],
  [-TILE_SIZE * (COLS - 8), -TILE_SIZE * (COLS - 4)],
  [TILE_SIZE * -2.5 * DIST, TILE_SIZE * -2.5 * DIST]
];
let axeX = pos[2][0];
let axeY = pos[2][1];
let step = 10;
let z;
let h = 1300;
let cam;
let easing = 0.005;
let iniZ = 1000;
let sec = 1;
let font;
let fontS = 250;

function array2D(cols, rows){
  let array = new Array(cols);
  for(let i = 0; i < array.length; i++){
    array[i] = new Array(rows);
  }
  return array;
}

function loadTiles(tX, tY){
  let tileX = tX - DIST;
  for(let x = 0; x < COLS; x++){
    let tileY = tY - DIST;
    for(let y = 0; y < ROWS; y++){
      tileMap[x][y]=`https://khm0.google.com/kh/v=${MAP_VERSION}&x=${tileX}&s=&y=${tileY}&z=${zoom}&s=Galil`;
      tileY++; 
    }
    tileX++;
  } 
}

function preload(){
  font = loadFont("assets/CrudeRegularFont-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  tileMap = array2D(COLS, ROWS);
  mapa = array2D(COLS, ROWS);
  loadTiles(tileX, tileY);
  for(let x=0; x<COLS; x++){
    for(let y=0; y<ROWS; y++){
      mapa[x][y]=loadImage(tileMap[x][y])
    }
  } 
  textFont(font);
  textSize(fontS);
  fill(225);
  cam = height/2;
  z = iniZ;
  print('setup...')
}

function draw() { 
  background(0);
  if(millis() >= 10000){

  camera(width/2, cam, z, width/2, height/2, 0, 0, 1, 0);
  translate(axeX, axeY);
  if(sec === 1){
    z-=3;
    if(z <= height/2) sec++;
  }  

  if(sec === 2){
    axeX += (pos[1][0] - axeX) * easing;
    axeY += (pos[1][1] - axeY) * easing;
    z = map(axeX, pos[2][0], pos[1][0], height/2, iniZ);
    cam =  map(axeX, pos[2][0], pos[1][0], height/2, 1300 );
    if(axeX <= pos[1][0] + 100) sec++;
  }

  if(sec === 3){
    axeX += (pos[0][0] - axeX) * easing;
    axeY += (pos[0][1] - axeY) * easing;
    z = map(axeX, pos[1][0], pos[0][0], iniZ, 300);
    cam =  map(axeX, pos[1][0], pos[0][0], 1300, height/2 );
  }
  
  for(let x=0; x<ROWS; x++){
    for(let y=0; y<COLS; y++){
      image(mapa[x][y], x*TILE_SIZE, y*TILE_SIZE);
    }
   }  
  } else { text(ceil(millis()/1000), -fontS/4, fontS/2);} 
}

function mousePressed() {
  window.open("index.html", "_parent");
}
