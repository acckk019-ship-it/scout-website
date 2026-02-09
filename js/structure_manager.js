import { translations } from './i18n.js';
import { createIcons, Menu, X, Globe, User, Search, ShoppingBag, Facebook, Instagram, Youtube, Music } from 'https://esm.sh/lucide@0.344.0'; // Using Music icon for SoundCloud as generic fallback if specific not available, or check validity

// Base path for GitHub Pages subdirectory hosting
// Change to '' for local development or root domain hosting
const BASE_PATH = '/scout-website';

// Social Media Links
const SOCIAL = {
    facebook: "https://www.facebook.com/people/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%A7%D9%84%D9%83%D8%B4%D9%81%D9%8A%D8%A9-%D9%81%D8%B1%D9%82%D8%A9-%D8%A7%D9%84%D9%85%D8%AA%D9%82%D8%AF%D9%85/100084122944742/?mibextid=ZbWKwL",
    instagram: "https://www.instagram.com/barbarosa_ssg?igsh=cmNvdDhhbDdmOXU2",
    soundcloud: "https://soundcloud.com/salam-scouts?ref=whatsapp-image&p=a&c=1&si=70d534ab06234f219421f3a15a513ce8&utm_source=whatsapp&utm_medium=message&utm_campaign=social_sharing",
    youtube: "#" // Placeholder
};

export function initStructure() {
    loadLanguage();
    injectHeader();
    injectFooter();
    setupInteractions();
    updateContent();
}

