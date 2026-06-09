/*
|-----------------------------------------------------
| Template Name: TechCore – IT Solutions & Technology Multipage HTML Template
| Developer: Themesfamily
|-----------------------------------------------------
*/
/***************************************************
==================== JS ======================
****************************************************
00. Configuration Check
01. GSAP Plugin Registration
02.	LENIS SMOOTH SCROLLING
04. GSAP Custom Cursor Implementation
05. GSAP Text Split Animation
06. GSAP Image Spread / Reveal Animation
07. GSAP 3D Scale and Fade Animation
08. GSAP Dynamic Fade-In Animations (General)
09. GSAP Parallax Zoom Animation
10. MAIN INITIALIZATION FUNCTION
****************************************************/

(function ($) {
    "use strict";

	$(window).on("load", function () {
		initSlickSplitText();
		initCustomCursor();
        initSplitTextAnimations();
        initScale3DAnimations();
        initDynamicFadeAnimations();
        initParallaxZoom();
		setTimeout(() => {
		  initImageSpreadAnimations();
		}, 500);
		
		console.log("All TechCore animations initialized successfully.");
	});

    // 00. Configuration Check
    if (typeof gsap === 'undefined' || typeof jQuery === 'undefined' || typeof Lenis === 'undefined') {
        console.error("Required libraries (GSAP, jQuery, or Lenis) are not loaded. Skipping all animations.");
        return; 
    }
	
    // 01. GSAP Plugin Registration
    if (typeof SplitText !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, SplitText); 
    } else {
        console.warn("GSAP plugins (SplitText or ScrollTrigger) are not loaded. Some animations may be skipped.");
    }
    
    // ----------------------------------------------------------------------------------
    // 02. LENIS SMOOTH SCROLLING
    // ----------------------------------------------------------------------------------
	const lenis = new Lenis({
		smooth: true
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
    // ----------------------------------------------------------------------------------
    // 04. GSAP Custom Cursor Implementation
    // ----------------------------------------------------------------------------------
    function initCustomCursor() {
        const cIn = document.querySelector('.cursor-in');
        const cOut = document.querySelector('.cursor-out');

        if (cIn && cOut) {
            document.addEventListener('mousemove', e => {
                gsap.to([cIn, cOut], {
                    x: e.clientX,
                    y: e.clientY,
                    stagger: { each: 0.03 },
                    duration: 0.25,
                    ease: "power2.out"
                });
            });

            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cOut, { scale: 1.5, opacity: 0, duration: 0.4, ease: "power2.out" });
                    gsap.to(cIn, { scale: 0.6, duration: 0.2, ease: "power1.out" });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(cOut, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.inOut" });
                    gsap.to(cIn, { scale: 1, duration: 0.3, ease: "power1.inOut" });
                });
            });
        } else {
            console.info("Cursor elements not found. Skipping GSAP cursor animation.");
        }
    }

    // ----------------------------------------------------------------------------------
    // 05. GSAP SplitText Animations Handles various text reveal effects (Fade, Up, Rotate, Scale).
    // ----------------------------------------------------------------------------------

	function initSplitTextAnimations() {
		setTimeout(function () {
			const splitElements = document.querySelectorAll(".section-title, .hero-title, .atf-slider-content h1.slider-title, .atf-split-in-fade, .atf-split-in-scale");
			
			if (splitElements.length === 0) return;
			
			gsap.registerPlugin(SplitText, ScrollTrigger);

			splitElements.forEach((element) => {
				// Initialize SplitText for characters and words
				const splitElement = new SplitText(element, { type: "chars, words" });

				// Set 3D perspective for rotation effects
				gsap.set(element, { perspective: 400 });

				// Define starting variables based on class
				let startVars = { opacity: 0 };

				if (element.classList.contains("end")) {
					startVars.x = 20;
				} else if (element.classList.contains("start")) {
					startVars.x = -20;
				} else if (element.classList.contains("up")) {
					startVars.y = 80;
					startVars.transformOrigin = "0% 50% -50";
				} else if (element.classList.contains("atf-split-in-up-fast")) {
					startVars.y = -10;
				} else if (element.classList.contains("down")) {
					startVars.y = -20;
				} else if (element.classList.contains("atf-split-in-rotate") || element.classList.contains("atf-split-in-scale")) {
					startVars.rotateX = "50deg";
					if(element.classList.contains("atf-split-in-scale")) startVars.scale = 0.5;
				}

				// Apply initial hidden state
				gsap.set(splitElement.chars, startVars);

				// Animate characters to their final position
				element.anim = gsap.to(splitElement.chars, {
					scrollTrigger: {
						trigger: element,
						start: "top 90%",
						toggleActions: "restart pause resume reverse",
					},
					x: 0,
					y: 0,
					rotateX: 0,
					scale: 1,
					opacity: 1,
					duration: 1.2,
					stagger: 0.02,
					ease: "power2.out",
				});
			});
		}, 200); // Slight delay to ensure fonts/layout are loaded
	}
	// ----------------------------------------------------------------------------------
    // 07.GSAP Image Spread / Reveal Animation Handles clip-path reveals and container spreading effects.
    // ----------------------------------------------------------------------------------
	function initImageSpreadAnimations() {
		// 1. Left Reveal Animation (Clip-Path)
		gsap.utils.toArray(".atf-thumb-anim-left").forEach((img) => {
			gsap.to(img, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				duration: 1.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: img,
					start: "top 85%",
					toggleActions: "play none none reverse",
				},
			});
		});

		// 2. Right Reveal Animation (Right Corner Clip-Path)
		gsap.utils.toArray(".atf-thumb-anim-right").forEach((img) => {
			gsap.fromTo(img, 
				{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }, 
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					duration: 1.2,
					ease: "power2.out",
					scrollTrigger: {
						trigger: img,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				}
			);
		});

		// 3. GSAP Image Spread / Zoom Animations
		document.querySelectorAll(".spread").forEach((container) => {

			let img = container.querySelector("img");
			if (!img) return;

			// Hero section zoom fix
			if (container.closest(".atf-hero-area") && container.classList.contains("zoom-out")) {

				gsap.set(img, { scale: 1 });

				gsap.from(img, {
					scale: 1.4,
					duration: 1.2,
					ease: "power2.out"
				});

				return;
			}

			// Normal Scroll Animation
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top 80%",
				}
			});

			tl.set(container, { autoAlpha: 1 });

			//  ZOOM OUT
			if (container.classList.contains("zoom-out")) {
				tl.from(img, { scale: 1.4, duration: 1.5, ease: "power2.out" });
			}

			//  START / END 
			else if (container.classList.contains("start") || container.classList.contains("end")) {

				let x = container.classList.contains("start") ? -100 : 100;

				tl.from(container, { xPercent: x, duration: 1.5, ease: "power2.out" });

				tl.from(img, {
					xPercent: -x,
					duration: 1.5,
					ease: "power2.out"
				}, "-=1.5");
			}

		});
	}

    // ----------------------------------------------------------------------------------
    // 07. GSAP 3D Scale and Fade Animation
    // ----------------------------------------------------------------------------------
    function initScale3DAnimations() {
        gsap.utils.toArray(".item-3d").forEach((el) => {
            // Initial 3D transform set
            gsap.set(el, {
                opacity: 0.7,
                transform: "perspective(2500px) translate3d(0,0,0) rotateX(90deg) scale(0.5)",
            });

            // ScrollTrigger timeline to reveal 3D item
            gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom+=50",
                    end: "bottom center",
                    scrub: 2,
                },
            }).to(el, {
                scale: 1,
                rotateX: 0,
                opacity: 1,
                duration: 1.3,
                ease: "power2.out",
            });
        });
    }

    // ----------------------------------------------------------------------------------
    // 08. GSAP Dynamic Fade-In Animations (General)
    // ----------------------------------------------------------------------------------
    function initDynamicFadeAnimations() {
        [
            ".fadeInUp", ".fadeInLeft", ".fadeInRight", ".zoomIn", ".zoomOut", ".bounceIn"
        ].forEach((selector) => {
            gsap.utils.toArray(selector).forEach((el) => {
                let offset = el.getAttribute("data-fade-offset") || 40;
                let duration = el.getAttribute("data-duration") || 0.8;
                let from = el.getAttribute("data-fade-from") || (
                    selector === ".fadeInLeft" ? "left" :
                    selector === ".fadeInRight" ? "right" :
                    selector.includes("zoom") || selector === ".bounceIn" ? "center" :
                    "bottom"
                );
                let onScroll = el.getAttribute("data-on-scroll") || 1;
                let delay = el.getAttribute("data-delay") || 0.15;

                let props = {
                    opacity: 0,
                    duration,
                    delay,
                    ease: el.getAttribute("data-ease") || (
                        selector === ".bounceIn" ? "bounce.out" : "power2.out"
                    ),
                    x: from === "left" ? -offset : from === "right" ? offset : 0,
                    y: from === "top" ? -offset : from === "bottom" ? offset : 0,
                    scale: selector === ".zoomIn" ? 0.5 : selector === ".zoomOut" ? 1.5 : 1,
                };

                // Add ScrollTrigger if onScroll is enabled
                if (onScroll == 1) {
                    props.scrollTrigger = { trigger: el, start: "top 85%" };
                }

                gsap.from(el, props);
            });
        });
    }

    // ----------------------------------------------------------------------------------
    // 09. GSAP Parallax Zoom Animation
    // ----------------------------------------------------------------------------------
    function initParallaxZoom() {
        document.querySelectorAll(".item-up-image").forEach((wrap) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: wrap,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
            }).to(wrap.querySelector(".item-up"), {
                scale: 1.10,
                duration: 1,
            });
        });
    }
	// ----------------------------------------------------------------------------------
    // 10. GSAP SplitText Animation for Slick Slider
    // ----------------------------------------------------------------------------------
	function initSlickSplitText() {
		const $slider = $('.atf-slick-slider-1');

		function animateSlickTitle(currentSlide) {
			// Find ONLY the h1.title inside the current active slide
			let titleElement = currentSlide.find('.atf-slider-content h1.slider-title')[0];
			
			if (!titleElement) return;

			// Ensure it's visible before animation starts
			gsap.set(titleElement, { visibility: 'visible', opacity: 1 });

			// Kill any previous SplitText on this element to avoid memory leaks
			if (titleElement.split) {
				titleElement.split.revert();
			}

			// Create new SplitText
			const split = new SplitText(titleElement, { type: "chars, words" });
			titleElement.split = split; // Store it to revert later if needed

			// Initial State (Start from x: -20 for the "start" effect)
			gsap.set(split.chars, { 
				opacity: 0, 
				x: -20, 
				perspective: 400 
			});

			// Professional Animation Sequence
			gsap.to(split.chars, {
				opacity: 1,
				x: 0,
				duration: 1,
				stagger: 0.02,
				ease: "power2.out",
				clearProps: "all" // Optional: cleans up styles after animation
			});
		}

		// Trigger when the slider first initializes
		$slider.on('init', function(event, slick) {
			let firstSlide = $(slick.$slides[0]);
			animateSlickTitle(firstSlide);
		});

		// Trigger every time the slide changes (Arrow clicks/Dots)
		$slider.on('afterChange', function(event, slick, currentSlideIndex) {
			let currentSlide = $(slick.$slides[currentSlideIndex]);
			animateSlickTitle(currentSlide);
		});
	}

})(jQuery);