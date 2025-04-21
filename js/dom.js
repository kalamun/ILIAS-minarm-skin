window.addEventListener("DOMContentLoaded", () => {
    initMenu();
});

function initMenu() {
    if (window.innerWidth <= 766) return;
    if (document.querySelector('body.mindef-style-loaded')) return false;
    
    for ( const element of document.querySelectorAll('.il-mainbar .minarm-mainbar-li-submenu a.il-link.link-bulky')) {
        element.parentNode.removeChild(element);
    }
    
    const mainbar = document.querySelector('.il-mainbar');
    const headerMenu = document.querySelector('.header-menu.orientation-horizontal');
    if (headerMenu && mainbar) {
        headerMenu.appendChild(mainbar);
    }
    
    initSlates();
    setTimeout(() => document.body.classList.add('mindef-style-loaded'), 500);
}

let initSlatesAttempts = 0;
function initSlates() {
    if (!document.querySelector('.header-menu.orientation-horizontal')) return false;

    const mainbar = document.querySelector('.il-mainbar');
    if (!mainbar.querySelector('button[aria-controls]')) {
        initSlatesAttempts++;
        if (initSlatesAttempts < 10) setTimeout(initSlates, 100);
        return false;
    }

    mainbar.querySelectorAll('button').forEach(button => {
        const controls = button.getAttribute('aria-controls');
        if (controls) {
            const slate = document.querySelector(`#${controls}`);
            if (slate) button.parentNode.appendChild(slate);
        }
    });

    for (const button of mainbar.querySelectorAll('body.menu-horizontal .il-drilldown li > .menulevel, .il-drilldown li > .btn-bulky')) {
        button.classList.add('submenu-title');
    }

    const toolsDisengaged = document.querySelector('.il-mainbar-tools-entries.disengaged');
    if (toolsDisengaged) {
        toolsDisengaged.parentNode.removeChild(toolsDisengaged);
        document.querySelector('.nav.il-maincontrols')?.classList.add('disengaged');
    }

    const closeSlates = document.querySelector('.il-mainbar-close-slates');
    if (closeSlates) closeSlates.parentNode.removeChild(closeSlates);

    window.addEventListener('click', closeAllOpenMenu, true);
    persistToolBar();
}

async function closeAllOpenMenu(e) {
    if (e.target?.tagName === "BUTTON") return;

    if(il?.UI?.maincontrols?.mainbar?.propagation_stopped) {
        il.UI.maincontrols.mainbar.propagation_stopped = false;
    }
    il?.UI?.maincontrols?.mainbar?.disengageAll();
    il?.UI?.maincontrols?.mainbar?.clearStates();

    persistToolBar();
}

function persistToolBar() {
    const tools = document.querySelector('.nav.il-maincontrols .il-maincontrols-slate.disengaged');
    if (tools) {
        tools?.classList.remove('disengaged');
        tools?.classList.add('engaged');
        const toolsWrapper = document.querySelector('.nav.il-maincontrols.disengaged');
        toolsWrapper?.classList.remove('disengaged');
        toolsWrapper?.classList.add('engaged');

    }
}

