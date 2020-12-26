//** HEADER LOGO/MENU
let menu = document.querySelectorAll(".menu li");

menu.forEach((li) => {
    
    li.addEventListener("click", (event) => {
        event.preventDefault();

        if (window.innerWidth < 932) {
            fecharMenuMobile();
        }

        let posicao = document.querySelector( li.getAttribute("data-link") ).offsetTop - 100;
        rolarScroll(window.pageYOffset, posicao);

        if (document.querySelector(".menu li.active")) {
            document.querySelector(".menu li.active").classList.remove("active");
        }

        if(li.getAttribute("data-link") != "inicio") {
            li.classList.add("active");
        }
    });

});

document.querySelector(".menuMobile").addEventListener("click", () => {
    /*
        Se o elemento "document.querySelectorAll(".menuMobile .menuMobileLine")[1]" estiver com a
        propriedade CSS display contendo o valor "none", significa que o menu mobile está aberto.
    */
    if (document.querySelectorAll(".menuMobile .menuMobileLine")[1].style.display != "none") {
        document.querySelector(".menu ul").style.display         = "flex";
        document.querySelector(".menu ul").style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        document.querySelector("header").style.backgroundColor   = "rgba(0, 0, 0, 0.9)";

        document.querySelectorAll(".menuMobile .menuMobileLine").forEach((lineMenu, i) => {
            if (i == 0) {
                lineMenu.style.transform = "rotate(45deg)";
                lineMenu.style.marginTop = "21px";
            } else if (i == 1) {
                lineMenu.style.display = "none";
            } else {
                lineMenu.style.transform = "rotate(-45deg)";
                lineMenu.style.marginTop = "-21px";
            }
        });
    } else {
        fecharMenuMobile();
    }
});

function fecharMenuMobile() {
    document.querySelector(".menu ul").style.display         = "none";
    document.querySelector(".menu ul").style.backgroundColor = "";
    document.querySelector("header").style.backgroundColor   = "";

    document.querySelectorAll(".menuMobile .menuMobileLine").forEach((lineMenu, i) => {
        if (i == 0) {
            lineMenu.style.transform = "initial";
            lineMenu.style.marginTop = "initial";
        } else if (i == 1) {
            lineMenu.style.display = "initial";
        } else {
            lineMenu.style.transform = "initial";
            lineMenu.style.marginTop = "initial";
        }
    });
}

document.querySelector("body").addEventListener("click", (e) => {
    /*
        Se o elemento "document.querySelectorAll(".menuMobile .menuMobileLine")[1]" estiver com a
        propriedade CSS display contendo o valor "none", significa que o menu mobile está aberto.
    */
    if(!e.target.closest("header") && document.querySelectorAll(".menuMobile .menuMobileLine")[1].style.display == "none") {
        fecharMenuMobile();
    }
});

function desativarMenus() {
    document.querySelectorAll(".menu li").forEach((menu) => {
        menu.classList.remove("active");
    });
}

function animeHeader() {
    if (window.pageYOffset > 50) {
        document.querySelector("header").classList.add("black");
    } else {
        document.querySelector("header").classList.remove("black");
    }

    desativarMenus();

    if (window.pageYOffset + 100 >= document.querySelector("#sobreNos").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#servicos").offsetTop) {
        
        document.querySelectorAll(".menu li")[1].classList.add("active");

    } else if (window.pageYOffset + 100 >= document.querySelector("#servicos").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#nossosProjetos").offsetTop) {
        
        document.querySelectorAll(".menu li")[2].classList.add("active");

    } else if (window.pageYOffset + 100 >= document.querySelector("#nossosProjetos").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#galeria").offsetTop) {

        document.querySelectorAll(".menu li")[3].classList.add("active");

    } else if (window.pageYOffset + 100 >= document.querySelector("#galeria").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#contatenos").offsetTop) {

        document.querySelectorAll(".menu li")[4].classList.add("active");

    } else if (window.pageYOffset + 100 >= document.querySelector("#contatenos").offsetTop) {

        document.querySelectorAll(".menu li")[5].classList.add("active");

    }
}

animeHeader();
//HEADER LOGO/MENU **



