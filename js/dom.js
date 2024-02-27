window.addEventListener("DOMContentLoaded", () => {
    initMenu();
});

function initMenu() {
    if (window.innerWidth <= 766) return;

    for ( const element of document.querySelectorAll('.il-mainbar .minarm-mainbar-li-submenu a.il-link.link-bulky')) {
        element.parentNode.removeChild(element);
    }

    const mainbar = document.querySelector('.il-mainbar');
    const headerMenu = document.querySelector('.header-menu.orientation-horizontal');
    if (headerMenu && mainbar) {
        headerMenu.appendChild(mainbar);
    }

    initSlates();
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

    const toolsDisengaged = document.querySelector('.il-mainbar-tools-entries.disengaged');
    if (toolsDisengaged) {
        toolsDisengaged.parentNode.removeChild(toolsDisengaged);
        document.querySelector('.nav.il-maincontrols')?.classList.add('disengaged');
    }

    const closeSlates = document.querySelector('.il-mainbar-close-slates');
    if (closeSlates) closeSlates.parentNode.removeChild(closeSlates);

    
    if (document.querySelector('header .il-mainbar-tools-button')) {
/*         document.querySelector('header')?.classList.add('disabled');        
        document.querySelector('.copg-top-actions button')?.classList.remove('btn-default').add('btn-primary');        
 */
    }

    window.addEventListener('click', closeAllOpenMenu, true);
    persistToolBar();
}

function closeAllOpenMenu() {
    document.querySelectorAll('header li > .btn.engaged').forEach(button => button.click());
    persistToolBar();
}

function persistToolBar() {
    const tools = document.querySelector('.nav.il-maincontrols .il-maincontrols-slate.disengaged');
    if (tools) {
        console.log({tools});
        tools?.classList.remove('disengaged');
        tools?.classList.add('engaged');
        const toolsWrapper = document.querySelector('.nav.il-maincontrols.disengaged');
        toolsWrapper?.classList.remove('disengaged');
        toolsWrapper?.classList.add('engaged');

    }
}

