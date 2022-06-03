const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;


const filmSchema = new Schema({
    title: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    img: {
        type: String
    },
    category: {
        type: Array
    },
    producer: {
        type: String
    },
    actors: {
        type: Array
    },
    description: {
        type: String
    },
    film: {
        type: String
    },
    comment: {
        type: Number
    },
    categid: {
        type: String
    }
}, {timestaps: true})


const Film = mongoose.model("Filmsa", filmSchema)

module.exports = Film