//** SLIDER
let slidesArea        = document.querySelector(".slides .slidesArea");
let indSlide          = 0;
let indMaxSlide       = document.querySelectorAll(".slides .slide").length - 1;

document.querySelector(".slides .move .back").style.opacity = "0.2";

function avancarSlide() {
    indSlide++;
    if ((indSlide > indMaxSlide - 2 && (window.innerWidth > 1024)) ||
        (indSlide > indMaxSlide - 1 && (window.innerWidth < 1025 && window.innerWidth > 705)) ||
        (indSlide > indMaxSlide     && (window.innerWidth < 706))) {
        
            indSlide--;
            return;
    }
    moverSlide();
}

function voltarSlide() {
    indSlide--;
    if (indSlide < 0) {
        indSlide++;
        return;
    }
    moverSlide();
}

function moverSlide() {
    let larguraSlide = document.querySelector(".slide").clientWidth + 20; //20 por causa do margin 10 nos lados

    slidesArea.style.marginLeft = `-${ (larguraSlide * indSlide) }px`;

    if ((indSlide > indMaxSlide - 3 && (window.innerWidth > 1024)) ||
        (indSlide > indMaxSlide - 2 && (window.innerWidth < 1025 && window.innerWidth > 705)) ||
        (indSlide > indMaxSlide - 1 && (window.innerWidth < 706))) {
        
            document.querySelector(".slides .move .next").style.opacity = "0.2";
    } else {
            document.querySelector(".slides .move .next").style.opacity = "1";
    }

    if (indSlide < 1) {
        document.querySelector(".slides .move .back").style.opacity = "0.2";
    } else {
        document.querySelector(".slides .move .back").style.opacity = "1";
    }
}
//SLIDER **



//** GALERIA
let imgsGaleria = [];
let indImgsGaleria;

document.querySelectorAll(".galeria > div > img").forEach((element) => {
    imgsGaleria.push(element.src);
});

document.querySelectorAll(".galeria .ampliarFoto").forEach ((element) => {
    element.addEventListener("click", (event) => {
        indImgsGaleria = imgsGaleria.indexOf( event.target.closest(".foto").querySelector(".foto > img").src );

        document.querySelector(".galeriaAmpliada .fotoExibida").src = imgsGaleria[indImgsGaleria];

        document.querySelector(".galeriaAmpliada").style.display = "flex";
    });
});

function avancarFoto() {
    indImgsGaleria++;
    if (indImgsGaleria > imgsGaleria.length - 1) {
        indImgsGaleria = 0;
    }
    document.querySelector(".galeriaAmpliada .fotoExibida").src = imgsGaleria[indImgsGaleria];
}

function voltarFoto() {
    indImgsGaleria--;
    if (indImgsGaleria < 0) {
        indImgsGaleria = imgsGaleria.length - 1;
    }
    document.querySelector(".galeriaAmpliada .fotoExibida").src = imgsGaleria[indImgsGaleria];
}

function fecharFoto() {
    document.querySelector(".galeriaAmpliada").style.display = "none";
}

document.querySelector(".galeriaAmpliada .avancar").addEventListener("click", () => {
    avancarFoto();
});

document.querySelector(".galeriaAmpliada .voltar").addEventListener("click", () => {
    voltarFoto();
});

document.querySelector(".galeriaAmpliada .fechar").addEventListener("click", () => {
    fecharFoto()
});

document.addEventListener("keyup", (event) => {
    if (document.querySelector(".galeriaAmpliada").style.display == "flex") {

        if(event.key == "ArrowLeft") {
            voltarFoto();
        } else if (event.key == "ArrowRight") {
            avancarFoto();
        } else if (event.key == "Escape") {
            fecharFoto();
        }

    }
});
//GALERIA **



//** FOOTER COPYRIGHT
document.querySelector(".voltarHOME a").addEventListener("click", (event) => {
    event.preventDefault();

    rolarScroll(window.pageYOffset, 0);
        
    document.querySelector(".menu li.active").classList.remove("active");
});
//FOOTER COPYRIGHT **



//** GERAL
let elementosAnimateServicos = document.querySelectorAll("[data-animeLR]");