// --- Styles injection ---
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap');
        
        body {
            font-family: 'Tajawal', sans-serif;
            scroll-behavior: smooth;
        }
        
        /* Reference Design Utilities */
        .glass-nav {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        
        .scout-gradient {
            background: linear-gradient(135deg, #2d5a27 0%, #1e3a1a 100%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }

        /* Animation Classes */
        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            will-change: opacity, visibility;
        }
        .fade-in-section.is-visible {
            opacity: 1;
            transform: none;
        }
        
        /* Mobile Menu */
        .mobile-menu-enter {
            transform: translateX(100%);
        }
        .mobile-menu-active {
            transform: translateX(0);
        }
        
        /* Navigation Items */
        .nav-item {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            color: #44403c;
            transition: all 0.2s ease;
        }
        .nav-item:hover {
            background-color: #f5f5f4;
            color: #166534;
        }
        .dropdown-item {
            display: block;
            padding: 0.75rem 1.25rem;
            color: #44403c;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .dropdown-item:hover {
            background-color: #f5f5f4;
            color: #166534;
        }
        .mobile-nav-item {
            display: block;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            color: #44403c;
            transition: all 0.2s ease;
        }
        .mobile-nav-item:hover {
            background-color: #f5f5f4;
            color: #166534;
        }
    `;
    document.head.appendChild(style);
}

// --- Header Injection ---
function injectHeader() {
    const lang = localStorage.getItem('lang') || 'ar';
    const t = translations[lang];
    const isRTL = lang === 'ar';

    const navHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300" id="main-nav">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="${BASE_PATH}/index.html" class="flex items-center gap-3 group">
                <img src="${BASE_PATH}/logo.png" alt="Logo" class="h-12 w-12 group-hover:scale-110 transition duration-300">
                <div class="hidden md:block">
                    <h1 class="font-bold text-lg text-green-900 leading-tight">${t.hero_title}</h1>
                    <span class="text-xs text-green-600 font-medium tracking-wider">${t.hero_subtitle}</span>
                </div>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-1 ${isRTL ? 'space-x-reverse' : ''}">
                <a href="${BASE_PATH}/index.html" class="nav-item">${t.nav_home}</a>
                
                <!-- Scout Movement Dropdown -->
                <div class="relative group">
                    <button class="nav-item flex items-center gap-1">
                        ${t.nav_movement}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div class="bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden py-1">
                            <a href="${BASE_PATH}/scout-movement/index.html" class="dropdown-item">${t.sm_main}</a>
                            <a href="${BASE_PATH}/scout-movement/education.html" class="dropdown-item">${t.sm_edu}</a>
                            <a href="${BASE_PATH}/scout-movement/method.html" class="dropdown-item">${t.sm_method}</a>
                            <a href="${BASE_PATH}/scout-movement/promise.html" class="dropdown-item">${t.sm_promise}</a>
                            <a href="${BASE_PATH}/scout-movement/history.html" class="dropdown-item">${t.sm_history}</a>
                            <a href="${BASE_PATH}/scout-movement/bronze-wolf.html" class="dropdown-item">${t.sm_bronze}</a>
                            <a href="${BASE_PATH}/scout-movement/wood-badge.html" class="dropdown-item">${t.sm_wood}</a>
                        </div>
                    </div>
                </div>

                <!-- Groups Dropdown -->
                <div class="relative group">
                    <button class="nav-item flex items-center gap-1">
                        ${t.nav_groups}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div class="bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden py-1">
                            <a href="${BASE_PATH}/groups/baraem.html" class="dropdown-item">${t.group_baraem}</a>
                            <a href="${BASE_PATH}/groups/zahrat.html" class="dropdown-item">${t.group_zahrat}</a>
                            <a href="${BASE_PATH}/groups/kashaf.html" class="dropdown-item">${t.group_kashaf}</a>
                            <a href="${BASE_PATH}/groups/motaqad.html" class="dropdown-item">${t.group_motaqad}</a>
                            <a href="${BASE_PATH}/groups/qada.html" class="dropdown-item">${t.group_qada}</a>
                            <a href="${BASE_PATH}/groups/qadat.html" class="dropdown-item">${t.group_qadat}</a>
                        </div>
                    </div>
                </div>

                <!-- World Org Dropdown -->
                <div class="relative group">
                    <button class="nav-item flex items-center gap-1">
                        ${t.nav_world}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div class="bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden py-1">
                            <a href="${BASE_PATH}/world-organization/about.html" class="dropdown-item">${t.wo_about}</a>
                            <a href="${BASE_PATH}/world-organization/scout-centre.html" class="dropdown-item">${t.wo_centre}</a>
                            <a href="${BASE_PATH}/world-organization/committee.html" class="dropdown-item">${t.wo_comm}</a>
                            <a href="${BASE_PATH}/world-organization/bureau.html" class="dropdown-item">${t.wo_bureau}</a>
                        </div>
                    </div>
                </div>

                <a href="${BASE_PATH}/region/index.html" class="nav-item">${t.nav_region}</a>
                <a href="${BASE_PATH}/news/index.html" class="nav-item">${t.nav_news}</a>
                <a href="${BASE_PATH}/events/index.html" class="nav-item">${t.nav_events}</a>
                <a href="${BASE_PATH}/team/index.html" class="nav-item">${t.nav_team}</a>
                <a href="${BASE_PATH}/governance/index.html" class="nav-item">${t.nav_governance}</a>
                <a href="${BASE_PATH}/complaints.html" class="nav-item text-red-600 hover:text-red-700 font-medium">${t.nav_complaints}</a>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
                 <button id="lang-toggle" class="p-2 hover:bg-stone-100 rounded-full transition text-stone-600 relative group" title="Switch Language">
                    <i data-lucide="globe" class="w-5 h-5"></i>
                    <span class="absolute top-full mt-1 bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">${lang === 'ar' ? 'English' : 'عربي'}</span>
                </button>
                
                <a href="${BASE_PATH}/shop.html" class="p-2 hover:bg-stone-100 rounded-full transition text-stone-600 hidden sm:block">
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                </a>
                
                 <a href="${BASE_PATH}/search.html" class="p-2 hover:bg-stone-100 rounded-full transition text-stone-600 hidden sm:block">
                    <i data-lucide="search" class="w-5 h-5"></i>
                </a>

                <a href="${BASE_PATH}/login.html" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold transition text-sm shadow-md hover:shadow-lg">
                    <i data-lucide="user" class="w-4 h-4"></i>
                    <span class="hidden sm:inline">${t.nav_login}</span>
                </a>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="lg:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-full transition">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu (Hidden by default) -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-stone-100 absolute top-full left-0 right-0 shadow-xl max-h-[80vh] overflow-y-auto">
            <div class="p-4 flex flex-col gap-2">
                <a href="${BASE_PATH}/index.html" class="mobile-nav-item">${t.nav_home}</a>
                <div class="border-t border-stone-100 my-1"></div>
                <p class="text-xs font-bold text-stone-400 px-4 py-1 uppercase tracking-wider">${t.sm_main}</p>
                <a href="${BASE_PATH}/scout-movement/index.html" class="mobile-nav-item pl-8">${t.sm_main}</a>
                <a href="${BASE_PATH}/scout-movement/history.html" class="mobile-nav-item pl-8">${t.sm_history}</a>
                <div class="border-t border-stone-100 my-1"></div>
                <a href="${BASE_PATH}/news/index.html" class="mobile-nav-item">${t.nav_news}</a>
                <a href="${BASE_PATH}/events/index.html" class="mobile-nav-item">${t.nav_events}</a>
                <a href="${BASE_PATH}/team/index.html" class="mobile-nav-item">${t.nav_team}</a>
                <a href="${BASE_PATH}/governance/index.html" class="mobile-nav-item">${t.nav_governance}</a>
                <a href="${BASE_PATH}/complaints.html" class="mobile-nav-item text-red-600">${t.nav_complaints}</a>
                <a href="${BASE_PATH}/shop.html" class="mobile-nav-item">${t.nav_shop}</a>
            </div>
        </div>
    </nav>
    <div class="h-20"></div> <!-- Spacer -->
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function injectFooter() {
    const lang = getLang();
    const t = translations[lang];

    const footerHTML = `
    <footer class="bg-stone-900 text-stone-400 py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <div class="flex items-center justify-center gap-3 mb-6">
                <img src="${BASE_PATH}/logo.png" alt="Logo" class="h-12 w-12 grayscale brightness-200">
                <span class="text-xl font-bold text-stone-200">${t.hero_title}</span>
            </div>
            <p class="mb-8 max-w-md mx-auto text-stone-500">${t.contact_desc}</p>
            
            <div class="flex justify-center gap-6 mb-8">
                <a href="${SOCIAL.instagram}" target="_blank" class="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition duration-300">
                    <i data-lucide="instagram" class="w-5 h-5"></i>
                </a>
                <a href="${SOCIAL.facebook}" target="_blank" class="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition duration-300">
                    <i data-lucide="facebook" class="w-5 h-5"></i>
                </a>
                <a href="${SOCIAL.soundcloud}" target="_blank" class="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-[#ff5500] hover:text-white transition duration-300">
                    <i data-lucide="music" class="w-5 h-5"></i>
                </a>
                <a href="${SOCIAL.youtube}" target="_blank" class="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition duration-300">
                    <i data-lucide="youtube" class="w-5 h-5"></i>
                </a>
            </div>

            <div class="pt-8 border-t border-stone-800 text-sm">
                <p>${t.footer_rights}</p>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function setupInteractions() {
    // Icons
    createIcons({
        icons: { Menu, X, Globe, User, Search, ShoppingBag, Facebook, Instagram, Youtube, Music }
    });

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.onclick = toggleLanguage;
    }

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenu.classList.contains('hidden') ? 'menu' : 'x';
            // Simple icon switch would need re-render or manual svg manipulation, 
            // for now, just toggle visibility.
        };
    }
}

function updateContent() {
    const lang = getLang();
    const t = translations[lang];

    // Update common elements if they exist on the page
    // IDs must match those in the HTML pages
    const elements = {
        'hero-title': t.hero_title,
        'hero-subtitle': t.hero_subtitle,
        'hero-desc': t.hero_desc,
        'hero-join': t.hero_join,
        'hero-gallery': t.hero_gallery
    };

    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
}

// --- Translation Helpers ---
function loadLanguage() {
    const lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function getLang() {
    return localStorage.getItem('lang') || 'ar';
}

function toggleLanguage() {
    const current = getLang();
    const next = current === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', next);
    location.reload();
}
