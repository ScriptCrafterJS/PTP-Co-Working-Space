$(document).ready(() => {
  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 70,
          },
          1000
        );
    }
  });

  // Navbar background change on scroll
  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  // Gallery Slider
  let currentSlide = 0;
  const slides = $(".gallery-slide");
  const totalSlides = slides.length;
  let slidesToShow = 3; // Changed from const to let
  const maxSlide = totalSlides - slidesToShow;

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
    currentSlide = 0;
    updateSlider();
  }

  $(window).resize(updateSlidesToShow);
  updateSlidesToShow();

  // Animate elements on scroll
  $(window).scroll(() => {
    $(".amenity-card, .benefit-card, .package-card").each(function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass("animate__animated animate__fadeInUp");
      }
    });
  });

  // Package card hover effects
  $(".package-card").hover(
    function () {
      $(this)
        .find(".btn")
        .addClass("btn-outline-warning")
        .removeClass("btn-warning");
    },
    function () {
      $(this)
        .find(".btn")
        .addClass("btn-warning")
        .removeClass("btn-outline-warning");
    }
  );

  // Form validation for email buttons
  $('a[href^="mailto:"]').click((e) => {
    // You can add custom email handling here
    console.log("Email button clicked");
  });

  // Parallax effect for the parallax section
  $(window).scroll(() => {
    var scrolled = $(window).scrollTop();
    var parallax = $(".parallax-section");
    var speed = scrolled * 0.5;

    parallax.css("background-position", "center " + speed + "px");
  });

  // Add loading animation
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

// Add CSS for navbar scrolled state
$("<style>")
  .prop("type", "text/css")
  .html(
    `
        .navbar-scrolled {
            background-color: rgba(33, 37, 41, 0.95) !important;
            backdrop-filter: blur(10px);
        }
        
        .loaded {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }
        
        body {
            opacity: 0;
        }
    `
  )
  .appendTo("head");
