import dom from './dom.js';
import state from './state.js';

const themeNodes = {
    color: {
        body: ['.body', true],
        sectionTitles: ['.section__title', false],
        buttons: ['.btn', false],
        logo: ['.header__logo', true],
        themeBtn: ['.header__theme-icon', true],
        langOption: ['.lang-switch__option', false],
        burgerSticks: ['.header__burger-stick', false],
        navOpen: ['.nav', true],
        contactsTitle: ['.contacts__title', true],
        contactsInputs: ['.contacts__input', false],
        footerIcons: ['.footer__icon', false],
    },
    background: {
        'header': [`url('assets/img/header-bg-dark.jpg')`, true],
        'hero': [`url('assets/img/header-bg-dark.jpg')`, true],
        'contacts': [`url('assets/img/contacts-bg-dark.jpg')`, true],
        'section__title-wrapper': [`url('assets/svg/section-title-line-dark.svg')`, false],
    },
    image: {
        'header__theme-icon': `assets/svg/dark.svg`,
    }
}

function changeColor(element, notMultiple) {
    switch (state.theme) {
        case 'dark':
            if (notMultiple) document.querySelector(element).classList.remove('light')
            else document.querySelectorAll(element).forEach(el => el.classList.remove('light'))
            break

        case 'light':
            if (notMultiple) document.querySelector(element).classList.add('light')
            else document.querySelectorAll(element).forEach(el => el.classList.add('light'))
            break

        default: console.log(`Theme ${state.theme}`)
    }
}

function changeBackground(node, url, theme) {
    const notMultiple = url[1]
    const relevantUrl = url[0].replace(/[a-z]*(?=\.[a-z]{3})/, theme)
    if (notMultiple) document.querySelector(`.${node}`).style.backgroundImage = relevantUrl
    else document.querySelectorAll(`.${node}`).forEach(el => el.style.backgroundImage = relevantUrl)
}

function changeImage(element, attribute, theme) {
    const relevantAttribute = attribute.replace(/[a-z]*(?=\.[a-z]{3})/, theme)
    element.setAttribute('src', relevantAttribute)
}


function changeTheme(theme) {
    state.theme = theme
    dom.themeBtn.setAttribute('data-theme', theme)
    Object.keys(themeNodes.color).forEach(node => {
        changeColor(themeNodes.color[node][0], themeNodes.color[node][1])
    })
    Object.keys(themeNodes.background).forEach(node => {
        changeBackground(node, themeNodes.background[node], theme)
    })
    Object.keys(themeNodes.image).forEach(node => {
        changeImage(document.querySelector(`.${node}`), themeNodes.image[node], theme)
    })
}

export {
    changeTheme,
}