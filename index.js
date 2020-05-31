const {Client} = require('pg')

const client=new Client({
    user:"postgres",
    password:"linkinpark08",
    host:"localhost",
    port:5432,
    database:"postgres"
})
const x=101;

client.connect()
.then(()=> console.log("Connected"))
.then(()=>client.query("insert into employees values ($1,$2,$3,$4,$5)",[x,"Lala","21","mohala","12220"]))
.then(()=> client.query("select * from employees"))
.then((results=>console.table(results.rows)))
.catch(e =>console.log(e))
.finally(()=>client.end())