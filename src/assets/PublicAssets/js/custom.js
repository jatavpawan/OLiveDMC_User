// Loader
$(window).on('load', function () {
    $('.loader').fadeOut(1000);
});
new WOW().init();

$('.mobile-nav ').click(function () {
	$('body').toggleClass('open-menu');
});
$('.closeIcn > span, .overlay ').click(function () {
	$('body').removeClass('open-menu');
});


//for dropdown in service start
$(".dropdown-link").click(function(){
  $("body").toggleClass("main");
});
//for dropdown in service end

//Responsive menu slide

$(document).ready(function() { 
  $('.parent span').click(function() {
      $(this).parent('.parent').siblings().removeClass('active');
      $(this).parent('.parent').toggleClass('active');
      $(this).parent('.parent').siblings().children('ul').slideUp();
      $(this).parent('.parent').children('ul').slideToggle();
  });
});


//for header sticky
$(window).scroll(function(){
	var scroll = $(window).scrollTop();
	if (scroll >= 100) {
		$("body").addClass("sticky");
	}
	else{ 
		$("body").removeClass("sticky");
	}
});



//for home page slider START
  $(document).ready(function(){
  for (var i=1; i <= $('.slider__slide').length; i++){
    $('.slider__indicators').append('<div class="slider__indicator" data-slide="'+i+'"></div>')
  }
  setTimeout(function(){
    $('.slider__wrap').addClass('slider__wrap--hacked');
  }, 1000);
})

function goToSlide(number){
  $('.slider__slide').removeClass('slider__slide--active');
  $('.slider__slide[data-slide='+number+']').addClass('slider__slide--active');
}

$('.slider__next, .go-to-next').on('click', function(){
  var currentSlide = Number($('.slider__slide--active').data('slide'));
  var totalSlides = $('.slider__slide').length;
  currentSlide++
  if (currentSlide > totalSlides){
    currentSlide = 1;
  }
  goToSlide(currentSlide);
}) 
//for home page slider END


//for destination video slider start
$('#destination-slider').owlCarousel({
    stagePadding: 50,
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
var owl = $('.screenshot_slider').owlCarousel({
    loop: true,
    responsiveClass: true,
    nav: true,
    margin: 0,    
    autoplayTimeout: 3000,
    smartSpeed: 400,
    autoplay:true,
    center: true,
    navText: ['&#8592;', '&#8594;'],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3
        },
        1200: {
            items: 3
        }
    }
});

/****************************/

jQuery(document.documentElement).keydown(function (event) {    

    // var owl = jQuery("#carousel");

    // handle cursor keys
    if (event.keyCode == 37) {
       // go left
      owl.trigger('prev.owl.carousel', [400]);
      //owl.trigger('owl.prev');
    } else if (event.keyCode == 39) {
       // go right
        owl.trigger('next.owl.carousel', [400]);
       //owl.trigger('owl.next');
    }

});

//for destination video slider END

//for theme Based Packages START
$('#theme-based').owlCarousel({
  loop: true,
  margin: 20,
  dots:false,
  nav: true,
  autoplay: true,
  autoplaySpeed:3000,
  navText: ['&#8592;', '&#8594;'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 4
    }
  }
});
//for theme Based Packages END

//for interview video START
$('#owl-interview-video').owlCarousel({
  loop: true,
  margin: 0,
  dots:false,
  nav: true,
  autoplay: true,
  autoplaySpeed:2000,
  navText: ['&#8592;', '&#8594;'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
});
//for interview video END

$('#team-member').owlCarousel({
  loop: true,
  margin: 20,
  dots:false,
  nav: true,
  autoplay: true,
  autoplaySpeed:3000,
  navText: ['&#8592;', '&#8594;'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
});

//for theme Based Packages on destionation finder page START
$('#theme-of-pacakge').owlCarousel({
  loop: true,
  margin: 20,
  dots:false,
  nav: true,
  autoplay: true,
  autoplaySpeed:3000,
  navText: ['&#8592;', '&#8594;'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 4
    }
  }
});
//for theme Based Packages on destionation finder page END


//for list of theme Based Packages on destionation finder page START
$('#list-of-top-pacakge').owlCarousel({
  loop: true,
  margin: 20,
  dots:false,
  nav: true,
  autoplay: true,
  autoplaySpeed:3000,
  navText: ['&#8592;', '&#8594;'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 4
    }
  }
});
//for list of theme Based Packages on destionation finder page END


//for about us team mambers START
$('#about-team-members').owlCarousel({
  loop: true,
  margin: 20,
  dots:false,
  nav: true,
  autoplay: true,
  autoplaySpeed:3000,
  navText: ['&#8592;', '&#8594;'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
});
//for about us team mambers END


//ACCORDION WITH TOGGLE ICONS//

  function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('fa fa-plus fa fa-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);


