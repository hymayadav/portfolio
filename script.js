// JavaScript for Vurukuti Hyma Yadav's Portfolio Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if(navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animate hamburger icon to X
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if(navToggle) navToggle.classList.remove('active');
        });
    });
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Calculate header offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== SKILLS ANIMATION =====
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        skillBars.forEach(bar => {
            if(isInViewport(bar) && bar.style.width === '0px') {
                // Get the width from inline style
                const width = bar.getAttribute('style').split('width:')[1].split('%')[0].trim();
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width + '%';
            }
        });
    }
    
    // Initial check and scroll event listener
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if(!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // ===== PROJECT CARD HOVER ANIMATION =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image img').style.transform = 'scale(1)';
        });
    });
    
    // ===== SCROLL REVEAL ANIMATION =====
    // Add a class to elements when they come into view
    const revealElements = document.querySelectorAll('.education-card, .skill-category, .project-card, .roadmap-item, .contact-item');
    
    function revealOnScroll() {
        for(let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = revealElements[i].getBoundingClientRect().top;
            const revealPoint = 150;
            
            if(revealTop < windowHeight - revealPoint) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    // Add a CSS class to style.css to handle the reveal animation:
    // .education-card, .skill-category, .project-card, .roadmap-item, .contact-item {
    //   opacity: 0;
    //   transform: translateY(20px);
    //   transition: opacity 0.5s ease, transform 0.5s ease;
    // }
    // 
    // .education-card.active, .skill-category.active, .project-card.active, 
    // .roadmap-item.active, .contact-item.active {
    //   opacity: 1;
    //   transform: translateY(0);
    // }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Call once to check elements in view on page load
    revealOnScroll();
});