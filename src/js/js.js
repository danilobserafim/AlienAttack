function start() {
    $("#inicio").remove()

    $("#fundoGame").append("<div id='placar' > </div>")
    $("#fundoGame").append("<div id='vida' > </div>")

    $("#fundoGame").append("<div id='nave' > </div>")
    $("#fundoGame").append("<div id='inimigo' > </div>")

    $("#fundoGame").append("<div id='recompensa' > </div>")
    $("#fundoGame").append("<div id='recompensa2' > </div>")
    $("#fundoGame").append("<div id='bigRecompensa' ></div>")



    var cacada = 0
    var coleta = 0
    var vida = 3
    
    var velocidadeDisparo = 1
    var velocidade = 20
    var podeAtirar = true

    var posicaoYinimigo = parseInt(Math.random() * 800)
    var posicaoYinimigo2 = parseInt(Math.random() * 800)
    var posicaoYrecompensa = parseInt(Math.random() * 800)
    var posicaoYrecompensa2 = parseInt(Math.random() * 800)
    var posicaoYbigRecompensa = parseInt(Math.random() * 800)



    var musica = document.getElementById("music")
    var somExplosao = document.getElementById("somExplosao")
    var somExplosãoNave = document.getElementById("somExplosãoNave")
    var somRecompensa = document.getElementById("somRecompensa")
    var somRecompensa2 = document.getElementById("somRecompensa2")
    var somBigRecompensa = document.getElementById("somBigRecompensa")
    var somGameOver = document.getElementById("somGameOver")
    
    musica.currentTime = 0
    musica.play()


    //Principais variaveis do jogo

    var jogo = {}
    var tecla = {
        A: 65,
        D: 68,
        W: 87,
        left: 37,
        top: 38,
        right: 39
        
    }
    jogo.pressionou = [];
    $(document).keydown((e) => {
        jogo.pressionou[e.which] = true
    })

    $(document).keyup((e) => {
        jogo.pressionou[e.which] = false
    })

    function moveNave() {
        if (jogo.pressionou[tecla.A] || jogo.pressionou[tecla.left]) {
            var esquerda = parseInt($("#nave").css("left"))
            if (esquerda >= 10) {
                $("#nave").css("left", esquerda - 20)
            }
        }

        if (jogo.pressionou[tecla.D] || jogo.pressionou[tecla.right]) {
            var esquerda = parseInt($("#nave").css("left"))
            var direita = parseInt($("#nave").css("right"))

            if (direita >= 10) {
                $("#nave").css("left", esquerda + 20)
            }
        }

        if (jogo.pressionou[tecla.W] || jogo.pressionou[tecla.top]) {
            //Tecla
            disparo()
        }
    }

    //Game loop

    jogo.timer = window.setInterval(loop, velocidade); //função autoexecutavel



    function loop() {
        colisao()
        placar()
        energia()
        moveFundo()
        moveNave()
        moveInimigo()
        moveInimigo2()
        moveRecompensa()
        moveRecompensa2()
        movebigRecompensa()
    }

    function moveFundo() {
        front = parseInt($("#fundoGame").css("background-position-y"))
        $("#fundoGame").css("background-position-y", front + 3)

        back = parseInt($("#fundogame2").css("background-position-y"))
        $("#fundogame2").css("background-position-y", back + 1)
    }

    function moveInimigo() {
        posicaoX = parseInt($("#inimigo").css("top"))
        $("#inimigo").css("top", posicaoX + 12)
        $("#inimigo").css("left", posicaoYinimigo)

        if (posicaoX >= window.screen.height - 280) {
            posicaoYinimigo = parseInt(Math.random() * 800)
            $("#inimigo").css("top", 32)
            $("#inimigo").css("left", posicaoYinimigo)
        }

    }
    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("top"))
        $("#inimigo2").css("top", posicaoX + 14)
        $("#inimigo2").css("left", posicaoYinimigo2)

        if (posicaoX >= window.screen.height - 255) {
            posicaoYinimigo2 = parseInt(Math.random() * 800)
            $("#inimigo2").css("top", 32)
            $("#inimigo2").css("left", posicaoYinimigo2)
        }

    }

    function moveRecompensa() {
        posicaoX = parseInt($("#recompensa").css("top"))
        $("#recompensa").css("top", posicaoX + 5)
        $("#recompensa").css("left", posicaoYrecompensa)

        if (posicaoX >= window.screen.height - 245) {
            posicaoYrecompensa = parseInt(Math.random() * 800)
            $("#recompensa").css("top", 32)
            $("#recompensa").css("left", posicaoYrecompensa)
        }

    }
    function moveRecompensa2() {
        posicaoX = parseInt($("#recompensa2").css("top"))
        $("#recompensa2").css("top", posicaoX + 8)
        $("#recompensa2").css("left", posicaoYrecompensa2)

        if (posicaoX >= window.screen.height - 245) {
            posicaoYrecompensa2 = parseInt(Math.random() * 800)
            $("#recompensa2").css("top", 32)
            $("#recompensa2").css("left", posicaoYrecompensa2)
        }

    }

    function movebigRecompensa() {
        posicaoX = parseInt($("#bigRecompensa").css("top"))
        $("#bigRecompensa").css("top", posicaoX + 13)
        $("#bigRecompensa").css("left", posicaoYbigRecompensa)

        if (posicaoX >= window.screen.height - 245) {
            posicaoYbigRecompensa = parseInt(Math.random() * 600)
            $("#bigRecompensa").css("top", 32)
            $("#bigRecompensa").css("left", posicaoYbigRecompensa)
        }

    }

    function disparo() { 
        
        if (podeAtirar) {
            podeAtirar = false
            bottom = parseInt($("#nave").css("bottom"))
            posicao = parseInt($("#nave").css("left"))
            bottomTiro = bottom + 130
            posicaoTiro = posicao + 40
            $("#fundoGame").append("<div id='disparo'></div>")
            $("#disparo").css("bottom", bottomTiro)
            $("#disparo").css("left", posicaoTiro)

            var tempoDisparo = window.setInterval(executaDisparos, 5)
        }


        function executaDisparos() {
            bottom = parseInt($("#disparo").css("bottom"))
            $("#disparo").css("bottom", bottom + 1)
            if (bottom > 500) {
                podeAtirar = true

                $("#disparo").remove()
                window.clearInterval(tempoDisparo)
                tempoDisparo = null
            }
        }

    }

    function colisao() {
        var colisaoNave = ($("#nave").collision($("#inimigo")))
        var colisaoNave2 = ($("#nave").collision($("#inimigo2")))
        var coletaBig = ($("#nave").collision($("#bigRecompensa")))
        var coletaRecompensa = ($("#nave").collision($("#recompensa")))
        var coletaRecompensa2 = ($("#nave").collision($("#recompensa2")))
        var colisaoDisparo = ($("#disparo").collision($("#inimigo")))
        var colisaoDisparo2 = ($("#disparo").collision($("#inimigo2")))

        if (colisaoNave.length > 0) {
            posicaoYinimigo = parseInt(Math.random() * 800)
            $("#inimigo").css("top", 32)
            $("#inimigo").css("left", posicaoYinimigo)

            somExplosãoNave.currentTime = 0
            somExplosãoNave.play()
            
            
            posicaoY = parseInt($("#nave").css("bottom"))
            posicaoX = parseInt($("#nave").css("left"))
            explosao(posicaoY, posicaoX)
            
            vida = vida -1
            if (vida <= 0 ) {
                gameOver()
            }
        }
        if (colisaoNave2.length > 0) {
            posicaoYinimigo2 = parseInt(Math.random() * 800)
            somChoque.currentTime = 0
            somChoque.play()
            $("#inimigo2").css("top", 32)
            $("#inimigo2").css("left", posicaoYinimigo2)
            

            vida = vida -1
            if (vida <= 0 ) {
                gameOver()
            }
            

            

        }
        if (colisaoDisparo.length > 0) {

            
            cacada = cacada + 1 
            somExplosao.currentTime = 0
            somExplosao.play()
            
            
            posicaoY = parseInt($("#inimigo").css("bottom"))
            posicaoX = parseInt($("#inimigo").css("left"))
            explosao(posicaoY, posicaoX)
            
            posicaoYinimigo = parseInt(Math.random() * 800)
            $("#inimigo").css("top", 32)
            $("#inimigo").css("left", posicaoYinimigo)
            if (cacada === 10 ) {
                $("#fundoGame").append("<div id='inimigo2'></div>")
                velocidade = 25
            }

            $("#disparo").remove()
            podeAtirar = true

        }
        if (colisaoDisparo2.length > 0) {

            $("#disparo").remove()
            podeAtirar = true
            
            cacada = cacada + 1 
            somExplosao.currentTime = 0
            somExplosao.play()
            
            
            setTimeout(()=>{
                somExplosao.currentTime = 0
                somExplosao.play()
            },200)


            posicaoY = parseInt($("#inimigo2").css("bottom"))
            posicaoX = parseInt($("#inimigo2").css("left"))
            explosao(posicaoY, posicaoX)

            posicaoYinimigo2 = parseInt(Math.random() * 800)
            $("#inimigo2").css("top", 32)
            $("#inimigo2").css("left", posicaoYinimigo2)

        }
        if (coletaRecompensa.length > 0) {
            somRecompensa.currentTime = 0
            somRecompensa.play()
            coleta = coleta + 1 
            posicaoYrecompensa = parseInt(Math.random() * 800)
            $("#recompensa").css("top", 32)
            $("#recompensa").css("left", posicaoYrecompensa)
        }
        if (coletaBig.length > 0) {
            somBigRecompensa.currentTime = 0
            somBigRecompensa.play()
            coleta = coleta + 2 
            posicaoYbigRecompensa = parseInt(Math.random() * 800)
            $("#bigRecompensa").css("top", 32)
            $("#bigRecompensa").css("left", posicaoYbigRecompensa)

        }
        if (coletaRecompensa2.length > 0) {
            somRecompensa.currentTime = 0
            somRecompensa2.play()           
            coleta = coleta + 1 
            posicaoYrecompensa2 = parseInt(Math.random() * 800)
            $("#recompens2").css("top", 32)
            $("#recompensa2").css("left", posicaoYrecompensa2)
        }

        function explosao(inimigoY, InimigoX) {
            $("#explosao").remove()
            $("#fundoGame").append("<div id='explosao' > </div>")
            var div = $("#explosao")
            div.css("bottom", inimigoY)
            div.css("left", InimigoX)
            div.animate({width: 120, height: 120, opacity:0, }, "slow")
            var tempoExplosao = window.setInterval(removeExplosao, 800)
            function removeExplosao() {
                div.remove()
                window.clearInterval(tempoExplosao)
                tempoExplosao = null
            }
        }
    }
    function placar(){
        $("#placar").html(`<h2>Caçada: ${cacada} Coleta: ${coleta}</h2>`)
    }
    function energia() {
        $("#vida").html(`<h2>${vida}</h2>`)
    }

    function gameOver() {
        

   

        $("#fundoGame").html("<div id='gameOver'></ div>")

        $("#gameOver").html(`<h1>Fim de jogo</h1>
        <p>Caçada: ${cacada}</p> <p>Coleta: ${coleta} <p onClick=reiniciarGame() id='button' >Reiniciar</p>`)
        musica.pause()
        somGameOver.play()
        
        
    }
  }


function reiniciarGame() {
    location.reload()
    
}