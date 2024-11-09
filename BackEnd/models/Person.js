import mongoose from 'mongoose'

export const Person = mongoose.model('Person', {
    nickname: String,
    chatId: String,
})
