/**
 * IJSAHM JOURNAL - MAIN JAVASCRIPT
 * Handles navigation, mobile menu, and interactive elements
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ============================================
    // SET ACTIVE NAVIGATION LINK
    // ============================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links li a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();
    
    // ============================================
    // CLOSE MOBILE MENU WHEN CLICKING A LINK
    // ============================================
    const allNavLinks = document.querySelectorAll('.nav-links li a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual AJAX call)
            showFormMessage('Thank you! Your message has been sent. We will respond within 2-3 business days.', 'success');
            contactForm.reset();
        });
    }
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
        let messageDiv = document.getElementById('formMessage');
        
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'formMessage';
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.prepend(messageDiv);
            }
        }
        
        messageDiv.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
        messageDiv.innerHTML = message;
        messageDiv.style.padding = '12px';
        messageDiv.style.marginBottom = '20px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        messageDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        messageDiv.style.border = type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    
    // ============================================
    // ANNOUNCEMENTS SEARCH/FILTER (Optional)
    // ============================================
    const searchInput = document.getElementById('searchAnnouncements');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const announcements = document.querySelectorAll('.announcement-item');
            
            announcements.forEach(announcement => {
                const title = announcement.querySelector('h3')?.textContent.toLowerCase() || '';
                const content = announcement.querySelector('p')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    announcement.style.display = 'block';
                } else {
                    announcement.style.display = 'none';
                }
            });
        });
    }
    
    // ============================================
    // CURRENT YEAR FOR COPYRIGHT
    // ============================================
    const copyrightElement = document.querySelector('.copyright p:first-child');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `&copy; ${currentYear} International Journal of Strategic Management, Accounting and Human Resources Management (IJSAHM). All rights reserved.`;
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS (for homepage)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    console.log('IJSAHM Website initialized successfully');
});