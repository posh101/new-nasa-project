const app = require('./app')
const http = require('http');
const {mongoConnect} = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 5000;



const server = http.createServer(app)



async function startServer() {
    await mongoConnect()
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}...`)
    
    })
}


startServer();

