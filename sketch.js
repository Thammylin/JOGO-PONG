//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 23;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150; 
let largRaquete = 10;
let altRaquete = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente  = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo

let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

// chance de erro 
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


//setup() é executada quando o programa é iniciado. É usado para definir as propriedades do ambiente inicial.

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}


//draw() significa  desenhar na tela, é o esqueleto central de todo progama desenvolvido em Processing.

function draw() {
  background(139,0,139);//1 - Desenha o background 
  mostraBolinha();// 2 - Desenha a bolinha
  movimentaBolinha();// 3 - Movimenta a Bolinha
  verificaColisaoBorda();// 4 - Verifica Colisão da bolinha
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaodaRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
   verificaColisaodaRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
   
  if (xBolinha  + raio >  width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x,y,largRaquete,altRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}


function verificaColisaodaRaquete(x,y){
 colidiu = collideRectCircle(x, y,largRaquete, altRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

/*function movimentaRaqueteOponente(){
  if (keyIsDown(87)) {
   yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
 }
 }*/


function movimentaRaqueteOponente(){
    velocidadeYOponente = yBolinha -   yRaqueteOponente - largRaquete / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

 function incluiPlacar(){
   stroke(255);
   textAlign(CENTER);
   textSize(16);
   fill(color(218,112,214));
   rect(150,10,40,20);
   fill(255);
   text(meusPontos, 170, 26);
  fill(color(218,112,214));
   rect(450,10,40,20);
   fill(255);
   text(pontosDoOponente,470, 26);
 }

function marcaPonto() {
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
 }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 41
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
