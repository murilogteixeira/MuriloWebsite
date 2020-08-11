$('document').ready(() => {
    loadContent();
})

function loadContent() {
    // $('#navbar').load('./src/html/navbar.html');
    $('#inicio').load('./src/html/inicio.html');
    $('#sobre').load('./src/html/sobre.html');
    $('#experiencia').load('./src/html/experiencia.html');
    $('#formacao').load('./src/html/formacao.html');
    $('#skills').load('./src/html/skills.html');
    $('#portfolio').load('./src/html/portfolio.html');
    $('#ultimos-posts').load('./src/html/ultimos-posts.html');
    $('#contato').load('./src/html/contato.html');
    $('#modal').load('./src/html/modal.html');
}

// Rolagem suave links internos
$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {

        var target = $(this.hash);

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 50
            }, 700, () => {
                $('.navbar-collapse').collapse('hide');
            });
            return false;
        }

    });
});

// Obter uma cor aleatória
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Configurar cor aleatória
function setRandomColor() {
    $("#colorpad1").css("background-color", getRandomColor());
    $("#colorpad2").css("background-color", getRandomColor());
    $("#colorpad3").css("background-color", getRandomColor());
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
// readTextFile("./src/json/projetos.json", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
// });

