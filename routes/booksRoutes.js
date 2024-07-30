import express from "express"
import { Book } from "../models/bookStore.js";

const router = express.Router();

// add new book to db
// this route is /books/addbook. same as, other routes start with /books/....
router.post("/addbook", async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({
                message: "Please give full details of the book"
            })
        }
        else {
            const createBook = {
                title: req.body.title,
                author: req.body.author,
                publishedYear: req.body.publishedYear
            };
            const book = await Book.create(createBook);
            return res.status(201).send({
                message: "book added",
                book: book
            });
        }
    }catch(error) {
        console.log("error message: ", error.message);
    }
})

// get all books from db
router.get("/getbooks", async (req, res) => {
    try {
        const allBooks = await Book.find({});
        return res.status(201).send({
            count: allBooks.length,
            books: allBooks
        });
    }catch(error) {
        console.log("error: ", error.message);
        res.status(500).send({
            message: "Cannot get books from DB"
        })
    }
})

// get details of a book
router.get("/findabook/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const findBook = await Book.findById(id);
        if(!findBook) {
            return res.status(500).send({
                message: "Book not found!"
            })
        }
        else {
            console.log("book found");
            res.status(201).send(findBook);
        }
    }catch(error) {
        console.log("error: ", error.message);
        return res.status(500).send({
            message: "Error while fetching bookdetails."
        })
    }
})

// update the book info, required req.params as well as req.body
router.put("/updatebook/:id", async (req, res) => {
    const {id} = req.params;
    const updatedBook = req.body;
    const book = await Book.findByIdAndUpdate(id, updatedBook);

    return res.status(201).send({
        message: "book details updated",
        book: book
    })
})

// delete the book from db
router.delete("/deletebook/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const deleteBook = await Book.findByIdAndDelete(id);
        console.log(deleteBook);
        if(!deleteBook) return res.status(500).send({message: "Book id not found."})
        
        return res.status(201).json({
            message: "Book deleted successfully!"
        });
    }catch(error)
    {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

export default router;