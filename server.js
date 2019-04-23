const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

// Remember to change YOUR_USERNAME and YOUR_PASSWORD to your username and password! 
MongoClient.connect('mongodb+srv://dbSio:sio@dbcloud-rvfh0.mongodb.net/mahasiswa?retryWrites=true', (err, database) => {
  if (err) return console.log(err)
  db = database.db('mahasiswa')
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('data').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {data: result})
  })
})

app.post('/data', (req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/data', (req, res) => {
  db.collection('data')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      jk: req.body.jk,
      umur: req.body.umur
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/data', (req, res) => {
  db.collection('data').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Data deleted')
  })
})
