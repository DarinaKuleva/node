import express from 'express';
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import bluebird from 'bluebird'
import mongo from 'mongoose'

import config from './config'
import authRoute from './routes/auth'
import userRoute from './routes/user'
import pageRoute from './routes/page'
import errorHandler from './middlewares/errorHandler'
import checkToken from './middlewares/checkToken'
import getUser from './middlewares/getUser'

const app = express()

mongoose.Promise = bluebird
mongo.connect('mongodb://localhost:27017',function(err){
  if (err) {
    throw err
  }
  console.log('mongo')
})


app.listen(config.port, err => {
  if (err) throw err
  console.log('Server listening on port ${config.port}')
})

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}))

app.get('*', async (req, res) => {
  res.end('Hello world')
})
app.use('/api', authRoute)
app.use('/api', checkToken, userRoute)
app.use(getUser)
app.use('/api', checkToken, pageRoute)

app.use(errorHandler)
