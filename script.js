
document.addEventListener('DOMContentLoaded', function() {
    // Video Modal Functionality
    const playButton = document.getElementById('play-video-btn');
    const videoModal = document.getElementById('video-modal');
    const closeModalButton = document.getElementById('video-modal-close');
    const youtubeIframe = document.getElementById('youtube-video');
    const videoSrc = "https://www.youtube.com/embed/w2fBzH71BWw?si=Tw9Qk1XM9v6ydwCa";

    

    
    // Loader functionality
    
    
  // Create and show loader
  function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="loader-header">Wait for it...</div>
      <div class="progress"></div>
    `;
    document.body.appendChild(loader);
    return loader;
  }

  // Hide loader after 2 seconds
  function initLoader() {
    const loader = showLoader();
    
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 300); // Remove after fade out
    }, 2000); // 2 second duration
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initLoader);




    
    
    
    // Function to open video modal
    function openVideoModal() {
        if (youtubeIframe && videoModal) {
            youtubeIframe.src = videoSrc + "&autoplay=1";
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    }

    // Function to close video modal
    function closeVideoModal() {
        if (videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (youtubeIframe) {
            youtubeIframe.src = ""; // Stop video playback
        }
    }

    // Event Listeners
    if (playButton) {
        playButton.addEventListener('click', openVideoModal);
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeVideoModal);
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });

    // Remove the undefined function call
    // updateButtonVisibility(); // This function doesn't exist - removed
});









// Counter Animation Functionality
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for counter animation
function initCounterObserver() {
    const counterSection = document.getElementById('counter-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!counterSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(counterSection);
}

// Initialize counter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing loader code...
    initLoader();
    
    // Initialize counter observer
    initCounterObserver();
    
    // Your existing video modal code...
    // ... rest of your existing JavaScript
});










// FAQ Accordion
// FAQ Accordion - Fixed
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('faq-open')) {
                    otherItem.classList.remove('faq-open');
                }
            });
            
            // Toggle current item
            item.classList.toggle('faq-open');
        });
    });
});





// Back to top
   window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        var backToTopButton = document.getElementById("back-to-top");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }







document.addEventListener('DOMContentLoaded', function() {
const d = document;
const $q = d.querySelectorAll.bind(d);
const $g = d.querySelector.bind(d);
const $prev = $g(".prev");
const $next = $g(".next");
const $list = $g(".carousel__list");
let auto;
let pauser;

const getActiveIndex = () => {
    const $active = $g("[data-active]");
    return getSlideIndex($active);
}

const getSlideIndex = ($slide) => {
    return [...$q(".carousel__item")].indexOf( $slide );
}

const prevSlide = () => {
    const index = getActiveIndex();
    const $slides = $q(".carousel__item");
    const $last = $slides[$slides.length-1];
    $last.remove();
    $list.prepend($last);
    activateSlide( $q(".carousel__item")[index] );
}
const nextSlide = () => {
    const index = getActiveIndex();
    const $slides = $q(".carousel__item");
    const $first = $slides[0];
    $first.remove();
    $list.append($first);
    activateSlide( $q(".carousel__item")[index] );
}

const chooseSlide = (e) => {
    const max = (window.matchMedia("screen and ( max-width: 600px)").matches) ? 5 : 8;
    const $slide = e.target.closest( ".carousel__item" );
    const index = getSlideIndex( $slide );
    if ( index < 3 || index > max ) return;
    if ( index === max ) nextSlide();
    if ( index === 3 ) prevSlide();
    activateSlide($slide);
}

const activateSlide = ($slide) => {
    if (!$slide) return;
    const $slides = $q(".carousel__item");
    $slides.forEach(el => el.removeAttribute('data-active'));
    $slide.setAttribute( 'data-active', true );
    $slide.focus();
}

const autoSlide = () => {
    nextSlide();
}

const pauseAuto = () => {
    clearInterval( auto );
    clearTimeout( pauser );
}

const handleNextClick = (e) => {
    pauseAuto();
    nextSlide(e);
}

const handlePrevClick = (e) => {
    pauseAuto();
    prevSlide(e);
}

const handleSlideClick = (e) => {
    pauseAuto();
    chooseSlide(e);
}

const handleSlideKey = (e) => {
    switch(e.keyCode) {
        case 37:
        case 65:
            handlePrevClick();
            break;
        case 39:
        case 68:
            handleNextClick();
            break;
    }
}

const startAuto = () => {
    auto = setInterval( autoSlide, 3000 );
}

startAuto();

$next.addEventListener( "click", handleNextClick );
$prev.addEventListener( "click", handlePrevClick );
$list.addEventListener( "click", handleSlideClick );
$list.addEventListener( "focusin", handleSlideClick );
$list.addEventListener( "keyup", handleSlideKey );


});
