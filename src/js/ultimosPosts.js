$('document').ready(() => {
    var rawbase = 'https://raw.githubusercontent.com/';
    var jsonloc = 'murilogteixeira/MuriloWebsite/master/blog_publish/ultimosPosts.json';

    $.getJSON(rawbase + jsonloc, function( data ) {
    console.log(data);
    //do what you want with data
    });
});