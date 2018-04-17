import getPool from './database'
import format from 'pg-format'
import Promise from 'bluebird'

export default function ParksGateway()  {
  const saveDataFromPark = rides => {
    return getPool().connect((err,client) => {
      const promises = [];
      rides.forEach(ride => {
        const query = format(`INSERT INTO times (name, waittime, status, active, lastupdate, gameid, tookedtime)
                              VALUES ('${ride.name}', ${ride.waitTime}, '${ride.status}', ${ride.active}, '${ride.lastUpdate}', '${ride.id}', '${new Date().toUTCString()}')`);
        promises.push(client.query(query));
      })
      return Promise.all(promises)
    });
  }

  const getTimes = () => {
    return getPool().connect()
      .then(client => {
        const query = format( `SELECT * FROM TIMES` );
        return client.query( query ).then(data => data.rows);
      })
  }

  return {
    saveDataFromPark,
    getTimes
  }
}

