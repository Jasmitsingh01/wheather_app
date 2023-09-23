const express = require("express");
const app= express.Router();
const UserTable=require('./Modle')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const { Console } = require("console");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/Login.html"));
  });
  
  app.get("/singUp", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/singUp.html"));
  });
  
  app.get("/style", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/styles.css"));
  });
  app.get("/script", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/script.js"));
  });
  app.get("/mainapp", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/MainApp.Html"));
  });
  
  app.post("/singUp", (req, res) => {
  const {Name ,email ,password}=req.body;
  if(Name && email && password){
    const Query=`select * from Users where email="${email}";`
    UserTable.query(Query,async(err,result)=>{
      if(err){

      }
      else{
        if(result.length===0){
          const salt=await bcrypt.genSalt(10);
    const HasPass=await bcrypt.hash(password,salt);
    const id=uuidv4();
    const Token=jwt.sign({
      id:id,
      Name:Name,
      email:email,
      password:password
     },process.env.jwt_screcet)
    const Query=`INSERT INTO Users (id,Name,email,Password) values ("${id}","${Name}","${email}","${HasPass}");`
    UserTable.query(Query,(err,result)=>{
      if(err){
        res.send({
          operation:"failed",
          message:"internal Server Error"
        })
      }
      else{
        
        res.send({
          operation:"Success",
          Token:Token,
          message:"SuccessFully SingUp "
        })
 }
    })
        }
        else{
          res.send({
            operation:"failed",
            message:"User already Extsis"
          })
        }
      }
    })
  }
  });

  app.post("/login",(req, res) =>{
const {email,password}=req.body;

  const Query=`Select * From Users where email="${email}"`
  UserTable.query(Query,async(err,reslut)=>{
    if(err){
      res.send({
        operation:"Faild",
        message:"Please Try Again",
      
       })
    }
    else{
      if(reslut.length>0){
      const DB_PASSWORD=reslut[0].Password;
      const Very=await bcrypt.compare(password,DB_PASSWORD)
      if(Very){
const [OBj]=reslut;
const Token=jwt.sign(OBj,process.env.jwt_screcet)
res.send({
          operation:"Sucesss",
          message:"Sucessfuly Login",
          Token:Token
         })
      }
    }
      else{
             res.send({
              operation:"Failed",
              message:"No User Found"
             })
      }
    }
  })
}
  )
  module.exports=app;