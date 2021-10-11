$('document').ready(() => {
    colorSchemeListener();
})

function colorSchemeListener() {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if(userPrefersDark){
        activateDarkMode();
    }
    else if(userPrefersLight) {
        activateLightMode();
    }

    window.matchMedia("(prefers-color-scheme: dark)").addListener( (e) => { 
        e.matches ? activateDarkMode() : activateLightMode();
    });
}

function activateDarkMode() {
    document.getElementById('navbar').classList.remove('navbar-light');
    document.getElementById('navbar').classList.add('navbar-dark');
}

function activateLightMode() {
    document.getElementById('navbar').classList.remove('navbar-dark');
    document.getElementById('navbar').classList.add('navbar-light');
}