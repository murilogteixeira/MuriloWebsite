function galleryFilter(button) {
    var filter = button.value.toUpperCase();
    var cardContainer = document.getElementById("projects");
    var cards = cardContainer.getElementsByClassName("card");
    var title;
    for (var i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body small.plataforma");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].parentNode.style.display = "";
        } else {
            cards[i].parentNode.style.display = "none";
        }
    }

    var filters = document.getElementsByName('filter');
    for(var i = 0; i < filters.length; i++) {
        if(filters[i].classList.contains('btn-success') && filters[i].value != filter) {
            filters[i].classList.remove('btn-success');
            filters[i].classList.add('btn-primary');
        }
    }

    button.classList.remove('btn-primary');
    button.classList.add('btn-success');
}