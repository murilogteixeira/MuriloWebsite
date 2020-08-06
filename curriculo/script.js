$('document').ready(() => {
    setRandomColor();
    setDateExperience();
    colorSchemeListener();
})

// Rolagem suave links internos
$('a[href*=\\#]:not([href$=\\#])').click(function() {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 50
    }, 500, () => {
        $('.navbar-collapse').collapse('hide');
    });
});

// Esconder menu ao clicar em um link
// $('.navbar-nav>li>a').on('click', function(){
//     $('.navbar-collapse').collapse('hide');
// });

// $('.navbar-brand').on('click', function(){
//     $('.navbar-collapse').collapse('hide');
// });

// Obter uma cor aleatória
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Configurar cor aleatória
function setRandomColor() {
    $("#colorpad1").css("background-color", getRandomColor());
    $("#colorpad2").css("background-color", getRandomColor());
    $("#colorpad3").css("background-color", getRandomColor());
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

function colorSchemeListener() {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if(userPrefersDark){
        activateDarkMode();
    }
    else if(userPrefersLight) {
        activateLightMode();
    }

    window.matchMedia("(prefers-color-scheme: dark)").addListener( (e) => { 
        e.matches ? activateDarkMode() : activateLightMode();
    });
}

function activateDarkMode() {
    document.getElementById('navbar').classList.remove('navbar-light');
    document.getElementById('navbar').classList.add('navbar-dark');
}

function activateLightMode() {
    document.getElementById('navbar').classList.remove('navbar-dark');
    document.getElementById('navbar').classList.add('navbar-light');
}

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

    if(tipo !== 'danger') {
        $(".alert").delay(6000).slideUp(200, function() {
            $(this).alert('close');
        });
    }
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

