/* =========================================
   1. TAILWIND CONFIGURATION
   ========================================= */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    // CHANGE THIS HEX CODE TO TWEAK YOUR BLUE
                    blue: '#0047AB',   /* Royal Blue (Primary) */
                    
                    accent: '#2563EB', /* Lighter Blue (Buttons/Highlights) */
                    dark: '#000000',   /* Pure Black */
                    light: '#ffffff',  /* Pure White */
                }
            },
            fontFamily: {
                // Setting Poppins as the default sans font
                sans: ['Poppins', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            }
        }
    }
};

/* =========================================
   2. INTERACTIVITY
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the button and the menu div
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = mobileBtn.querySelector('i');

    mobileBtn.addEventListener('click', () => {
        // Toggle the 'hidden' class to show/hide menu
        mobileMenu.classList.toggle('hidden');
        
        // Also toggle 'flex' to ensure layout is correct when visible
        mobileMenu.classList.toggle('flex');

        // Optional: Change Icon from Bars to X (Close)
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

});


//Hero section//
document.addEventListener('DOMContentLoaded', () => {
    
    // --- HERO SLIDER LOGIC ---
    const sliderContainer = document.getElementById('hero-slider');
    
    // 1. Array of Images (You can change these URLs)
    const heroImages = [
        "https://images.unsplash.com/photo-1523825036634-aab3cce05919?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    ];

    let currentIndex = 0;

    // 2. Inject Images into HTML
    if (sliderContainer) {
        heroImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('slider-image');
            if (index === 0) img.classList.add('active'); // Show first image immediately
            sliderContainer.appendChild(img);
        });

        // 3. Cycle Function
        setInterval(() => {
            const images = document.querySelectorAll('.slider-image');
            if (images.length > 0) {
                images[currentIndex].classList.remove('active'); // Hide current
                currentIndex = (currentIndex + 1) % images.length; // Next index
                images[currentIndex].classList.add('active'); // Show next
            }
        }, 5000); // Change every 5 seconds
    }
});


//abut us page//
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Animation Logic (Intersection Observer)
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once loaded to save performance
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // CRITICAL FIX: I added '.pop-up' to this list below
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .pillar-card, .pop-up');
    
    animatedElements.forEach((el) => {
        observer.observe(el);
    });

    // Fallback for older browsers (Safety check)
    function checkScroll() {
        if (!('IntersectionObserver' in window)) {
            animatedElements.forEach(el => el.classList.add('active'));
        }
    }
});
// portfolio file //
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SCROLL ANIMATION LOGIC (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .pillar-card, .pop-up, .portfolio-item');
    
    animatedElements.forEach((el) => {
        observer.observe(el);
    });

    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach(el => el.classList.add('active'));
    }


    // ==========================================
    // 2. PORTFOLIO FILTERING LOGIC
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0) { // Only run if we are on the portfolio page
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter Items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide-item');
                        item.classList.add('show-item');
                    } else {
                        item.classList.remove('show-item');
                        item.classList.add('hide-item');
                    }
                });
            });
        });
    }

});

//contact page//
// --- EMAILJS CONFIGURATION ---
// 1. Initialize EmailJS (Replace with your Public Key)
(function() {
    // If you haven't added this in your HTML head, uncomment the line below:
    // emailjs.init("YOUR_PUBLIC_KEY");
})();

// 2. Handle Form Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = document.getElementById('submit-btn');
        const originalText = btn.innerHTML;

        // Change button state
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        // Replace with your Service ID and Template ID
        const serviceID = 'service_opnrakt';
        const templateID = 'template_to8jl9b';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Success State
                btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                btn.classList.remove('bg-blue-600');
                btn.classList.add('bg-green-600');
                
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('bg-blue-600');
                    btn.classList.remove('bg-green-600');
                    btn.disabled = false;
                }, 3000);
            }, (err) => {
                // Error State
                btn.innerHTML = 'Failed. Try Again.';
                btn.classList.remove('bg-blue-600');
                btn.classList.add('bg-red-600');
                console.error('EmailJS Error:', err);
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('bg-blue-600');
                    btn.classList.remove('bg-red-600');
                    btn.disabled = false;
                }, 3000);
            });
    });
}