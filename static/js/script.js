(function ($) {
    "use strict";

	/*--------------------------------------------------------------
	Header Search js
	--------------------------------------------------------------*/
	$('.atf-searching-btn').on('click', function(){
		$('.atf-searching-area').addClass('active');
	});

	 $('.atf-searching-close-btn').on('click', function(){
		$('.atf-searching-area').removeClass('active');
	  });
	/*--------------------------------------------------------------
	01.	ATTACHMENT IMAGE JS
	--------------------------------------------------------------*/
    var bg = $(".atf_attach_bg");
    bg.css("background-image", function () {
        var attach = "url(" + $(this).data("background") + ")";
        return attach;
    });
    /*--------------------------------------------------------------
	02.	STICKY HEADER JS
	--------------------------------------------------------------*/
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 400) {
				$(".atf-sticky-header").removeClass("atf-sticky-active");
			} else {
				$('.atf-sticky-header').addClass('atf-sticky-active');
			}
    });
    /*--------------------------------------------------------------
	03.	MOBILE MENU 
	--------------------------------------------------------------*/
    var atfHamburger = $(".atf-mobile-menu-active > ul").clone();
    var atfHamburgerMenu = $(".atf-hamburger-menu nav");
    atfHamburgerMenu.append(atfHamburger);
    if ($(atfHamburgerMenu).find(".sub-menu").length != 0) {
        $(atfHamburgerMenu).find(".sub-menu").parent().append('<button class="atf-menu-close"><i class="fas fa-chevron-right"></i></button>');
    }

    var atfSidebarMenu = $(".atf-hamburger-menu nav > ul > li button.atf-menu-close, .atf-hamburger-menu nav > ul li.menu-item-children > a, .atf-hamburger-menu nav > ul > li.atf-nav-item > a");
    $(atfSidebarMenu).on("click", function (e) {
        console.log(e);
        e.preventDefault();
        if (!$(this).parent().hasClass("active")) {
            $(this).parent().addClass("active");
            $(this).siblings(".sub-menu").slideDown();
        } else {
            $(this).siblings(".sub-menu").slideUp();
            $(this).parent().removeClass("active");
        }
    });
	

      // Hamburger open/close
	$(".atf-hamburger-toogle").on("click", function () {
		$(".atf-hamburger").addClass("atf-hamburger-open");
		$(".atf-hamburger-overlay").addClass("atf-hamburger-overlay-open");
		$("body").addClass("menu-open");
	});

	$(".atf-hamburger-close-toggle, .atf-hamburger-overlay").on("click", function () {
		$(".atf-hamburger").removeClass("atf-hamburger-open");
		$(".atf-hamburger-overlay").removeClass("atf-hamburger-overlay-open");
		$("body").removeClass("menu-open");
	});

	// Make Hamburger independently scrollable
	$(".atf-hamburger").on('wheel touchmove', function(e){
		e.stopPropagation(); // prevent Lenis from blocking
	});
	// Make Hamburger Onepage scrollable
	$(".atf-hamburger-menu nav > ul.atf-onepage-menu li a").on("click", function () {
        $(".atf-hamburger").removeClass("atf-hamburger-open");
        $(".atf-hamburger-overlay").removeClass("atf-hamburger-overlay-open");
    });


    /*--------------------------------------------------------------
	05.	SCROLL MENU
	--------------------------------------------------------------*/
	function scrollPage() {
		$(".atf-onepage-menu li a").on("click", function (e) {
			e.preventDefault(); // 

			$(".atf-onepage-menu li a.active").removeClass("active");
			$(this).addClass("active");

			var target = $(this).attr("href");
			scrollToSection(target);
		});
	}

	function scrollToSection(target) {
		$("html, body")
			.stop()
			.animate(
				{
					scrollTop: $(target).offset().top - 100,
				},
				300
			);
	}

	scrollPage();
	
    /*--------------------------------------------------------------
	06.	BACK TO TOP
	--------------------------------------------------------------*/
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 100) {
			$('#back_to_top').addClass('active');
			$('.back_to_top').addClass('affix');
		} else {
			$('#back_to_top').removeClass('active');
			$('.back_to_top').removeClass('affix');
		}
	});
	
	/* --------------------------------------------------------
	07.	Star Home Slider JS
	--------------------------------------------------------- */
	$('.atf-slick-slider-1').slick({
		arrows: true,
		autoplay:true,
		dots: false,
		infinite: true,
		speed: 500,
		loop: true,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		adaptiveHeight: true,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left-long" alt="Arrow Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right-long" alt="Arrow Icon"></i></a>',
	});
			
	/* --------------------------------------------------------
	08.	Star Gallary JS
	--------------------------------------------------------- */
	$('.atf__gallery_slider_active').slick({
		arrows: true,
		dots: false,
		autoplay:true,
		infinite: true,
		speed: 300,
		slidesToShow:2,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left-long" alt="Arrow Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right-long" alt="Arrow Icon"></i></a>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				}
			},
			{
				breakpoint: 580,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	/* --------------------------------------------------------
	08.	End Gallary JS
	--------------------------------------------------------- */
	/* --------------------------------------------------------
	09.	Star Service JS
	--------------------------------------------------------- */
	$('.atf__service_slider_active').slick({
		arrows: true,
		dots: false,
		autoplay:true,
		infinite: true,
		speed: 300,
		slidesToShow:3,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left-long" alt="Arrow Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right-long" alt="Arrow Icon"></i></a>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				}
			},
			{
				breakpoint: 580,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	/* --------------------------------------------------------
		End Service Js
	--------------------------------------------------------- */
	
	/* --------------------------------------------------------
	10.	Star Team JS
	--------------------------------------------------------- */
	$('.atf__team_slider_active').slick({
		arrows: true,
		dots: false,
		autoplay:true,
		infinite: true,
		speed: 300,
		slidesToShow:4,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left-long" alt="Arrow Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right-long" alt="Arrow Icon"></i></a>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				}
			},
			{
				breakpoint: 580,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	/* --------------------------------------------------------
	End Team Js
	--------------------------------------------------------- */	
		
	/* --------------------------------------------------------
	11.	Star Client JS
	--------------------------------------------------------- */
	$('.atf__client_slider_active').slick({
		arrows: true,
		dots: false,
		autoplay:true,
		infinite: true,
		speed: 300,
		slidesToShow:3,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left-long" alt="Arrow Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right-long" alt="Arrow Icon"></i></a>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				}
			},
			{
				breakpoint: 580,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	/* --------------------------------------------------------
	END CLIENT
	--------------------------------------------------------- */
    /* --------------------------------------------------------
	12.	WOW SCROLL
	--------------------------------------------------------- */
    var wow = new WOW({
        //disabled for mobile
        mobile: false,
    });

    wow.init();
	/* --------------------------------------------------------
	13.	START PARTNER LOGO JS
	--------------------------------------------------------- */		
	$('.atf-partner').owlCarousel({
		items:5,
		loop:true,
		margin:25,
		autoplay:true,//Set AutoPlay to 3 seconds
		autoplayTimeout:2000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:1,
				
			},
			600:{
				items:3,
				
			},
			1000:{
				items:5,
		
			}
		}
	});
	/* --------------------------------------------------------
	13.	END PARTNER LOGO JS
	--------------------------------------------------------- */
	/* --------------------------------------------------------
	14. Star Counter
	--------------------------------------------------------- */
	$('.counter-number').counterUp({
		delay: 15,
		time: 2000
	});
    /* --------------------------------------------------------
	15.	LIGHTCASE JS
	--------------------------------------------------------- */
    $("a[data-rel^=lightcase]").lightcase({
        transition: "elastic" /* none, fade, fadeInline, elastic, scrollTop, scrollRight, scrollBottom, scrollLeft, scrollHorizontal and scrollVertical */,
        swipe: true,
        maxWidth: 1170,
        maxHeight: 600,
    });
	/* --------------------------------------------------------
	16.	NICE SELECT JS
	--------------------------------------------------------- */
	$('select').niceSelect();

   /* --------------------------------------------------------
	17. MAILCHAMP JS
	--------------------------------------------------------- */
	$("#mc-form").ajaxChimp({
		url: "https://themesfamily.us22.list-manage.com/subscribe/post?u=e056d9c3aeb53b20aff997467&amp;id=e307d7e1b8&amp;f_id=0012cee1f0",
		/* Replace Your AjaxChimp Subscription Link */
	});
	/* --------------------------------------------------------
	18. MARQUEE JS 
	--------------------------------------------------------- */	
	$('#marqueeLeft').marquee({
		speed: 70,     
		gap: 50,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: true
	});
	/* --------------------------------------------------------
	19. START BLOG GALLERY JS 
		--------------------------------------------------------- */
	$('.atf__blog_slider_active').slick({
		arrows: true,
		dots: false,
		autoplay:false,
		infinite: true,
		speed: 300,
		slidesToShow:1,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left" alt=" Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right" alt="Icon"></i></a>',
	});
	/* --------------------------------------------------------
	END BLOG GALLERY JS 
	--------------------------------------------------------- */

	
})(jQuery);
