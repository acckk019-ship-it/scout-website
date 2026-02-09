import { createIcons, UserPlus, Camera, ShieldCheck, Tent, Heart, PlayCircle, ShoppingBag, MessageCircle, Facebook, Phone, MapPin, Instagram, Twitter, Youtube } from 'lucide';

// Initialize Lucide icons
createIcons({
    icons: {
        UserPlus,
        Camera,
        ShieldCheck,
        Tent,
        Heart,
        PlayCircle,
        ShoppingBag,
        MessageCircle,
        Facebook,
        Phone,
        MapPin,
        Instagram,
        Twitter,
        Youtube
    }
});

// Mobile menu and smooth scrolling interactions
document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
            contactForm.reset();
        });
    }

    // Lazy Loading or extra gallery items could be added here
    // For now, let's add a subtle scroll animation for sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });
});

// Simple sound effect for interaction
const playClick = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
};

// Add interaction sounds to buttons
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', () => {
        try {
            playClick();
        } catch (e) {
            console.log("Audio interaction limited by browser policy");
        }
    });
});