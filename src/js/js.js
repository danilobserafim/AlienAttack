function start() {
    $("#inicio").css("display", "none")

    $("#game").append("<div id='placar' > </div>")
    $("#game").append("<div id='vida' > </div>")

    $("#game").append("<div id='nave' > </div>")
    $("#game").append("<div id='inimigo' > </div>")

    $("#game").append("<div id='recompensa' > </div>")
    $("#game").append("<div id='recompensa2' > </div>")
    $("#game").append("<div id='bigRecompensa' ></div>")



    var cacada = 0
    var coleta = 0
    var vida = 3
    
    var velocidade = 30
    var podeAtirar = true

    var posicaoYinimigo = parseInt(Math.random() * 1000)
    var posicaoYinimigo2 = parseInt(Math.random() * 1000)
    var posicaoYrecompensa = parseInt(Math.random() * 1000)
    var posicaoYrecompensa2 = parseInt(Math.random() * 1000)
    var posicaoYbigRecompensa = parseInt(Math.random() * 1000)



    var musica = document.getElementById("music")
    var somExplosao = document.getElementById("somExplosao")
    var somChoque = document.getElementById("somChoque")
    var somRecompensa = document.getElementById("somRecompensa")
    var somRecompensa2 = document.getElementById("somRecompensa2")
    var somBigRecompensa = document.getElementById("somBigRecompensa")
    var somGameOver = document.getElementById("somGameOver")
    
    musica.currentTime = 0
    musica.play()


    //Principais variaveis do jogo

    var jogo = {}
    jogo.pressionou = [];
    var tecla = {
        A: 65,
        D: 68,
        W: 87,
        left: 37,
        top: 38,
        right: 39

    }
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
        moveFundo()
        moveNave()
        moveInimigo()
        moveInimigo2()
        moveRecompensa()
        moveRecompensa2()
        movebigRecompensa()
        colisao()
        placar()
        energia()
    }

    function moveFundo() {
        let front = parseInt($("#fundoGame").css("background-position-y"))
        $("#fundoGame").css("background-position-y", front + 10)

        let back = parseInt($("#fundogame2").css("background-position-y"))
        $("#fundogame2").css("background-position-y", back + 3)
    }

    function moveInimigo() {
        let posicaoX = parseInt($("#inimigo").css("top"))
        $("#inimigo").css("top", posicaoX + 12)
        $("#inimigo").css("left", posicaoYinimigo)

        if (posicaoX >= window.screen.height - 260) {
            posicaoYinimigo = parseInt(Math.random() * 1000)
            $("#inimigo").css("top", 32)
            $("#inimigo").css("left", posicaoYinimigo)
        }

    }
    function moveInimigo2() {
        let posicaoX = parseInt($("#inimigo2").css("top"))
        $("#inimigo2").css("top", posicaoX + 14)
        $("#inimigo2").css("left", posicaoYinimigo2)

        if (posicaoX >= window.screen.height - 255) {
            posicaoYinimigo2 = parseInt(Math.random() * 1000)
            $("#inimigo2").css("top", 32)
            $("#inimigo2").css("left", posicaoYinimigo2)
        }

    }

    function moveRecompensa() {
        let posicaoX = parseInt($("#recompensa").css("top"))
        $("#recompensa").css("top", posicaoX + 5)
        $("#recompensa").css("left", posicaoYrecompensa)

        if (posicaoX >= window.screen.height - 245) {
            posicaoYrecompensa = parseInt(Math.random() * 1000)
            $("#recompensa").css("top", 32)
            $("#recompensa").css("left", posicaoYrecompensa)
        }

    }
    function moveRecompensa2() {
        let posicaoX = parseInt($("#recompensa2").css("top"))
        $("#recompensa2").css("top", posicaoX + 8)
        $("#recompensa2").css("left", posicaoYrecompensa2)

        if (posicaoX >= window.screen.height - 245) {
            posicaoYrecompensa2 = parseInt(Math.random() * 1000)
            $("#recompensa2").css("top", 32)
            $("#recompensa2").css("left", posicaoYrecompensa2)
        }

    }

    function movebigRecompensa() {
        let posicaoX = parseInt($("#bigRecompensa").css("top"))
        $("#bigRecompensa").css("top", posicaoX + 13)
        $("#bigRecompensa").css("left", posicaoYbigRecompensa)

        if (posicaoX >= window.screen.height - 245) {
            posicaoYbigRecompensa = parseInt(Math.random() * 600)
            $("#bigRecompensa").css("top", 32)
            $("#bigRecompensa").css("left", posicaoYbigRecompensa)
        }

    }

    function disparo() { 
        if (podeAtirar === true) {
            podeAtirar = false

            let left = parseInt($("#nave").css("left"))
            let bottom = parseInt($("#nave").css("bottom"))

            $("#fundoGame").append("<div id='disparo' ></ div>")
            $("#disparo").css("left", left + 45)
            $("#disparo").css("bottom", bottom + 130)

            var tempoDisparo = window.setInterval(executaDisparos, 25)
        }

        function executaDisparos() {
            let posicaoX = parseInt($("#disparo").css("bottom"))
            $("#disparo").css("bottom", posicaoX + 5)

            if (posicaoX >= window.screen.height - 130) {
                $("#disparo").remove();
                podeAtirar = true
                
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
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
            posicaoYinimigo = parseInt(Math.random() * 1000)
            $("#inimigo").css("top", 32)
            $("#inimigo").css("left", posicaoYinimigo)
            $("#nave").css("background", "url(../../assets/naveDown.png)")
            $("#nave").css("background-size", "100%")
            somChoque.play()

            vida = vida -1
            if (vida <= 0 ) {
                gameOver()
            }
        }
        if (colisaoNave2.length > 0) {
            posicaoYinimigo2 = parseInt(Math.random() * 1000)
            $("#inimigo2").css("top", 32)
            $("#inimigo2").css("left", posicaoYinimigo2)
            $("#nave").css("background", "url(../../assets/naveDown.png)")
            $("#nave").css("background-size", "100%")
            

            somChoque.play()
            vida = vida -1
            if (vida <= 0 ) {
                gameOver()
            }
            

            

        }
        if (colisaoDisparo.length > 0) {
            cacada = cacada + 1 
            podeAtirar = true
            somExplosao.currentTime = 0
            somExplosao.play()
            $("#disparo").remove()

            posicaoY = parseInt($("#inimigo").css("bottom"))
            posicaoX = parseInt($("#inimigo").css("left"))
            explosao(posicaoY, posicaoX)
            
            posicaoYinimigo = parseInt(Math.random() * 1000)
            $("#inimigo").css("top", 32)
            $("#inimigo").css("left", posicaoYinimigo)
            
            if (cacada === 10) {
                velocidade == 50
                $("#game").append("<div id='inimigo2' > </div>")
            }

        }
        if (colisaoDisparo2.length > 0) {
            cacada = cacada + 2 
            $("#disparo").remove()

            posicaoY = parseInt($("#inimigo2").css("bottom"))
            posicaoX = parseInt($("#inimigo2").css("left"))
            posicaoYinimigo2 = parseInt(Math.random() * 1000)
            $("#inimigo2").css("top", 32)
            explosao(posicaoY, posicaoX)
            $("#inimigo2").css("left", posicaoYinimigo2)
            somExplosao.currentTime = 0
            somExplosao.play()

            podeAtirar = true

        }
        if (coletaRecompensa.length > 0) {
            coleta = coleta + 1 
            posicaoYrecompensa = parseInt(Math.random() * 1000)
            $("#recompensa").css("top", 32)
            $("#recompensa").css("left", posicaoYrecompensa)
            somRecompensa.currentTime = 0
            somRecompensa.play()
        }
        if (coletaBig.length > 0) {
            posicaoYbigRecompensa = parseInt(Math.random() * 1000)
            $("#bigRecompensa").css("top", 32)
            $("#bigRecompensa").css("left", posicaoYbigRecompensa)
            somBigRecompensa.currentTime = 0
            somBigRecompensa.play()
            coleta = coleta + 2 

        }
        if (coletaRecompensa2.length > 0) {
            posicaoYrecompensa2 = parseInt(Math.random() * 1000)
            $("#recompens2").css("top", 32)
            $("#recompensa2").css("left", posicaoYrecompensa2)
            somRecompensa.currentTime = 0
            somRecompensa2.play()           
            coleta = coleta + 1 
        }

        function explosao(inimigoY, InimigoX) {
            $("#explosao").remove()
            $("#fundoGame").append("<div id='explosao' > </div>")
            var div = $("#explosao")
            div.css("bottom", inimigoY)
            div.css("left", InimigoX)
            div.animate({width: 120, height: 120, opacity:0, }, "slow")
            var tempoExplosao = window.setInterval(removeExplosao, 1000)
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
        musica.pause()
        somGameOver.currentTime = 0
        somGameOver.play()

        
        $("#nave").remove()
        $("#inimigo").remove()
        $("#inimigo2").remove()
        $("#recompensa").remove()
        $("#recompensa2").remove()
        $("#bigRecompensa").remove()
        $("#disparo").remove()
        $("#placar").remove()
        $("#vida").remove()
        

        $("#fundoGame").append("<div id='gameOver'></ div>")

        $("#gameOver").html(`<h1>Fim de jogo</h1>
        <p>Caçada: ${cacada}</p> <p>Coleta: ${coleta} <p onClick='reiniciarGame()' id='button' >Reiniciar</p>`)

    }
  }


function reiniciarGame() {

    somGameOver.pause()
    $("#gameOver").remove()
    start()    
    
}