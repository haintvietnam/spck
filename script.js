document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelector('.cards');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const cardWidth = 280 + 16; // card width + gap
  let scrollPosition = 0;

  if (prevBtn && nextBtn && cards) {
    prevBtn.addEventListener('click', () => {
      scrollPosition = Math.max(scrollPosition - cardWidth * 2, 0);
      cards.scroll({
        left: scrollPosition,
        behavior: 'smooth'
      });
      updateButtons();
    });

    nextBtn.addEventListener('click', () => {
      scrollPosition = Math.min(scrollPosition + cardWidth * 2, cards.scrollWidth - cards.clientWidth);
      cards.scroll({
        left: scrollPosition,
        behavior: 'smooth'
      });
      updateButtons();
    });

    cards.addEventListener('scroll', () => {
      scrollPosition = cards.scrollLeft;
      updateButtons();
    });

    function updateButtons() {
      prevBtn.style.opacity = scrollPosition <= 0 ? '0.5' : '1';
      nextBtn.style.opacity = scrollPosition >= cards.scrollWidth - cards.clientWidth ? '0.5' : '1';
    }

    // Initial button state
    updateButtons();
  }

  // Hero slider functionality
  const slides = document.querySelectorAll('.hero-slider .slide');
  const indicators = document.querySelectorAll('.slider-indicators .indicator');
  const prevBtnSlider = document.querySelector('.slider-nav.prev');
  const nextBtnSlider = document.querySelector('.slider-nav.next');
  let currentSlide = 0;

  if (slides.length > 0) {
    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });

      // Remove active from all indicators
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
      });

      // Show the target slide and indicator
      slides[index].classList.add('active');
      if (indicators[index]) {
        indicators[index].classList.add('active');
      }
      currentSlide = index;
    }

    // Event listeners for navigation buttons
    if (prevBtnSlider && nextBtnSlider) {
      prevBtnSlider.addEventListener('click', function () {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
          newIndex = slides.length - 1;
        }
        showSlide(newIndex);
      });

      nextBtnSlider.addEventListener('click', function () {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
          newIndex = 0;
        }
        showSlide(newIndex);
      });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function () {
        showSlide(index);
      });
    });

    // Auto-advance slides every 5 seconds
    setInterval(function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }, 5000);
  }

  // Match buttons
  const matchButtons = document.querySelectorAll('.match-card button');
  matchButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('Match details coming soon');
    });
  });

  // Slide cards carousel functionality
  const slideCardsContainer = document.querySelector('.slide-cards .cards');
  const slideCardsPrevBtn = document.querySelector('.slide-cards .nav-btn.prev');
  const slideCardsNextBtn = document.querySelector('.slide-cards .nav-btn.next');

  if (slideCardsContainer && slideCardsPrevBtn && slideCardsNextBtn) {
    // Number of cards to scroll at once
    const scrollAmount = 3;

    // Function to scroll cards
    function scrollCards(direction) {
      const cards = document.querySelectorAll('.slide-cards .card');
      if (cards.length > 0) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 16; // Adjust this to match your CSS gap
        const scrollDistance = (cardWidth + gap) * scrollAmount;

        // Animate the scroll
        slideCardsContainer.scrollBy({
          left: direction === 'next' ? scrollDistance : -scrollDistance,
          behavior: 'smooth'
        });
      }
    }

    // Event listeners for slide cards
    slideCardsPrevBtn.addEventListener('click', function () {
      scrollCards('prev');
    });

    slideCardsNextBtn.addEventListener('click', function () {
      scrollCards('next');
    });
  }
});
