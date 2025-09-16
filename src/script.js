$(document).ready(() => {
  // ===== ESSENTIAL JAVASCRIPT ONLY =====
  // (Everything else moved to CSS for better performance)

  // Hero animated words
  const initHeroWordAnimation = () => {
    const words = document.querySelectorAll(".hero-words-wrapper .hero-word");
    if (words.length > 0) {
      let current = 0;
      setInterval(() => {
        words[current].classList.remove("hero-word-in");
        words[current].classList.add("hero-word-out");
        let next = (current + 1) % words.length;
        words[next].classList.remove("hero-word-out");
        words[next].classList.add("hero-word-in");
        current = next;
      }, 2000);
    }
  };

  // Initialize hero animation
  initHeroWordAnimation();

  // Update current year in footer
  const updateCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
      yearElement.textContent = currentYear;
    }
  };

  // Initialize year update
  updateCurrentYear();

  // Navbar background change on scroll (simplified)
  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  // Gallery Slider with Auto-Play (no manual controls needed)
  let currentSlide = 0;
  const slides = $(".gallery-slide");
  const totalSlides = slides.length;
  let slidesToShow = 4; // Show 4 images on desktop
  let slideWidth = 350;
  let maxSlide = totalSlides - slidesToShow;

  function updateSlider() {
    // Use exact pixel-based translation with current slideWidth
    const translateX = -(currentSlide * slideWidth);
    $(".gallery-slider").css("transform", `translateX(${translateX}px)`);
  }

  // Auto-play gallery slider - continuous loop
  setInterval(() => {
    if (currentSlide < maxSlide) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlider();
  }, 3000); // Auto-slide every 3 seconds

  // Responsive gallery slider
  function updateSlidesToShow() {
    if ($(window).width() <= 576) {
      slidesToShow = 2; // Show 2 images on mobile
      slideWidth = 250; // Match CSS: 250px image
    } else if ($(window).width() <= 768) {
      slidesToShow = 3; // Show 3 images on tablet
      slideWidth = 280; // Match CSS: 280px image
    } else {
      slidesToShow = 4; // Show 4 images on desktop
      slideWidth = 350; // Match CSS: 350px image
    }
    maxSlide = Math.max(0, totalSlides - slidesToShow);
    currentSlide = Math.min(currentSlide, maxSlide);
    updateSlider();
  }
  $(window).resize(updateSlidesToShow);
  updateSlidesToShow();

  // Scroll animations trigger (lightweight IntersectionObserver alternative)
  const animateElements = () => {
    $(".animate-on-scroll").each(function () {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
        $(this).addClass("animate");
      }
    });
  };

  $(window).scroll(animateElements);
  animateElements(); // Initial check

  // Body loaded state
  $(window).on("load", () => {
    $("body").addClass("loaded");
  });

  // Mobile menu close on link click
  $(".navbar-nav a").on("click", () => {
    if ($(window).width() < 992) {
      $(".navbar-collapse").collapse("hide");
    }
  });
});
