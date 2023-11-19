const text = document.querySelector('.text')
const button = document.querySelector('.button')
const dialog = document.querySelector('.dialog')

const dataBase = localStorage.getItem('dataBase')
    ? JSON.parse(localStorage.getItem('dataBase'))
    : []

createDialog(dataBase)
button.addEventListener('click', createText)
document.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        createText()
    }
})

function createDialog(mass) {
    for (let i = 0; i < mass.length; i++) {
        const element = mass[i]
        const message = document.createElement('div')
        
        if (element.fromId == 1) {
            message.classList.add('myMessage')
        } else {
            message.classList.add('yourMessage')
        }
        
        message.innerHTML = `<div class="message"><p>${
            element.message
        }</p><span class="time">${timeFormat(
            element.timestamp
        )}</span></div>`
        dialog.append(myMessage)
    }
}

function createText() {
    if (text.value.trim() != '') {
        if (getRandomInt(0, 2) == 1) {
            const myMessage = document.createElement('div')
            myMessage.classList.add('myMessage')
            myMessage.innerHTML = `<div class="message"><p>${text.value.trim()}
        </p><span class="time">${timeFormat(new Date())}</span></div>`
            dialog.append(myMessage)
            dataBase.push({
                timestamp: new Date().getTime(),
                toId: 2,
                fromId: 1,
                message: text.value.trim(),
            })
        } else {
            const yourMessage = document.createElement('div')
            yourMessage.classList.add('yourMessage')
            yourMessage.innerHTML = `<div class="message"><p>${text.value.trim()}
    </p><span class="time">${timeFormat(new Date())}</span></div>`
            dialog.append(yourMessage)
            dataBase.push({
                timestamp: new Date().getTime(),
                toId: 1,
                fromId: 2,
                message: text.value.trim(),
            })
        }
        localStorage.setItem('dataBase', JSON.stringify(dataBase))
    }
    text.value = ''
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //Максимум не включается, минимум включается
}

function timeFormat(timestamp) {
    const date = new Date(timestamp)
    let time = ''
    
    if (date.getHours() < 10) {
        time += '0' + date.getHours() + ':'
    } else {
        time += date.getHours() + ':'
    }
    
    if (date.getMinutes() < 10) {
        time += '0' + date.getMinutes()
    } else {
        time += date.getMinutes()
    }
    return time
}
