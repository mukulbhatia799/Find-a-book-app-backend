
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: String,
        required: true
    }
})

export const Book = mongoose.model('Book', schema);