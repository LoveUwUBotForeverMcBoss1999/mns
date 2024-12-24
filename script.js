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
            playerCountEl.textContent = data.online ? `${data.players.online}/${data.players.max} Online` : '0/0 Online';
        } catch (error) {
            console.error('Failed to fetch player count:', error);
            playerCountEl.textContent = '0/0 Online';
        }
    }

    // IP Copy Functionality
    function copyServerIP() {
        navigator.clipboard.writeText(serverIP)
            .then(() => console.log(`Copied server IP: ${serverIP}`))
            .catch(err => console.error('Failed to copy IP:', err));
    }

    // Handle all navigation links
    function handleNavigationLinks() {
        const allLinks = document.querySelectorAll('a');
        
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if href is not present
                if (!href) return;

                // Handle anchor links (internal page navigation)
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.slice(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        closeMobileMenu();
                    }
                    return;
                }

                // Handle Discord links
                if (href.includes('discord')) {
                    e.preventDefault();
                    window.location.href = discordLink;
                    return;
                }

                // Handle vote sites and status links
                if (href === 'votesites' || href.includes('status.mnsnetwork.xyz')) {
                    e.preventDefault();
                    window.location.href = href;
                    return;
                }

                // Handle IP copy links
                if (href === '') {
                    e.preventDefault();
                    copyServerIP();
                    return;
                }
            });
        });
    }

    // Mobile menu functionality
    function setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.querySelector('.nav-links');

        if (!mobileMenuToggle || !navLinks) return;

        function closeMobileMenu() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('mobile-active');
        }

        // Toggle menu
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
            }, 250);
        });

        // Prevent touch events within mobile menu when active
        document.body.addEventListener('touchmove', (e) => {
            if (navLinks.classList.contains('mobile-active') && e.target.closest('.nav-links')) {
                e.preventDefault();
            }
        }, { passive: false });

        return { closeMobileMenu };
    }

    // Initialize all functionality
    function init() {
        // Setup mobile menu and get closeMobileMenu function
        const { closeMobileMenu } = setupMobileMenu() || {};

        // Handle navigation links
        handleNavigationLinks();

        // Setup IP copy buttons
        const copyIPButtons = document.querySelectorAll('#copy-ip, #server-ip, #footer-copy-ip');
        copyIPButtons.forEach(button => button.addEventListener('click', copyServerIP));

        // Initial player count fetch and interval setup
        fetchPlayerCount();
        setInterval(fetchPlayerCount, 60000);

        // Make closeMobileMenu available globally if needed
        window.closeMobileMenu = closeMobileMenu;
    }

    // Start the application
    init();
});
