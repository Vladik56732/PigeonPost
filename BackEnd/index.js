import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Chat } from './models/Chat.js'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/messages', async (req, res) => {
    const chat = await Chat.findById('6561f01569b8c4a2499843d9')
    console.log(chat)
    return res.send(JSON.stringify(chat.messages))
})

app.post('/create', async (req, res) => {
    const chat = await Chat.findById('6561f01569b8c4a2499843d9')
    console.log(chat)

    chat.messages.push({
        date: new Date().getTime(),
        fromId: '1',
        // fromId: '64c628aadc43a0888e81227f',
        body: req.body.message,
    })
    // раскомментировав данную строчку мы удалим все сообщения в чате
    // chat.messages = []

    await chat.save()
    res.send(JSON.stringify(chat))
})

app.listen(3000, async () => {
    await mongoose.connect(
        'mongodb+srv://vladbelevcov7:ChQW8Pfaj2shvp2s@cluster0.le4ts9f.mongodb.net/'
    )
    console.log('Backend working')
})

// const chat = new Chat({
//     name: 'Beseda',
//     person1: '64c628aadc43a0888e81227f',
//     person2: '64c62915c00499c5f28f069b',
// })
// chat.save().then(() => console.log('Novii chatik'))
