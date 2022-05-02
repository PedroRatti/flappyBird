console.log('Flappy Bird');

var frames = 0;
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
    
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };
    return chao;
};


const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        
        contexto.fillStyle = '#70c5ce';

        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    }

}

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;
    console.log(frames);
    if (flappyBirdY >= chaoY) {
        return true;
    }

    return false;
}



function criaFlappyBird() {
    var flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 1.5,
        pula() {
            flappyBird.velocidade =  - flappyBird.pulo;
        },
        gravidade: 0.05,
        velocidade: -1,
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {

                mudaParaTela(Telas.GAME_OVER);
                return;
            }

    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;

            if (globais.placar.pontuacao > 8) {
                globais.flappyBird.pulo = 1.8;
                
            }

            if (globais.placar.pontuacao > 20) {
                globais.flappyBird.pulo = 2;
                
            }
        },

        movimentos: [
            {spriteX: 0, spriteY: 0, }, // asa p cima
            {spriteX: 0, spriteY: 26, }, // asa no meio
            {spriteX: 0, spriteY: 52, }, // asa p baixo
            {spriteX: 0, spriteY: 26, }, // asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames  = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao
            }
        },
        desenha() {
            flappyBird.atualizaOFrameAtual()
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            
            contexto.drawImage(
                sprites,
                spriteX, spriteY, //Sprite X, Sprite Y (dentro da imagem, são os pixeis que reprsentam a distancia)
                flappyBird.largura, flappyBird.altura, //tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
    }
    return flappyBird;
}

// [mensagem getready]
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
        );
    }
}

// [mensagem gameover]
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h,
        );
    }
}



function criaCanos() {
    const canos = {
        largura: 52,
        altura:400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par) {

            const yRandom = par.y;
            const espacamentoEntreCanos = 90;

                 // [Canos vindos do Céu]
            const canoCeuX = par.x;
            const canoCeuY = yRandom;

            contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canoCeuX, canoCeuY,
                canos.largura, canos.altura,
            )

            
            // [Canos vindo do Chão]
            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;

            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
            )

            par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuY
            }
            par.canoChao = {
                x: canoChaoX,
                y: canoChaoY
            }
            })
        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if (globais.flappyBird.x >= par.x) {
                
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if (peDoFlappy >= par.canoChao.y) {
                  return true;  
                }
                
            
            }

            

            return false;
        },
        pares: [],
    
        testeIntervaloPrimeiraFase: false,
        testeIntervaloSegundaFase: false,
        atualiza() {
            var passou100Frames = frames % 100 === 0;
            var passou500Frames = frames % 500 === 0; 
            var passou1000Frames = frames % 1000 === 0;
            
            switch (globais.flappyBird.pulo) {
                case 1.5:
                    if (passou100Frames) {
                        canos.pares.push({
                            x: canvas.width,
                            y: -150 * (Math.random() + 1),
                        })
                    }
                    break;


                case 1.8: 
                    if (passou500Frames) {
                    canos.testeIntervaloPrimeiraFase = true;
                }



                    if (canos.testeIntervaloPrimeiraFase) {
                        if (passou100Frames) {
                        canos.pares.push({
                            x: canvas.width,
                            y: -150 * (Math.random() + 1),
                        })
                    }
                }
                break;


                case 2:
                    if (passou1000Frames) {
                        canos.testeIntervaloSegundaFase = true;
                    }
    
    
    
                    if (canos.testeIntervaloSegundaFase) {
                        if (passou100Frames) {
                            canos.pares.push({
                                x: canvas.width,
                                y: -150 * (Math.random() + 1),
                            })
                        }
                    }

            }
           

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if (canos.temColisaoComOFlappyBird(par)) {
                    mudaParaTela(Telas.GAME_OVER);
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            })
        }
    }
    return canos;
}


function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '20px serif';
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white'
            contexto.fillText(` ${placar.pontuacao}`, canvas.width - 20, 35);
            placar.pontuacao
        },
        atualiza() {
            const intervaloDeFrames  = 30;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }

    }

    return placar;
}

document.onkeydown = teclado;
function teclado(e) {
    if (e.keyCode == 32) {
        globais.flappyBird.pula(); 
    }
} 


// Telas

const globais = {};
var telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
            
        },
        teclado() {
            mudaParaTela(Telas.JOGO);
        },
        click() {
            frames = 0;
            mudaParaTela(Telas.JOGO); 
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};


Telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappyBird.pula();  
    },
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    },
}

Telas.GAME_OVER = {
    desenha() {
        mensagemGameOver.desenha();
    },
    atualiza() {

    },
    teclado(e) {
        mudaParaTela(Telas.INICIO);
    },
    click() {
        mudaParaTela(Telas.INICIO);
    }
}


function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();