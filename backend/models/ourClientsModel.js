const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    companyName : String,
    logoImage : [],
    description : String,
},{
    timestamps : true
})


const clientModel = mongoose.model("client",clientSchema)

module.exports = clientModel