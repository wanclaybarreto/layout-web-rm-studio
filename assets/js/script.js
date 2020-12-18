//Eventos HEADER:
let menu = document.querySelectorAll(".menu li");

menu.forEach((li) => {
    
    li.addEventListener("click", (event) => {
        event.preventDefault();

        document.documentElement.scrollTop = document.querySelector( li.getAttribute("data-link") ).offsetTop - 100;
        
        document.querySelector(".menu li.active").classList.remove("active");

        if(li.getAttribute("data-link") != "inicio") {
            li.classList.add("active");
        }
    });

});

//Evento botão [HOME] FOOTER:
document.querySelector(".voltarHOME a").addEventListener("click", (event) => {
    event.preventDefault();

    document.documentElement.scrollTop = 0;
        
    document.querySelector(".menu li.active").classList.remove("active");
});


//SLIDER:
let slidesArea        = document.querySelector(".slides .slidesArea");
let indSlide          = 0;
let indMaxSlide       = document.querySelectorAll(".slides .slide").length - 1;

document.querySelector(".slides .move .back").style.backgroundColor = "#AAA";

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

//window.onresize = moverSlide;
window.addEventListener("resize", () => {
    if ((indSlide > indMaxSlide - 2 && (window.innerWidth > 1024))) {
        indSlide -= 2;
        moverSlide();
    } else if ((indSlide > indMaxSlide - 1 && (window.innerWidth < 1025 && window.innerWidth > 705))) {
        indSlide--;
        moverSlide();
    } else {
        moverSlide();
    }
});

function moverSlide() {
    let larguraSlide = document.querySelector(".slide").clientWidth + 20; //20 por causa do margin 10 nos lados

    slidesArea.style.marginLeft = `-${ (larguraSlide * indSlide) }px`;

    if ((indSlide > indMaxSlide - 3 && (window.innerWidth > 1024)) ||
        (indSlide > indMaxSlide - 2 && (window.innerWidth < 1025 && window.innerWidth > 705)) ||
        (indSlide > indMaxSlide - 1 && (window.innerWidth < 706))) {
        
            document.querySelector(".slides .move .next").style.backgroundColor = "#AAA";
    } else {
            document.querySelector(".slides .move .next").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }

    if (indSlide < 1) {
        document.querySelector(".slides .move .back").style.backgroundColor = "#AAA";
    } else {
        document.querySelector(".slides .move .back").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }
}



//ANIMAÇÕES:
let elementosAnimateServicos = document.querySelectorAll("[data-animeServicos]");

function animeServicos() {
    //(posição do scroll) + (3/4 da altura da tela do dispositivo em questão):
    let position = window.pageYOffset + ((window.innerHeight * 3) / 4);

    elementosAnimateServicos.forEach((elemento, ind) => {
        if( position > elemento.offsetTop){
            elemento.classList.add("animateLR");
        } else {
            elemento.classList.remove("animateLR");
        }
    });
}

animeServicos();

function animeHeader() {
    if (window.pageYOffset > 50) {
        document.querySelector("header").classList.add("black");
    } else {
        document.querySelector("header").classList.remove("black");
    }


    if(window.pageYOffset + 100 < document.querySelector("#sobreNos").offsetTop) {

        document.querySelectorAll(".menu li")[1].classList.remove("active");
        document.querySelectorAll(".menu li")[2].classList.remove("active");

    } else if (window.pageYOffset + 100 > document.querySelector("#sobreNos").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#servicos").offsetTop) {
        
        document.querySelectorAll(".menu li")[1].classList.add("active");
        document.querySelectorAll(".menu li")[2].classList.remove("active");

    } else if (window.pageYOffset + 100 > document.querySelector("#servicos").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#nossosProjetos").offsetTop) {
        
        document.querySelectorAll(".menu li")[1].classList.remove("active");
        document.querySelectorAll(".menu li")[2].classList.add("active");
        document.querySelectorAll(".menu li")[3].classList.remove("active");

    } else if (window.pageYOffset + 100 > document.querySelector("#nossosProjetos").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#galeria").offsetTop) {

        document.querySelectorAll(".menu li")[2].classList.remove("active");
        document.querySelectorAll(".menu li")[3].classList.add("active");
        document.querySelectorAll(".menu li")[4].classList.remove("active");

    } else if (window.pageYOffset + 100 > document.querySelector("#galeria").offsetTop &&
               window.pageYOffset + 100 < document.querySelector("#contatenos").offsetTop) {

        document.querySelectorAll(".menu li")[2].classList.remove("active");
        document.querySelectorAll(".menu li")[3].classList.remove("active");
        document.querySelectorAll(".menu li")[4].classList.add("active");
        document.querySelectorAll(".menu li")[5].classList.remove("active");

    } else if (window.pageYOffset + 100 > document.querySelector("#contatenos").offsetTop) {

        document.querySelectorAll(".menu li")[2].classList.remove("active");
        document.querySelectorAll(".menu li")[4].classList.remove("active");
        document.querySelectorAll(".menu li")[5].classList.add("active");

    }
}

animeHeader();

window.addEventListener("scroll", () => {
    animeServicos();
    animeHeader();
});

//TODO Implementar debounce no evento scroll.