const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.static('public'))

app.listen(3000,() =>{
    console.log("Todo sobre ruedas")
})
app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/views/carrito.html")
})