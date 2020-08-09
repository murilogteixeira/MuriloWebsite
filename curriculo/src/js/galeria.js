$('document').ready(() => {

    readTextFile("./src/json/projetos.json", function(text){
        var projetos = JSON.parse(text);

        var html = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">';
    
        for(var i = 0; i < projetos.length; i++) {
            html += `
            <div class="col p-3">
                <div class="card bg-custom h-100 col-8 col-sm-12 p-0 m-0 mx-auto">
                <button type="button" class="btn-transparent" data-toggle="modal" data-target="#modalGaleria" data-whatever="${i}">
                    <img class="card-img-top rounded" src="${projetos[i].linkImg}" alt="Imagem do projeto ${projetos[i].nome}">
                    <div class="card-body">
                        <h5 class="card-title fonte">${projetos[i].nome}</h5>
                    </div>
                    <div class="card-footer py-1">
                        <small class="texto-cinza plataforma">${projetos[i].plataforma}</small>
                    </div>
                </button>
                </div>
            </div>
            `;
        }
        html += '</div>'
        document.getElementById('projects').innerHTML = html;
    });
})

$('.filter').click(function () {
    var filter = $(this).text();
    $('.filterButton').text(filter);
    $('.dropdown .dropdown-toggle').dropdown('toggle');
    galleryFilter(filter == 'Tudo' ? '' : filter);
    return false;
})

  function galleryFilter(filter) {
    var filter = filter.toUpperCase();
    var cardContainer = document.getElementById("projects");
    var cards = cardContainer.getElementsByClassName("card");
    var title;
    for (var i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-footer small.plataforma");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].parentNode.style.display = "";
        } else {
            cards[i].parentNode.style.display = "none";
        }
    }
}