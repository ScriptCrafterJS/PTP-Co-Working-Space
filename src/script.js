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

  // Navbar background change on scroll (simplified)
  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  // Gallery Slider (requires JavaScript for complex logic)
  let currentSlide = 0;
  const slides = $(".gallery-slide");
  const totalSlides = slides.length;
  let slidesToShow = 3;
  let maxSlide = totalSlides - slidesToShow;

  function updateSlider() {
    const translateX = -(currentSlide * (100 / slidesToShow));
    $(".gallery-slider").css("transform", `translateX(${translateX}%)`);
  }

  $("#galleryNext").click(() => {
    if (currentSlide < maxSlide) {
      currentSlide++;
      updateSlider();
    }
  });

  $("#galleryPrev").click(() => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });

  // Auto-play gallery slider
  setInterval(() => {
    if (currentSlide < maxSlide) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlider();
  }, 5000);

  // Responsive gallery slider
  function updateSlidesToShow() {
    if ($(window).width() <= 768) {
      slidesToShow = 1;
    } else if ($(window).width() <= 992) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }
    maxSlide = totalSlides - slidesToShow;
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
