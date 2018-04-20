import ThemeParks from 'themeparks'
import parksGateway from '../Gateways/parksGateway'
import Json2csvParser from 'json2csv';

export default function ParksService()  {
  const park = new ThemeParks.Parks.WaltDisneyWorldMagicKingdom();

  const getDataFromPark = () => {
    let dict = []
    return park.GetWaitTimes().each(ride => {
      dict.push( { name: ride.name.replace(/\\/g, "").replace(/'/g, ""), id: ride.id, active: ride.active, status: ride.status, waitTime: ride.waitTime, lastUpdate: new Date(ride.lastUpdate).toLocaleString() } )
    }).then(() => dict)
      .tap(() => parksGateway().saveDataFromPark(dict))
      .tap(() => console.log(new Date()))
  }

  return {
    getData :() => {
      const parser = new Json2csvParser.Parser();
      return parksGateway().getTimes()
        .then(times => parser.parse(times));
    },
    getDataFromPark
  }
}
