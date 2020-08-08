var projetos = [];

var persist = {
    nome: 'Persist',
    plataforma: 'iOS',
    descricao: '',
    downloadOn: 'AppStore',
    linkDownload: 'https://apple.co/328NsLC',
    linkImg: 'https://github.com/murilogteixeira/MuriloWebsite/blob/master/imagens/persist.png?raw=true'
}

var reformise = {
    nome: 'Reformise',
    plataforma: 'iOS',
    descricao: '',
    downloadOn: 'AppStore',
    linkDownload: 'https://apple.co/2VCWZZ2',
    linkImg: 'https://github.com/murilogteixeira/MuriloWebsite/blob/master/imagens/reformise.png?raw=true'
}

var amazeingFood = {
    nome: 'Amazeing Food',
    plataforma: 'tvOS',
    descricao: '',
    downloadOn: 'AppStore',
    linkDownload: 'https://apple.co/32fpsav',
    linkImg: 'https://github.com/murilogteixeira/MuriloWebsite/blob/master/imagens/amazeing-food.png?raw=true'
}

var pommo = {
    nome: 'Pommo',
    plataforma: 'iOS',
    descricao: '',
    downloadOn: 'AppStore',
    linkDownload: 'https://apple.co/2zAN4MK',
    linkImg: 'https://github.com/murilogteixeira/MuriloWebsite/blob/master/imagens/pommo.png?raw=true'
}

var lummos = {
    nome: 'Lummos',
    plataforma: 'watchOS',
    descricao: '',
    downloadOn: 'AppStore',
    linkDownload: 'https://apple.co/33Jnthg',
    linkImg: 'https://github.com/murilogteixeira/MuriloWebsite/blob/master/imagens/lummos.png?raw=true'
}

var pixelGame = {
    nome: 'PixelGame',
    plataforma: 'macOS',
    descricao: '',
    downloadOn: 'GitHub',
    linkDownload: 'https://bit.ly/3gE4vwm',
    linkImg: 'https://picsum.photos/460'
}

projetos.push(persist, reformise, amazeingFood, pommo, lummos, pixelGame);

$('document').ready(() => {
    var html = '';

    for(var i = 0; i < projetos.length; i++) {
        html += `
        <div class="col-12 p-3">
            <div class="card bg-custom h-100">
            <button type="button" class="btn-transparent" data-toggle="modal" data-target="#modalGaleria" data-whatever="${i}">
                <img class="card-img-top" src="${projetos[i].linkImg}" alt="Imagem do projeto ${projetos[i].nome}">
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

$('#modalGaleria').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var i = button.data('whatever') // Extract info from data-* attributes

    var modal = $(this)
    modal.find('.modal-title').text(projetos[i].nome)
    // modal.find('.modal-body input').val(projetos[i].nome)
    modal.find('#projectLink').attr('href', projetos[i].linkDownload);
    modal.find('#download-text').text(projetos[i].downloadOn);
    modal.find('#download-icon').html(projetos[i].downloadOn === 'AppStore' ? '<i class="fab fa-app-store"></i>' : '<i class="fab fa-github"></i>');
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