let lastScrollY = 0;
const scrollThreshold = 50;

// Mobile menu variables
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
let isMenuOpen = false;

// Server status variables
const SERVER_IP = 'mc.mnsnetwork.xyz';
const SERVER_PORT = 25565;
const REFRESH_INTERVAL = 30000; // 30 seconds

function handleScroll() {
    const currentScroll = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // Only apply scroll effects if menu is closed
    if (!isMenuOpen) {
        const opacity = Math.max(0, 1 - (currentScroll - heroHeight * 0.2) / (heroHeight * 0.6));
        
        const heroBackground = document.querySelector('.hero-background');
        const heroOverlay = document.querySelector('.hero-overlay');
        
        if (heroBackground && heroOverlay) {
            heroBackground.style.opacity = opacity;
            heroOverlay.style.background = `rgba(10, 10, 10, ${1 - opacity})`;
        }
        
        navbar.style.backgroundColor = currentScroll > 50 ? 
            `rgba(10, 10, 10, ${Math.min(0.95, (currentScroll - 50) / 100)})` : 
            'transparent';
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Toggle mobile menu
function toggleMenu(event) {
    if (event) {
        event.stopPropagation();
    }

    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navLinks.style.display = 'flex';
        setTimeout(() => navLinks.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        navLinks.classList.remove('active');
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

async function fetchServerStatus() {
    const playerCountDisplay = document.getElementById('playerCount');
    
    try {
        const response = await fetch('https://api.mcsrvstat.us/3/mc.mnsnetwork.xyz');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.online) {
            playerCountDisplay.innerHTML = `
                <i class="fas fa-users"></i> ${data.players.online}/${data.players.max} Online
            `;
        } else {
            playerCountDisplay.innerHTML = `
                <i class="fas fa-exclamation-circle"></i> Server Offline
            `;
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        playerCountDisplay.innerHTML = `
            <i class="fas fa-users"></i> 0/0 Online
        `;
    }
}

// Call immediately and set interval
fetchServerStatus();
setInterval(fetchServerStatus, 30000); // Every 30 seconds

// Event Listeners
menuToggle.addEventListener('click', toggleMenu);

document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-content')) {
        toggleMenu();
    }
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }
});

// Toast notification for server IP copy
function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;

    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(197, 43, 255, 0.2);
        animation: fadeInOut 2s ease-in-out forwards;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.remove();
        }
    }, 2000);
}

// Copy server IP functionality
function copyServerIP() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        showToast('Server IP copied! Join now at ' + SERVER_IP);
    }).catch(() => {
        showToast('Failed to copy IP. Please try again!');
    });
}

// Event listeners for IP copy
document.querySelector('.server-ip').addEventListener('click', copyServerIP);
document.querySelector('.hero-buttons .btn:last-child').addEventListener('click', copyServerIP);

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, 20px); }
        20% { opacity: 1; transform: translate(-50%, 0); }
        80% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -20px); }
    }

    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Post cards reveal animation
const posts = document.querySelectorAll('.post-card');
const footerColumns = document.querySelectorAll('.footer-column');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

[...posts, ...footerColumns].forEach(element => {
    observer.observe(element);
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.6s ease-out";
});


// cursor stuff
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Optional: Add these effects for interactive elements
    document.querySelectorAll('a, button, .clickable').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
});
