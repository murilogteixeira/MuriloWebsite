$('document').ready(() => {
    var rawbase = 'https://blog.murilot.com/';
    var jsonloc = 'ultimosPosts.json';

    $.getJSON(rawbase + jsonloc, function( posts ) {
    // console.log(data);
    // var projetos = JSON.parse(data);

        var html = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">';
    
        for(var i = 0; i < posts.length; i++) {
            html += `
            <div class="col p-3">
                <div class="card bg-custom h-100 col-8 col-sm-12 p-0 m-0 mx-auto">
                <a href="${posts[i].path}" target="blank" class="zoom">
                    <img class="card-img-top rounded" src="${posts[i].img}" alt="Imagem do post ${posts[i].img}">
                    <div class="card-body">
                        <h5 class="card-title">${posts[i].titulo}</h5>
                    </div>
                    <div class="card-footer py-1">
                        <small class="texto-cinza plataforma">${posts[i].data}</small>
                    </div>
                </a>
                </div>
            </div>
            `;
        }
        
        html += '</div>'
        document.getElementById('posts').innerHTML = html;
    });
});