const mongo = require("mongoose")
const Schema = mongo.Schema;

const catAdd = new Schema({
    catId: Number,
    title: String
})

const Categ = mongo.model("Categ", catAdd)

module.exports = Categ