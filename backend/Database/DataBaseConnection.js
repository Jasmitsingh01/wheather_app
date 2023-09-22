const mysql =require('mysql2');

const Connect=mysql.createConnection({
    host:process.env.MysqlHost,
    user:process.env.Mysqluser,
    port:process.env.MysqlPort,
    database:process.env.Mysqldatabase,
    password:process.env.Mysqlpassword,
})

Connect.connect(function (error){
    if(error){
        console.log(error)
    }
    else{
        console.log('Db Connect')
    }

})

module.exports=Connect;