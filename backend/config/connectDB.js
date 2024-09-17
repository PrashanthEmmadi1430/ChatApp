const mongoose = require('mongoose')

const connectDB = async()=>{
 
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("Connected to MongoDB Successfully...")
        })

        connection.on('error',()=>{
            console.log("Error in MongoDB...")
        })

    } catch (error) {
        console.log("Error in connecting with MongoDB...")
    }

}

module.exports = connectDB;