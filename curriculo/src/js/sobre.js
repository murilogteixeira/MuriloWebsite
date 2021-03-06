$('document').ready(() => {
    setDateExperience();
})
window.onload = () => {
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