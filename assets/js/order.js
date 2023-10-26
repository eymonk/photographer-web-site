//ORDER SHOOTING
import dom from './dom.js';
import {sendNotification} from './bot.js';

function openForm() {
    document.body.classList.add('no-scroll')
    dom.formOrderWrapper.classList.remove('hidden')
    dom.formOrderWrapper.style.transform = `translateY(${scrollY}px)`
}

function closeForm() {
    dom.formOrderWrapper.classList.add('hidden')
    document.body.classList.remove('no-scroll')
}

function showFormError(text) {
    dom.formError.textContent = text;
    setTimeout(() => dom.formError.textContent = '', 5000)
}

function sendForm(clientNumber) {
    const text = `Notification from project "Photographer's web-site". \nUser sent this as number: \n${clientNumber}`
    sendNotification(text)
    closeForm()
}

dom.formButtonSubmit.addEventListener('click', e => {
    e.preventDefault()
    const number = dom.clientNumber.value
    if (!number.length) showFormError('You forgot to enter your number.')
    else if (number.length < 10) showFormError('Incorrect number format.')
    else sendForm(number)
})

dom.formButtonClose.addEventListener('click', (e) => {
    e.preventDefault()
    closeForm()
})

export {
    openForm,
}