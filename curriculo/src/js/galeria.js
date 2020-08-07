var projetos = [];

var persist = {
    nome: 'Persist',
    plataforma: 'iOS',
    descricao: '',
    linkDownload: 'https://apple.co/328NsLC',
    linkImg: 'https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/d6/17/ab/d617ab77-4ac3-8e74-0ecf-b556bc7b2543/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.png'
}

var reformise = {
    nome: 'Reformise',
    plataforma: 'iOS',
    descricao: '',
    linkDownload: 'https://apple.co/2VCWZZ2',
    linkImg: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/e0/e9/01/e0e9010e-cb34-19ca-93b9-0603a9a1029f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.jpeg/460x0w.jpg'
}

var amazeingFood = {
    nome: 'Amazeing Food',
    plataforma: 'tvOS',
    descricao: '',
    linkDownload: 'https://apple.co/32fpsav',
    linkImg: 'https://is3-ssl.mzstatic.com/image/thumb/Purple113/v4/55/3a/ec/553aecca-a990-1f27-b252-8a061e663efb/App_Icon-marketing.lsr/626x0w.jpg'
}

var pommo = {
    nome: 'Pommo',
    plataforma: 'iOS',
    descricao: '',
    linkDownload: 'https://apple.co/2zAN4MK',
    linkImg: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/ed/55/59/ed5559cd-a5ce-6663-8e54-9c07e3ead00b/AppIcon-0-1x_U007emarketing-0-5-0-85-220.png/460x0w.png'
}

var lummos = {
    nome: 'Lummos',
    plataforma: 'watchOS',
    descricao: '',
    linkDownload: 'https://apple.co/33Jnthg',
    linkImg: 'https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/eb/c8/7f/ebc87fce-ad4a-f2d4-7ed6-36615d50614c/AppIcon-1x_U007emarketing-0-9-85-220.png/460x0w.png'
}

var pixelGame = {
    nome: 'PixelGame',
    plataforma: 'macOS',
    descricao: '',
    linkDownload: 'https://bit.ly/3gE4vwm',
    linkImg: 'https://picsum.photos/400'
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
    var index = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(projetos[index].nome)
    modal.find('.modal-body input').val(projetos[index].nome)
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