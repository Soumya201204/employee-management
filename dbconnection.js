
require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)

.then(function(){

    console.log('MongoDB is connected successfully')

})

.catch(function(error){

    console.log('failed to connect mongodb database: ', error)

})

let foodie_schema = mongoose.Schema({

    fullname: String,
    email: String,
    password: String

})

let FOODIE = mongoose.model('foodie', foodie_schema);

let food_items_schema = mongoose.Schema({

    catrgory: String,
    image: String,
    name: String,
    description: String,
    price: String

});

let FOODITEMS = mongoose.model('foodItems', food_items_schema)

module.exports = {FOODIE, FOODITEMS};