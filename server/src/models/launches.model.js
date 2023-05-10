const launchesDataBase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    
    flightNumber: 100,
    mission: 'Kepler exploration x',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-62 f',
    customers: ['NASA', 'ZTM'],
    upcoming: true,
    success: true,
};

saveLaunch(launch)

async function existLaunchWithId(launchId) {
    return await launchesDataBase.findOne({
        flightNumber: launchId,
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDataBase
    .findOne()
    .sort('-flightNumber')

    if(!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesDataBase
    .find({}, {'_id': 0, '__v': 0})
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    })

   if(!planet) {
   throw new Error('No matching planet was found')
  }

  await launchesDataBase.findOneAndUpdate({
    flightNumber: launch.flightNumber,
}, launch, { 
    upsert: true
});
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero To Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch)
}

async function abortLaunchById(launchId) {
const aborted = await launchesDataBase.updateOne({
    flightNumber: launchId,
 }, {
    success: false,
    upcoming: false,
 })

 return aborted.modifiedCount === 1;
}

module.exports = {
existLaunchWithId,
getAllLaunches,
scheduleNewLaunch,
abortLaunchById,
}