/**
* Template Name: Serenity
* Template URL: https://bootstrapmade.com/serenity-bootstrap-corporate-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()




// <!-- JavaScript to manage the banner display -->

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('notificationModal');
  var closeBtn = document.querySelector('.modal_notify .close-notify');

  function closeModalNotify() {
    modal.style.display = 'none';
    sessionStorage.setItem('notificationDisplayed', 'true');
  }

  if (!sessionStorage.getItem('notificationDisplayed')) {
    modal.style.display = 'block';
  }

  closeBtn.addEventListener('click', closeModalNotify);
});




// document.addEventListener('DOMContentLoaded', function () {
//   var modal = document.getElementById('notificationModal');
//   var closeBtn = document.querySelector('.modal_notify .close-notify');

//   function closeModalNotify() {
//     modal.style.display = 'none';
//     sessionStorage.setItem('notificationDisplayed', 'true');
//   }

//   window.closeModalNotify = closeModalNotify;

//   // Function to check if notification should be displayed
//   function shouldShowNotification() {
//     var notificationDisplayed = sessionStorage.getItem('notificationDisplayed');
//     var isMobile = window.innerWidth <= 768;

//     if (notificationDisplayed) {
//       return false;
//     }

//     // If it's mobile and the link has target _blank, skip showing notification
//     var mobileLink = document.querySelector('.mobile-link a');
//     if (isMobile && mobileLink && mobileLink.target === '_blank') {
//       sessionStorage.setItem('notificationDisplayed', 'true');
//       return false;
//     }

//     return true;
//   }

//   if (shouldShowNotification()) {
//     modal.style.display = 'block';
//   }

//   closeBtn.addEventListener('click', closeModalNotify);

//   // Add event listeners for links to handle clicks
//   var desktopLink = document.querySelector('.desktop-link a');
//   var mobileLink = document.querySelector('.mobile-link a');

//   if (desktopLink) {
//     desktopLink.addEventListener('click', function (event) {
//       // For desktop link, mark notification as displayed
//       sessionStorage.setItem('notificationDisplayed', 'true');
//     });
//   }

//   if (mobileLink) {
//     mobileLink.addEventListener('click', function (event) {
//       // For mobile link, mark notification as displayed
//       if (mobileLink.target === '_blank') {
//         sessionStorage.setItem('notificationDisplayed', 'true');
//       }
//     });
//   }
// });



// Counter animation script
document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
});





// survey//
document.addEventListener('DOMContentLoaded', function () {
  var banner = document.querySelector('.notification-banner');
  var closeBtn = document.querySelector('.close-banner');
  var handIcon = document.querySelector('.hand-animation');

  // Function to hide the banner
  function hideBanner() {
    banner.style.display = 'none';
  }

  // Close the banner when the user clicks the close button
  closeBtn.addEventListener('click', hideBanner);

  // Simulate a hand animation to grab attention after 3 seconds
  setTimeout(function () {
    handIcon.style.transform = 'translateX(100px) translateY(-10px)';  // Hand moves towards link
  }, 3000); // Trigger after 3 seconds

  // Hide the banner after 30 seconds
  setTimeout(hideBanner, 30000); // 30 seconds
});



// Client Rating//
document.addEventListener('DOMContentLoaded', function () {
  var customRateButton = document.getElementById('customRateButton');

  // Function to show and hide the button in 10-second intervals
  function toggleButtonVisibility() {
    // Show the button
    customRateButton.classList.add('show');

    // Hide the button after 10 seconds
    setTimeout(function () {
      customRateButton.classList.remove('show');
    }, 10000); // Button stays visible for 10 seconds
  }

  // Initial delay before the button first shows (after 10 seconds)
  setTimeout(function () {
    toggleButtonVisibility(); // First popup after 10 seconds

    // Then continue showing and hiding the button every 20 seconds (10s visible, 10s hidden)
    setInterval(toggleButtonVisibility, 20000); // Repeats every 20 seconds
  }, 500); // 10000 Initial 10-second delay before the first show
});








