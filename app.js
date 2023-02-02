require('dotenv').config()
const express=require('express');
const jwt=require('jsonwebtoken');
const fs=require('fs')
const cron=require('node-cron')
//authorization middleware
const Auth =require('./Auth')


//init server
const app=express();

//middle ware
app.use(express.json());



//Endpoints
app.get('/token',(req,res)=>{
    const payload={
        username:"shadab",
        password:"pass",
        scopes:["customer:read"]

    }
    const AccessToken=jwt.sign(payload,process.env.Access_Secret_Token)
    console.log(AccessToken)
    res.send(AccessToken)
})

app.get('/customers',Auth("customer:read"),(req,res)=>{
        res.send("Customers Information");
})

//cron mthod
cron.schedule("* * * * *",function()
{
    let data=`${new Date()}
          : server is working\n`;
    fs.appendFile("logs.txt",data,function(err)
        {
            if(err) throw err;
            console.log("Status Logged!");
        });
});
app.listen(5000,(req,res)=>{
    console.log("Listening on post 3000");
})