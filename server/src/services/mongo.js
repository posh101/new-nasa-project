const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://poshtech01:Blutches101@cluster0.omshhsk.mongodb.net/NasaCluster'

mongoose.connection.once('open', () => {
    console.log('MongoDb connection ready...')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('connected to MongoDb')
    } catch(error) {
        console.error(error)
    }
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
}
