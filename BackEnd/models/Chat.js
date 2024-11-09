import mongoose from 'mongoose'

export const Chat = mongoose.model('Chat', {
    name: String,
    person1: String,
    person2: String,
    messages: [{ body: String, date: Number, fromId: String, id: Number }],
})
