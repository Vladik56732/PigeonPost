const text = document.querySelector('.text')
const button = document.querySelector('.button')
const dialog = document.querySelector('.dialog')

getChatInfo()
button.addEventListener('click', createText)
document.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        createText()
    }
})

function scrollDialog() {
    dialog.scrollTop = dialog.scrollHeight
}

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
            element.body
        }</p><span class="time">${timeFormat(element.date)}</span></div>`
        dialog.append(message)
    }
    scrollDialog()
}
async function getChatInfo() {
    const messages = await fetch('http://localhost:3000/messages').then(data =>
        data.json()
    )
    createDialog(messages)
}

async function createText() {
    if (text.value.trim() != '') {
        const myMessage = document.createElement('div')
        myMessage.classList.add('myMessage')
        myMessage.innerHTML = `<div class="message"><p>${text.value.trim()}
        </p><span class="time">${timeFormat(new Date())}</span></div>`
        dialog.append(myMessage)

        scrollDialog()
        await fetch('http://localhost:3000/create', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: `message=${encodeURIComponent(text.value.trim())}`,
        })
            .then(data => data.json())
            .then(message => {
                console.log(message)
            })
    }
    text.value = ''
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
