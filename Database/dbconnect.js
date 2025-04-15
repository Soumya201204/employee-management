const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/kle')
.then(function(){
    console.log('MongoDB is connected successfully👍')
})
.catch(function(error){
    console.log('Failed to connect MongoDB', error)
})
let user_schema = mongoose.Schema({
    name: String,
    email: String,
    phonenumber: Number,
    company: String,
    password: String

})

let USERS = mongoose.model('user', user_schema)
module.exports = {USERS}
