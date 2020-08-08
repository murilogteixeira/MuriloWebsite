$('#modalGaleria').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var i = button.data('whatever') // Extract info from data-* attributes

    var modal = $(this)
    modal.find('#appImg').attr('src', projetos[i].linkImg);
    
    modal.find('#appName').text(projetos[i].nome)
    modal.find('#appDate').text(projetos[i].data)
    modal.find('#appPlatform').text(projetos[i].plataforma)
    modal.find('#appDescription').text(projetos[i].descricao)

    modal.find('#projectLink').attr('href', projetos[i].linkDownload);
    modal.find('#download-text').text(projetos[i].downloadOn);
    modal.find('#download-icon').html(projetos[i].downloadOn === 'AppStore' ? '<i class="fab fa-app-store"></i>' : '<i class="fab fa-github"></i>');
})