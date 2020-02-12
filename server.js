const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const knex= require('knex')

const register=require('./controllers/register')
const image=require('./controllers/image')
const signin=require('./controllers/signin')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '4455',
    database : 'faceapp'
    }
  });
 
const app=express();
app.use(bodyparser.json());
app.use(cors());

 

app.get('/',(req,res)=>{
    res.send('working')
})

app.post('/signin',(req,res)=>{signin.handleSigin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.get('/profile/:id',(req,res)=>{
    const {id} =req.params;
    let found=false;
    database.users.forEach(user=>{
        if(user.id===id){
        found=true;
       return res.json(user) 
    }
    })
    if(!found){
     res.json('not found')}
})




app.listen( process.env.PORT ||3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
    
})