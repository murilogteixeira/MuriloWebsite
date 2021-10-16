$('#form-contato').submit(() => {
    const method = 'POST';
    // const url = 'https://api-murilo.mybluemix.net/send-email';
    // const url = 'http://localhost:8080/send-email';
    const url = 'https://murilot-vapor-api.herokuapp.com/send-email';
    const json = {
        name: $('#inputNome').val(),
        email: $('#inputEmail').val(),
        message: $('#inputText').val()
    };

    $('#botao-enviar').html('<div class="spinner-border spinner-border-sm mr-1" role="status"></div>Enviando...');

    const callback = (data) => {
        if (data.error === false) {
            showAlert("success", "Obrigado por deixar a sua mensagem!", "A mensagem foi enviada e em breve entrarei em contato através do email informado.");
        }
        else {
            showAlert("danger", "Mensagem não enviada!", "Encontramos um problema ao enviar a mensagem. Tente novamente em alguns instantes e se o problema persistir, por favor, encaminhe diretamente para <a href='mailto:contato@murilot.com' class='alert-link'>contato@murilot.com</a>");
        }

        $('#botao-enviar').html('Enviar');
        $('#inputNome').val('');
        $('#inputEmail').val('');
        $('#inputText').val('');
    };

    request(method, url, json, callback);
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
    `;

    alertDiv.innerHTML = alertContent;

    // if(tipo !== 'danger') {
    //     $(".alert").delay(6000).slideUp(200, function() {
    //         $(this).alert('close');
    //     });
    // }
    $(".alert").delay(6000).slideUp(200, function () {
        $(this).alert('close');
    });
}

function request(method, url, json, callback) {
    var ajax = new XMLHttpRequest();
    var data;

    if (method === 'POST' || method === 'post') {
        ajax.open(method, url, true);
        ajax.setRequestHeader("Content-type", "application/json");
        data = JSON.stringify(json);
        ajax.send(data);
    }
    else if (method === 'GET' || method === 'get') {
        data = URLSearchParams(json).toString()
        ajax.open(method, url + '/?' + data, true);
        ajax.send();
    }
    
    console.log(`Request (${method}), Data: ${data}`);

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = () => {
        // Retorno do Ajax
        var ajaxReturn = ajax.responseText;
        var data = JSON.parse(ajaxReturn);
        callback(data);
        console.log(data);

    }
}
