$('#form-contato').submit( () => {
    const method = 'POST';
    const url = 'https://api-murilo.mybluemix.net/send-email';
    const params = new URLSearchParams({
        nome: $('#inputNome').val(),
        email: $('#inputEmail').val(),
        texto: $('#inputText').val()
    }).toString();

    $('#botao-enviar').html('<div class="spinner-border spinner-border-sm mr-1" role="status"></div>Enviando...');

    const callback = (data) => {
        console.log(data);
        if(data.statusOk) {
            showAlert("success", "Obrigado pelo seu contato!", "Sua mensagem foi enviada e retornarei em breve.");
        }
        else {
            showAlert("danger", "Mensagem não enviada!", "Encontramos um problema ao enviar a mensagem. Tente novamente em alguns instantes e se o problema persistir, por favor, encaminhe diretamente para <a href='mailto:contato@murilot.com' class='alert-link'>contato@murilot.com</a>");
        }

        $('#botao-enviar').html('Enviar');
        $('#inputNome').val('');
        $('#inputEmail').val('');
        $('#inputText').val('');
    };
    
    request(method, url, params, callback);
    return false;
})

function showAlert(tipo, titulo, msg) {
    var alertDiv = document.getElementById('alert');

    var alertContent = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            <strong>${titulo}</strong><br>${msg}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `

    alertDiv.innerHTML = alertContent;

    // if(tipo !== 'danger') {
    //     $(".alert").delay(6000).slideUp(200, function() {
    //         $(this).alert('close');
    //     });
    // }
}

function request(method, url, params, callback) {
    var ajax = new XMLHttpRequest();

    if(method === 'POST' || method === 'post') {
        ajax.open(method, url, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);
    }
    else if (method === 'GET' || method === 'get') {
        ajax.open(method, url + '/?' + params, true);
        ajax.send();
    }

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = () => {
    // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
        if (ajax.readyState == 4 && ajax.status == 200) {
            // Retorno do Ajax
            var ajaxReturn = ajax.responseText;
            var data = JSON.parse(ajaxReturn);
            callback(data);
        }
        else if (ajax.readyState == 4 && ajax.status != 200) {
            callback({
                'statusOk': false,
                'msg': 'Mensagem não envidada'
            });
        }
    }
}
