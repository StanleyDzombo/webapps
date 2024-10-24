require ('dotenv').config()
const express=require("express")
const server=express()
const {PrismaClient} = require('@prisma/client')
const db = new PrismaClient()

//these are middlewares
const cors =require("cors")
const morgan =require("morgan")
const helmet =require("helmet")
const bodyparser =require("body-parser")


//how to use the middlewares
server.use(cors())
server.use(morgan("dev"))
server.use(helmet())
server.use(bodyparser.json())
server.use(bodyparser.urlencoded({extended:false}))


//running the application

// server.listen(5000, 'localHost', ()=>{
//     console.log('App Running')
// })

// //declaring routes. ( creating routes)
// server.get('/', (req, res) => {
// return res.send('hello world');
// })

// server.post('/user', (req, res) =>{
//     const {name, age, place, year} = req.body;
//     console.log(body);
//     return res.status(200).json(body);
//     // return res.send('hello world');
// }) 


//listening for a request
server.listen(3000, () => {
    console.log('the app is running');
})

//(GET) - this is a route/path that will display content on browser

server.get('/', (req, res) => {
    return res.status(200).json('hello world');
})

//POST - IT is a route that is not accessible in a browser but 
//can be used in a form to submit data to server, which the data can letter be used to be saved to the database

server.post('/', async(req, res) => {
    const {name, age} = req.body;
    const USER = await db.user.create({
        data:{
            name: name,
            age: age

        }
    })
    // console.log(body);
    return res.status(200).json('we are ready');
    
})