// Vote sites data
const voteSites = [
    {
        name: "Minecraft Buzz",
        link: "https://minecraft.buzz/vote/12835",
        logo: "https://minecraft.buzz/template/images/logo.png?v=6",
        prize: "Vote Crate Key",
        background: "https://minecraft.buzz/template/images/logo.png?v=6"
    },
    {
        name: "MinecraftServers.ORG",
        link: "https://minecraftservers.org/vote/669390",
        logo: "https://mnsnetwork.xyz/minecraftservers.org.jpg",
        prize: "Vote Crate Keys",
        background: "https://mnsnetwork.xyz/minecraftservers.org.jpg"
    },
    {
        name: "ServersPact",
        link: "https://www.serverpact.com/vote-47777",
        logo: "https://preview.redd.it/variations-to-the-minecraft-logo-v0-0dzqovtefeqd1.png?width=1080&crop=smart&auto=webp&s=e5fe1b8b9ab1a689dd6059f087caca969401592f",
        prize: "Vote Crate Key",
        background: "https://preview.redd.it/variations-to-the-minecraft-logo-v0-0dzqovtefeqd1.png?width=1080&crop=smart&auto=webp&s=e5fe1b8b9ab1a689dd6059f087caca969401592f"
    },
    {
        name: "Minecraft Server List",
        link: "https://minecraft-server-list.com/server/509033/vote/",
        logo: "https://cdn.openart.ai/published/YjlXgyEHpK0YyRlAgKMo/FWY51iKk_Awlf_512.webp",
        prize: "Vote Crate Key",
        background: "https://cdn.openart.ai/published/YjlXgyEHpK0YyRlAgKMo/FWY51iKk_Awlf_512.webp"
    },
    {
        name: "Top MC Servers",
        link: "https://top-mc-servers.net/server/362",
        logo: "https://top-mc-servers.net/assets/img/favicon.png",
        prize: "Vote Crate Key",
        background: "https://top-mc-servers.net/assets/img/favicon.png"
    },
    {
        name: "Top Minecraft Servers",
        link: "https://topminecraftservers.org/vote/39577",
        logo: "https://topminecraftservers.org/includes/img/favicon/favicon-96x96.png",
        prize: "Vote Crate Key",
        background: "https://topminecraftservers.org/includes/img/favicon/favicon-96x96.png"
    }
];

// Load vote sites
const voteSitesGrid = document.getElementById('voteSitesGrid');
voteSites.forEach(site => {
    const card = document.createElement('div');
    card.className = 'vote-card';
    card.style.backgroundImage = `url(${site.background || site.logo})`;
    
    card.innerHTML = `
        <div class="vote-card-content">
            <img src="${site.logo}" alt="${site.name}" class="site-logo">
            <h3 class="site-name">${site.name}</h3>
            <a href="${site.link}" class="vote-link" target="_blank" rel="noopener noreferrer">
                Open <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <p class="vote-prize">
                ${site.prize} <i class="fa-solid fa-gift"></i>
            </p>
        </div>
    `;
    
    voteSitesGrid.appendChild(card);
});

// Update navigation and footer links to NOT open in new tabs
document.addEventListener('DOMContentLoaded', () => {
    // Remove target="_blank" from navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (!link.href.includes('votesites')) {
            link.removeAttribute('target');
        }
    });

    // Remove target="_blank" from footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        if (!link.href.includes('votesites')) {
            link.removeAttribute('target');
        }
    });
});