$( document ).ready(function() {
    var cols = $('equal-height').children();
    var heights = cols.map(function() {
        return $(this).height();
    }).get(),

    maxHeight = Math.max.apply(null, heights);

    cols.height(maxHeight);
});