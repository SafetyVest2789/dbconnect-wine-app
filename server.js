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

MongoClient.connect(dbConnectionStr)
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
})


app.delete('/deleteEntry', (request,response) =>{

})
//LOCALHOST ON PORT SETUP//
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})