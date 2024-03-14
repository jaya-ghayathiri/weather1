const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const bodyParser = require("body-parser")
const {EmployeeModel} = require('../server/models/Employee')

const app=express()
// app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
// mongoose.connect('mongodb+srv://jayaghayathiri:jayagayu@cluster0.jhjnpn6.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0');
// const port=8000 || process.env.PORT  
//     app.listen(port,function(){
//     console.log(`listening on port ${port}`)
//     })
// app.post('/register',(req,res)=>{
//     EmployeeModel.create(req.body)
//     .then(employees=>res.json(employees))
//     .catch(err=>res.json(err))
// })

async function connecttoDB(){
    console.log("hello")
    try{
        await mongoose.connect('mongodb+srv://jayaghayathiri:jayagayu@cluster0.jhjnpn6.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0');
        console.log("DB connection Established")
        const port=8000 || process.env.PORT
        app.listen(port,function(){
                console.log(`listening on port ${port}`)
        })
    }
    catch(error){
        console.log(error)
        console.log("Couldn/'t connect")
    }
}
connecttoDB()

app.post('/add-details',async function(request,response){
    
    try{//this block is used to add the data from postamn to atlas
        await EmployeeModel.create({//create-->insert/add to mongo atlas
            "name":request.body.name,
            "email":request.body.email,
            "password":request.body.password
        })
        response.status(201).json({
            "status":"success",
            "message":"new entry created"
        })
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"entry not created",
            "error":error
        })
    }
})
// const PORT = process.env.PORT || 3001;
// app.listen(8000,()=>{
//     console.log("server is running ")
// })