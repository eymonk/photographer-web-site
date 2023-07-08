import languages from './translate.js';

const current = {
  lang: 'en',
  theme: 'light',
}

const domElements = {
  sectionTitleWrappers: document.querySelectorAll('.section__title-wrapper'),
  hero: document.querySelector('.hero'),
  header: document.querySelector('.header'),
  logo: document.querySelector('.header__logo'),
  themeIcon: document.querySelector('.header__theme-icon'),
  themeBtn: document.querySelector('.header__theme-btn'),
  burgerMenu: document.querySelector('.header__burger-menu'),
  navigation: document.querySelector('.nav'),
  burgerSticks: document.querySelectorAll('.header__burger-stick'),
  languageOptions: document.querySelectorAll('.lang-switch__option'),
  seasonButtonsContainer: document.querySelector('.portfolio__wrapper_buttons'),
  portfolioImages: document.querySelectorAll('.portfolio__image'),
  contacts: document.querySelector('.contacts'),
  inputs: document.querySelectorAll('.contacts__input'),
  orderShootingButtons: document.querySelectorAll('.price__button'),
  formOrder: document.querySelector('.wrapper__form-order'),
  formButtonClose: document.querySelector('.form__btn_close'),
}


// THEME MENU
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

  switch (current.theme) {
    case 'dark': 
      if (notMultiple) document.querySelector(element).classList.remove('light');
      else document.querySelectorAll(element).forEach(el => el.classList.remove('light'));
      break;

    case 'light': 
      if (notMultiple) document.querySelector(element).classList.add('light');
      else document.querySelectorAll(element).forEach(el => el.classList.add('light'));
      break;

    default: console.log(`Theme ${current.theme}`);
  }
}

function changeBackground(node, url, theme) {
  const notMultiple = url[1];
  const relevantUrl = url[0].replace(/[a-z]*(?=\.[a-z]{3})/, theme); 
  if (notMultiple) document.querySelector(`.${node}`).style.backgroundImage = relevantUrl;
  else document.querySelectorAll(`.${node}`).forEach(el => el.style.backgroundImage = relevantUrl);
}

function changeImage(element, attribute, theme) {
  const relevantAttribute = attribute.replace(/[a-z]*(?=\.[a-z]{3})/, theme);
  element.setAttribute('src', relevantAttribute)
}


function changeTheme(theme) {
  current.theme = theme
  domElements.themeBtn.setAttribute('data-theme', theme);
  Object.keys(themeNodes.color).forEach(node => {
    changeColor(themeNodes.color[node][0], themeNodes.color[node][1])
  });
  Object.keys(themeNodes.background).forEach(node => {
    changeBackground(node, themeNodes.background[node], theme);
  });
  Object.keys(themeNodes.image).forEach(node => {
    changeImage(document.querySelector(`.${node}`), themeNodes.image[node], theme);
  });
}


domElements.themeBtn.addEventListener('click', (event) => {
  const theme = event.currentTarget.dataset.theme === 'dark' ? 'light' : 'dark';
  changeTheme(theme);
})


//ORDER SHOOTING
function openForm() {
  domElements.formOrder.classList.remove('hidden');
  domElements.formOrder.style.transform = `translateY(${scrollY}px)`;
  document.body.classList.add('no-scroll');
}

function closeForm() {
  domElements.formOrder.classList.add('hidden');
  document.body.classList.remove('no-scroll');
}

domElements.orderShootingButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    openForm();
  })
});
domElements.formButtonClose.addEventListener('click', closeForm);

// BURGER MENU
domElements.burgerMenu.addEventListener('click', () => {
  if (window.innerWidth < 816) {
    domElements.navigation.classList.toggle('open');
    domElements.burgerSticks.forEach(stick => stick.classList.toggle('open'));
  }
})

domElements.navigation.addEventListener('click', (e) => {
  if(e.target.classList.contains('nav__item') && window.innerWidth < 816) {
    domElements.navigation.classList.toggle('open');
    domElements.burgerSticks.forEach(stick => stick.classList.toggle('open'));
  }
})


// LANGUAGE MENU
function translateNode (node, text) {
  if (typeof text !== 'object') {
     document.querySelector(`.${node}`).textContent = text
  } else {
    if (node === 'contacts__input') {
      const inputs = document.querySelectorAll(`.contacts__input`);
      inputs[0].setAttribute('placeholder', text[0]);
      inputs[1].setAttribute('placeholder', text[1]);
      inputs[2].setAttribute('placeholder', text[2]);
    } else {
      const nodes = document.querySelectorAll(`.${node}`);
      nodes.forEach((node, ind) => {
        const number = text.length > 1 ? ind : 0;
        node.textContent = text[number];
      })
    }
  }
}

function changeLanguage(lang) {
  current.lang = lang;
  if (lang === domElements.languageOptions[0].textContent) {
    domElements.languageOptions[0].classList.add('lang-switch__option_active');
    domElements.languageOptions[1].classList.remove('lang-switch__option_active');
  } else {
    domElements.languageOptions[1].classList.add('lang-switch__option_active');
    domElements.languageOptions[0].classList.remove('lang-switch__option_active');
  }
  Object.keys(languages[lang]).forEach(key => {
    translateNode(key, languages[lang][key], lang);
  });
}

domElements.languageOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const lang = option.textContent;
    changeLanguage(lang);
  })
})


// SEASONS MENU
domElements.seasonButtonsContainer.addEventListener('click', function (event) {
  const targetBtn = event.target;
  if (targetBtn.classList.contains('btn')) {
    const season = targetBtn.classList[3].split('_')[3];
    //change active btn
    Array.from(this.children).forEach(btn => btn.classList.remove('portfolio__btn_active'));
    targetBtn.classList.contains('btn') && targetBtn.classList.add('portfolio__btn_active');
    //change images source
    domElements.portfolioImages.forEach((img, ind) => img.setAttribute('src', `assets/img/${season}/${ind + 1}.jpg`));
  } 
})


// PAGE RELOAD
window.onunload = function() {
  localStorage.setItem('theme', current.theme);
  localStorage.setItem('lang', current.lang);
}

window.onload = function() {
  const userTheme = localStorage.getItem('theme');
  const userLang = localStorage.getItem('lang');

  userLang ? changeLanguage(userLang) : changeLanguage('en');
  userTheme && changeTheme(userTheme);
}

domElements.logo.addEventListener('click', () => {
  document.location.reload();
});