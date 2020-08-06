$('document').ready(() => {
    setRandomColor();
    setDateExperience();
})

// Rolagem suave links internos
$('a[href*=\\#]:not([href$=\\#])').click(function() {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 50
    }, 500, () => {
        $('.navbar-collapse').collapse('hide');
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



