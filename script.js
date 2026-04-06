function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * 5;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.padding = '1rem 3rem';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.padding = '1.5rem 3rem';
    }
    
    lastScroll = currentScroll;
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.skill-glow');
        if (glow) {
            glow.style.left = (x - rect.width) + 'px';
            glow.style.top = (y - rect.height) + 'px';
        }
    });
});

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #9333ea, #a855f7);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        box-shadow: 0 10px 40px rgba(147, 51, 234, 0.4);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    notification.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.3rem;">Message Sent!</div>
        <div style="font-size: 0.8rem; opacity: 0.9;">Thank you ${name}, I'll get back to you soon.</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
   
    contactForm.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-particles');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
     
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 1500);
});
