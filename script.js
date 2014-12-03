$(function() {
    var fullHeight = function() {
        var pageHeight = $(document).innerHeight();
        $('.full-height').each(function(idx, el) {
            $(el).css('height', pageHeight + 'px');
        });
    }();

    function jumbotronImage() {
        var $doc = $(document),
            $jumboImg = $('.main.img'),
            pageDimensions = {
                height: $doc.innerHeight(),
                width: $doc.innerWidth()
            };
        // if with 100% height the image isn't wide enough
        // 16:9 screens
        if(pageDimensions.height * $jumboImg.width() / $jumboImg.height() < pageDimensions.width ) {
            $jumboImg.width(pageDimensions.width);
        } else {
            $jumboImg.height(pageDimensions.height);
        }
    }

    function fadeIn() {
        $('.fade-in').addClass('in');
    }

    jumbotronImage();
    setTimeout(fadeIn, 300);
});
