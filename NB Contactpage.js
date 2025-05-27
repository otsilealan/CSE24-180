document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on the current item
            item.classList.toggle('active');
            
            // Close other FAQs when opening a new one
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (fullName === '') {
                showError('Please enter your full name');
                return;
            }
            
            if (email === '') {
                showError('Please enter your email address');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            if (subject === '') {
                showError('Please enter a subject');
                return;
            }
            
            if (message === '') {
                showError('Please enter your message');
                return;
            }
            
            // If everything is valid, submit the form (this would be an AJAX call in a real application)
            showSuccess('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
    
    // Helper functions
    function showError(message) {
        // Check if an error message already exists
        let errorElement = document.querySelector('.form-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.style.color = '#d32f2f';
            errorElement.style.padding = '10px';
            errorElement.style.marginBottom = '20px';
            errorElement.style.backgroundColor = '#ffebee';
            errorElement.style.borderRadius = '4px';
            
            // Insert at the top of the form
            const formFirstChild = contactForm.firstChild;
            contactForm.insertBefore(errorElement, formFirstChild);
        }
        
        errorElement.textContent = message;
        
        // Scroll to the error message
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function showSuccess(message) {
        // Remove any existing error messages
        const errorElement = document.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
        
        // Create success message
        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.textContent = message;
        successElement.style.color = '#2e7d32';
        successElement.style.padding = '10px';
        successElement.style.marginBottom = '20px';
        successElement.style.backgroundColor = '#e8f5e9';
        successElement.style.borderRadius = '4px';
        
        // Insert at the top of the form
        const formFirstChild = contactForm.firstChild;
        contactForm.insertBefore(successElement, formFirstChild);
        
        // Scroll to the success message
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove the success message after 5 seconds
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Mobile Navigation Toggle (simplified version)
    const createMobileNav = () => {
        const header = document.querySelector('.header');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.cursor = 'pointer';
        mobileMenuBtn.style.color = '#2e7d32';
        
        header.insertBefore(mobileMenuBtn, header.querySelector('.search-box'));
        
        // Handle mobile menu toggle
        const mainNav = document.querySelector('.main-nav');
        
        // Media query for responsive design
        const handleResponsive = () => {
            if (window.innerWidth <= 900) {
                mobileMenuBtn.style.display = 'block';
                mainNav.style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                mainNav.style.display = 'block';
                mainNav.style.width = 'auto';
                mainNav.style.position = 'static';
            }
        };
        
        // Initial check
        handleResponsive();
        
        // Listen for window resize
        window.addEventListener('resize', handleResponsive);
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            if (mainNav.style.display === 'none' || mainNav.style.display === '') {
                mainNav.style.display = 'block';
                mainNav.style.position = 'absolute';
                mainNav.style.top = '100%';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.backgroundColor = '#fff';
                mainNav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                mainNav.style.zIndex = '100';
                
                // Style the menu items for mobile
                const navUl = mainNav.querySelector('ul');
                navUl.style.flexDirection = 'column';
                navUl.style.padding = '10px 0';
                
                const navItems = navUl.querySelectorAll('li');
                navItems.forEach(item => {
                    item.style.margin = '0';
                    const link = item.querySelector('a');
                    link.style.display = 'block';
                    link.style.padding = '12px 20px';
                });
                
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mainNav.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    // Initialize mobile navigation
    createMobileNav();
});
