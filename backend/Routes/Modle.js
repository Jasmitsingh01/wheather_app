const Database=require('../Database/DataBaseConnection');

const UserTable='Create Table  IF NOT EXISTS Users (id varchar(255) primary key,Name varchar(255) not null  , email varchar(255) not null unique,Password varchar(255) not null );'
Database.query(UserTable,(err,result)=>{
    if(err){
        console.log('Table not Created')
    }
    else{
        console.log('Table Created')
    }
})

module.exports=Database;