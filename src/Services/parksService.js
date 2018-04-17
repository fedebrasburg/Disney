import ThemeParks from 'themeparks'
import parksGateway from '../Gateways/parksGateway'

export default function ParksService()  {
  const park = new ThemeParks.Parks.WaltDisneyWorldMagicKingdom();

  const getDataFromPark = () => {
    let dict = []
    return park.GetWaitTimes().each(ride => {
      dict.push( { name: ride.name.replace(/\\/g, "").replace(/'/g, ""), id: ride.id, active: ride.active, status: ride.status, waitTime: ride.waitTime, lastUpdate: new Date(ride.lastUpdate).toUTCString() } )
    }).then(() => dict)
      .tap(() => parksGateway().saveDataFromPark(dict))
      .tap(() => console.log(new Date()))
  }

  return {
    getData :() => {
      return parksGateway().getTimes();
    },
    getDataFromPark
  }
}
