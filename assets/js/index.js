import {changeLanguage} from './languages.js';
import {changeTheme} from './themes.js'
import {openForm} from './order.js';
import dom from './dom.js';
import state from './state.js';
import {sendNotification} from './bot.js';


//change language
dom.languageOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const lang = option.textContent
    changeLanguage(lang)
  })
})


//change theme
dom.themeBtn.addEventListener('click', (event) => {
  const theme = event.currentTarget.dataset.theme === 'dark' ? 'light' : 'dark'
  changeTheme(theme)
})


//burger menu
dom.burgerMenu.addEventListener('click', () => {
  if (window.innerWidth < 816) {
    dom.navigation.classList.toggle('open')
    dom.burgerSticks.forEach(stick => stick.classList.toggle('open'))
  }
})

dom.navigation.addEventListener('click', (e) => {
  if(e.target.classList.contains('nav__item') && window.innerWidth < 816) {
    dom.navigation.classList.toggle('open')
    dom.burgerSticks.forEach(stick => stick.classList.toggle('open'))
  }
})


//open form
dom.orderShootingButtons.forEach(btn => btn.addEventListener('click', () => openForm()))


//send "contacts" form
dom.contactsButton.addEventListener('click', (event) => {
  console.log(event)
  const text = `Notification from project "Photographer's web-site". \nUser sent: \nEMAIL:${dom.contactsInputEmail.value} | \nPHONE:${dom.contactsInputTel.value} | \nMESSAGE:${dom.contactsInputMessage.value}`
  sendNotification(text)
})


//change image-set in "portfolio section"
dom.seasonButtonsContainer.addEventListener('click', function (event) {
  const targetBtn = event.target
  if (targetBtn.classList.contains('btn')) {
    const season = targetBtn.classList[3].split('_')[3]
    //change active btn
    Array.from(this.children).forEach(btn => btn.classList.remove('portfolio__btn_active'))
    targetBtn.classList.contains('btn') && targetBtn.classList.add('portfolio__btn_active')
    //change images source
    dom.portfolioImages.forEach((img, ind) => img.setAttribute('src', `assets/img/${season}/${ind + 1}.jpg`))
  } 
})


//page (re)load
window.onload = function() {
  const userTheme = localStorage.getItem('theme')
  const userLang = localStorage.getItem('lang')

  userLang ? changeLanguage(userLang) : changeLanguage('en')
  userTheme && changeTheme(userTheme)
}

dom.logo.addEventListener('click', () => {
  document.location.reload()
})

window.onunload = function() {
  localStorage.setItem('theme', state.theme)
  localStorage.setItem('lang', state.lang)
}

