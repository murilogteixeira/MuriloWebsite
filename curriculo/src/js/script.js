$('document').ready(() => {
    loadContent();
    setDateExperience();
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

// Diferença de meses entre datas
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    return months <= 0 ? 0 : months;
}

// Anos e meses de diferença
function yearAndMonthDiff(totalMonths) {
    var years = Math.floor(totalMonths / 12);

    var months = totalMonths - (years * 12);

    return `${years} anos e ${months} meses`;
}

// Adicionar texto dee tempo de expeerriência
function setDateExperience() {
    var mes = monthDiff(new Date(2019, 0, 0), new Date());
    var tempoExperiencia = yearAndMonthDiff(mes);
    $('#tempoExperiencia').text(tempoExperiencia);
}



