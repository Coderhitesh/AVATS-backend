const mongoose = require('mongoose')

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGOLINK)
        console.log('Database is connected successfully')
    } catch (error) {
        console.log(error)
    }
}

// module.exports={
//     ConnectDB
// }

module.exports = ConnectDB