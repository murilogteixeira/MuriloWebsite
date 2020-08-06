function galleryFilter(filter) {
    filter = filter.toUpperCase();
    var cardContainer = document.getElementById("projects");
    var cards = cardContainer.getElementsByClassName("card");
    var title;
    for (var i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body small.text-muted");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].parentNode.style.display = "";
        } else {
            cards[i].parentNode.style.display = "none";
        }
    }
}