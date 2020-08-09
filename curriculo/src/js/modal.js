$('#modalGaleria').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var i = button.data('whatever') // Extract info from data-* attributes
    var modal = $(this)

    readTextFile("./src/json/projetos.json", function(text){
        var data = JSON.parse(text);
        var data = data[i];

        modal.find('#appImg').attr('src', data.linkImg);
        
        modal.find('#appName').text(data.nome)
        modal.find('#appDate').text(data.data)
        modal.find('#appPlatform').text(data.plataforma)
        
        modal.find('#appDescription').text(data.descricao)
    
        modal.find('#projectLink').attr('href', data.linkDownload);
        modal.find('#download-text').text(data.downloadOn);
        modal.find('#download-icon').html(data.downloadOn === 'AppStore' ? '<i class="fab fa-app-store"></i>' : '<i class="fab fa-github"></i>');
    });

})