function animeServicos() {
    //(posição do scroll) + (3/4 da altura da tela do dispositivo em questão):
    let position = window.pageYOffset + ((window.innerHeight * 3) / 4);

    elementosAnimateServicos.forEach((elemento, ind) => {
        if( position > elemento.offsetTop){
            elemento.classList.add("animateLR");
        }
        /* //DESFAZ A ANIMAÇÃO PARA QUE ELE ACONTEÇA DE NOVO
        else {
            elemento.classList.remove("animateLR");
        }
        */
    });
}

animeServicos();


function rolarScroll (posicaoIN, posicaoFIN) {

    let atrasoDescer = posicaoIN + 100;
    let atrasoSubir  = posicaoIN - 100;

    if (posicaoIN > posicaoFIN) {

        let rolar = setInterval(() => {

            if (posicaoIN < (posicaoFIN + 25)) {
                posicaoIN--;
            } else if (posicaoIN > atrasoSubir) {
                posicaoIN -= 2;
            } else {
                posicaoIN -= 25;
            }
            
            if (posicaoIN >= posicaoFIN) {
                window.scroll(0, posicaoIN);
            } else {
                clearInterval(rolar);
            }
        }, 1);

    } else {

        let rolar = setInterval(() => {
            
            if (posicaoIN > (posicaoFIN - 25)) {
                posicaoIN++;
            } else if (posicaoIN < atrasoDescer) {
                posicaoIN += 2;
            } else {
                posicaoIN += 25;
            }
            
            if (posicaoIN <= posicaoFIN) {
                window.scroll(0, posicaoIN);
            } else {
                clearInterval(rolar);
            }
        }, 1);

    }
}

rolarScroll(0, 0);


function efeitoParallax() {
    document.querySelectorAll(".parallax").forEach((elemento, ind) => {
        if (window.pageYOffset <= elemento.offsetTop + elemento.clientHeight &&
            window.pageYOffset >= elemento.offsetTop - elemento.clientHeight) {

            let bg_pos = 0;

            bg_pos = ( window.pageYOffset - elemento.offsetTop ) / 4;
                        
            elemento.style.backgroundPosition = "center calc(50% - " +bg_pos+ "px)";

            //Efeito ZOOM (PRIMEIRO ELEMENTO - BANNER):
            if (ind == 0) {
                if ((window.innerWidth >= 1920 && window.innerHeight < 1280) ||
                    (window.innerWidth >= 1280 && window.innerHeight < 850)) {

                    elemento.style.backgroundSize = (bg_pos + 100) + "%";

                } else if ((window.innerWidth >= 1024 && window.innerHeight < 769) ||
                        (window.innerWidth >= 720  && window.innerHeight < 601)) {
                    
                    elemento.style.backgroundSize = (bg_pos + 115) + "%";

                } else if ((window.innerWidth == 1024  && window.innerHeight < 1367)) {

                    elemento.style.backgroundSize = (bg_pos + 200) + "%";

                } else if ((window.innerWidth == 768  && window.innerHeight < 1025)) {

                    elemento.style.backgroundSize = (bg_pos + 200) + "%";

                } else if ((window.innerWidth >= 300 && window.innerHeight < 850)) {
                    
                    elemento.style.backgroundSize = (bg_pos + 325) + "%";

                }
                else {
                    elemento.style.backgroundSize = "cover";
                }
            }
        }
    });
}

efeitoParallax();
//GERAL **



//Evento de rolagem do scroll
window.addEventListener("scroll", () => {
    animeServicos();
    animeHeader();
    efeitoParallax();
});

//Evento de redimensionamento da janela
window.addEventListener("resize", () => {
    //Slider:
    if ((indSlide > indMaxSlide - 2 && (window.innerWidth > 1024))) {
        indSlide -= 2;
        moverSlide();
    } else if ((indSlide > indMaxSlide - 1 && (window.innerWidth < 1025 && window.innerWidth > 705))) {
        indSlide--;
        moverSlide();
    } else {
        moverSlide();
    }

    //Menu:
    if (window.innerWidth > 932) {
        fecharMenuMobile();
        document.querySelector(".menu ul").style.display = "flex";
    } else {
        fecharMenuMobile();
    }

    //Efeito ZOOM (PARALLAX - PRIEMIRO ELEMENTO, BANNER):
    document.querySelector(".parallax").style.backgroundSize = "cover";
});