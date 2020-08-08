$('document').ready(() => {
    var html = '';

    for(var i = 0; i < projetos.length; i++) {
        html += `
        <div class="col-12 p-3">
            <div class="card bg-custom h-100">
            <button type="button" class="btn-transparent" data-toggle="modal" data-target="#modalGaleria" data-whatever="${i}">
                <img class="card-img-top rounded" src="${projetos[i].linkImg}" alt="Imagem do projeto ${projetos[i].nome}">
                <div class="card-body">
                    <h5 class="card-title">${projetos[i].nome}</h5>
                </div>
                <div class="card-footer py-1">
                    <small class="texto-cinza plataforma">${projetos[i].plataforma}</small>
                </div>
            </button>
            </div>
        </div>
        `;
    }

    document.getElementById('projects').innerHTML = html;
})

  function galleryFilter(button) {
    var filter = button.value.toUpperCase();
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

    var filters = document.getElementsByName('filter');
    for(var i = 0; i < filters.length; i++) {
        if(filters[i].classList.contains('active') && filters[i].value != filter) {
            filters[i].classList.remove('active');
        }
    }

    button.classList.add('active');
}