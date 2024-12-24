document.addEventListener('DOMContentLoaded', () => {
    const serverIP = 'mc.mnsnetwork.xyz';
    const serverPort = 25565;
    const discordLink = 'https://discord.gg/Zujvry4n';

    // Player Count Fetching
    async function fetchPlayerCount() {
        const playerCountEl = document.getElementById('playerCount');
        try {
            const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
            const data = await response.json();

            if (data.online) {
                playerCountEl.textContent = `${data.players.online}/${data.players.max} Online`;
            } else {
                playerCountEl.textContent = '0/0 Online';
            }
        } catch (error) {
            playerCountEl.textContent = '0/0 Online';
            console.error('Failed to fetch player count:', error);
        }
    }

    // IP Copy Functionality
    function copyServerIP() {
        navigator.clipboard.writeText(serverIP).then(() => {
            console.log(`Copied server IP: ${serverIP}`);
        }).catch(err => {
            console.error('Failed to copy IP:', err);
        });
    }

    // Handle all internal navigation links
    function handleInternalLinks() {
        const internalLinks = document.querySelectorAll('.nav-links a, .footer-links a');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default if it's an anchor link
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        
                        // Close mobile menu if it's open
                        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                        const navLinks = document.querySelector('.nav-links');
                        if (mobileMenuToggle && navLinks) {
                            mobileMenuToggle.classList.remove('active');
                            navLinks.classList.remove('mobile-active');
                        }
                    }
                }
            });
        });
    }

    // Event Listeners for Copy IP Buttons
    const copyIPButtons = document.querySelectorAll('#copy-ip, #server-ip, #footer-copy-ip');
    copyIPButtons.forEach(button => {
        button.addEventListener('click', copyServerIP);
    });

    // Handle Discord links to open in same tab
    const discordButtons = document.querySelectorAll('#discord-link, #discord-join, #main-discord-join, #footer-discord');
    discordButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = discordLink;
        });
    });

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    const playerCount = document.querySelector('.player-count');

    // Toggle menu and animation
    mobileMenuToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuToggle && navLinks && !mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('mobile-active');
        }
    });

    // Handle window resize
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                mobileMenuToggle?.classList.remove('active');
                navLinks?.classList.remove('mobile-active');
            }
        }, 250);
    });

    // Remove the touchmove prevention
    // Only prevent touch events within the mobile menu when it's active
    document.body.addEventListener('touchmove', (e) => {
        if (navLinks?.classList.contains('mobile-active') && e.target.closest('.nav-links')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Initialize link handlers
    handleInternalLinks();

    // Fetch player count initially and set an interval to update
    fetchPlayerCount();
    setInterval(fetchPlayerCount, 60000);
});
