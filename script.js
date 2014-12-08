$(function() {
    // for reference
    var $window = $(window),
        windowHeight = $window.innerHeight();


    var fullHeight = function() {
        $('.full-height').each(function(idx, el) {
            $(el).css('height', windowHeight + 'px');
        });
    };

    function jumbotronImage() {
        var $jumboImg = $('.main.img'),
            pageDimensions = {
                height: windowHeight,
                width: $window.innerWidth()
            };
        // if with 100% height the image isn't wide enough
        // 16:9 screens
        if(pageDimensions.height * $jumboImg.width() / $jumboImg.height() < pageDimensions.width ) {
            $jumboImg.width(pageDimensions.width);
        } else {
            $jumboImg.height(pageDimensions.height);
        }
    }
    // run the functions
    fullHeight();
    jumbotronImage();

    // add a resize element since these are dependent on window size
    $window.on('resize', function() {
        windowHeight = $window.innerHeight();
        fullHeight();
        jumbotronImage();
    });

    (function() {
        var $animated = [],
            offsets = {},
            $lastSection = null,
            lastScrollIdx = -1;

        // animate in all the elements of a particular section
        function animateInElements($sec) {
            $sec.find('[data-effect]').each(function(i, el) {
                var $el = $(el);
                $el
                    .removeClass('invisible')
                    .addClass('animated ' + $el.data('effect'));
            });
        }

        // go through each element, and prepare them to be animated in.
        $('[data-effect]').each(function(idx, el) {
            var $el = $(el),
                $section = $el.closest('section, .jumbotron');
            $el.addClass('invisible');
            if(!$section.is($lastSection)) {
                // mark down the position of each elements section maybe
                $animated.push($section);
                // maybe just store the top if we don't need anything else
                offsets[$section.attr('id')] = $section.offset().top + $section.height() * .8; // don't start the animation until we're mostly through the page
            }
            $lastSection = $section;
        });

        console.log(offsets);

        setTimeout(function() {
            // on scroll check and see if an element is visible, if so animate it in
            $window.on('scroll', function(evt) {
                $animated = $animated.filter(function($el) {
                    var animatedAlready = false;
                    if(offsets[$el.attr('id')] < $window.scrollTop() + windowHeight) {
                        animateInElements($el);// remove the items so they don't get the effect two fold
                        animatedAlready = true;
                    }
                    return !animatedAlready;
                });
            });

            //fade in the jumbotron and such
            $window.trigger('scroll');
        }, 100);
    }());

});
