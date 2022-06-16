//DEPENDECNIES REQUIRED TO RUN APP//
const express = require ('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

//VARIABLES FOR DATABASE//
let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'wines'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client =>{
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//MIDDLEWARE SETUP FOR APP//
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//THIS IS HOW WE CRUD APP//
app.get('/', (request,response) =>{
    db.collection('basic').find().toArray()
        .then(data => {
            let wineList = data.map(item => item.wineName)
            console.log(wineList)
            response.render('index.ejs', {info: wineList})
        })
        .catch(error => console.log)
})


app.post('/api', (request,response) => {
    console.log('Post Heard')
    db.collection('basic').insertOne (
        request.body
    )
    .then(result => {
        console.log(result)
        response.redirect('/')
    })
})

app.put('/updateEntry', (request,response) => {
    console.log(request.body)
    Object.keys(request.body).forEach(key => {
        if (request.body[key] === null || request.body[key] === undefined || request.body[key]=== '') {
            delete request.body[key];
        }
    });
    console.log(request.body)
    db.collection('basic').findOneAndUpdate(
        {wineName: request.body.name},
        {
            $set: request.body
        },
    )
    .then(result => {
        console.log(result)
        response.json('Success')
    })
    .catch(error => console.error(error))
})
app.delete('/deleteEntry', (request,response) =>{
    db.collection('basic').deleteOne(
        {wineName: request.body.name}
    )
    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted')
    })
    .catch(error => console.error(error))
})
//LOCALHOST ON PORT SETUP//
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})