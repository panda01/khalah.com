$(function() {
    // for reference
    var $window = $(window),
        windowHeight = $window.innerHeight();

    // make the jumbotron (image and name) take up the whole screen
    var fullHeight = function() {
        $('.full-height').each(function(idx, el) {
            $(el).css('height', windowHeight + 'px');
        });
    };

    // make sure the jumbotron image takes up the whole screen
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

    // add an event so that on window load the loading image is taken back down

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
                $section = $el.closest('section, .jumbotron'),
                offsetTop = $section.offset().top;
            $el.addClass('invisible');
            if(!$section.is($lastSection)) {
                // mark down the position of each elements section maybe
                $animated.push($section);
                // maybe just store the top if we don't need anything else
                offsets[$section.attr('id')] = [offsetTop, offsetTop + $section.height() * .8]; // don't start the animation until we're mostly through the page
            }
            $lastSection = $section;
        });

        // add a resize element since these are dependent on window size
        $window.on({
            resize: function() {
                windowHeight = $window.innerHeight();
                fullHeight();
                jumbotronImage();
            },
            // TODO throttle this in case more speed is needed
            scroll: function(evt) {
                var scrollTop = $window.scrollTop();
                // filter down the animated elements so we don't waste iterations
                $animated = $animated.filter(function($el) {
                    var animatedAlready = false,
                        offset = offsets[$el.attr('id')];
                    if(offset[0] < scrollTop + windowHeight * .5 || offset[1] <= scrollTop + windowHeight) {     // if the top of the section is halfway up the screen OR if the bottom of the section is visible
                        // add the classes to the elements so they animate in properly
                        animateInElements($el);
                        // set a flag so we remove this from the list of things to be animated
                        animatedAlready = true;
                    }
                    return !animatedAlready;
                });
                // stop the scroll event on the window if all of the animations have been done
                if($animated.length === 0) {
                    $window.off('scroll');
                }
            },
            load: function() {
                $("#loading-box").addClass("animated fadeOutUp");

                //fade in the jumbotron and such
                $window.trigger('scroll');
            }
        });
    }());

});
