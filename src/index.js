import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import ParkService from './Services/parksService'

const PORT = process.env.PORT || 5000
const app = express();

app.set('port', PORT)

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json())
app.use(cors())

app.get('/times', (req, res) => {
  return ParkService().getData()
    .then(data => res.send(data));
})

app.listen(app.get('port'), () => {
  console.log(`Node app is running on port ${PORT}`)
})

// function callNTimes(time, fn) {
//   function callFn() {
//     fn();
//     setTimeout(callFn, time);
//   }
//   setTimeout(callFn, time);
// }

// callNTimes(5000, function() { return ParkService().getDataFromPark() });
