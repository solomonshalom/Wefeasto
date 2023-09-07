$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

var player 					  = document.getElementById('player');
var playlistThumb 		= document.getElementById('playlistThumb');

var apiUrl 			= 'https://www.googleapis.com/youtube/v3/playlistItems';
var apiKey	 		= 'AIzaSyCiKn-vfXkIJAdp64jumGhM2Ypjxib7kCs';
var playlistId 	= 'PL9HrwmU6gBjNPcei2oKPZgI9bU57EvFQU';

getPlaylistData(playlistId, apiUrl, apiKey);

// Makes a single request to Youtube Data API
function getPlaylistData(playlistId, apiUrl, apiKey) {  
  var options = {
    part: "snippet",
    playlistId: playlistId,
    key: apiKey,
    maxResults: 25
  };
  var defautVideoIndex = 0;
  
  $.getJSON(apiUrl, options, function(response) {
    var item = response.items[defautVideoIndex];
    var medium = item.snippet.thumbnails.medium;
    var videoId = item.snippet.resourceId.videoId;
    
    player.innerHTML = '<iframe id="iframe-player" data-id="' + videoId + '" width="100%" height="100%" src="//www.youtube.com/embed/' + videoId + '?rel=0;enablejsapi=1&version=3&playerapiid=ytplayer1" frameborder="0" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>';
    
    for (var i = 0; i < response.items.length; i++) {
          item = response.items[i];
          medium = item.snippet.thumbnails.medium;
          videoId = item.snippet.resourceId.videoId;
    	$(playlistThumb).append(
      	'<li id="video-icon" data-vid="'+ videoId +'"><img src="'+ medium.url +'" width="'+ medium.width +'" height="'+ medium.height +'" />'+
          '<button id="promo-button" class="ytp-large-play-button ytp-button" aria-label="Play">'+
						'<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">'+
              '<path class="ytp-md-pay-btn" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path>'+
              '<path d="M 43,24 30,17 30,31" fill="#FFF"></path>'+
        		'</svg>'+
         	'</button>'+
         '</li>'
       );
    }
    $(document).on('click', '[data-vid]', function() {
        
 		   	videoId = this.dataset.vid;
        if (!videoId) return;
        var iframe = document.getElementById('iframe-player');
        if (!iframe) return;
        if (iframe.dataset.id === videoId) return;
         player.innerHTML = '<iframe id="iframe-player" data-id="' + videoId + '" width="100%" height="100%" onload="playYtpVideo()" src="https://www.youtube.com/embed/' + videoId + '?rel=0;enablejsapi=1&version=3&playerapiid=ytplayer1" frameborder="0" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>';
        $(player).append('<div class="save_spinner"></div>');
    });

	});
}


function playYtpVideo() {
  var iframe = document.getElementById('iframe-player');
  var spinner = document.querySelector('.save_spinner');
  spinner.remove();
  iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DL2RNZCK26');