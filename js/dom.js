window.addEventListener("DOMContentLoaded", () => {
    initMenu();
});

function initMenu() {
    for ( const element of document.querySelectorAll('.il-mainbar .dci-mainbar-li-submenu a.il-link.link-bulky')) {
        element.parentNode.removeChild(element);
    }
    document.querySelector('.metabar .dci-mainbar-li.search button')?.addEventListener('click', openSearch);
    document.querySelector('.metabar .dci-mainbar-li.search #mm_search_form > .input-group input')?.addEventListener('blur', closeSearch);

    const mainbar = document.querySelector('.il-mainbar');
    const headerMenu = document.querySelector('.header-menu');
    if (headerMenu && mainbar) {
        headerMenu.appendChild(mainbar);
    }

    initSlates();
}

let initSlatesAttempts = 0;
function initSlates() {
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
}

function openSearch() {
    const container = document.querySelector('.metabar .dci-mainbar-li.search #mm_search_form > .input-group');
    container?.classList.add('open');
    container?.querySelector('input')?.focus();
}
function closeSearch() {
    document.querySelector('.metabar .dci-mainbar-li.search #mm_search_form > .input-group')?.classList.remove('open');
}

