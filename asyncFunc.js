const {Client}=require('pg')
const express= require('express')

const app=express();
app.use(express.json())

// const client=new Client({
//     user:"postgres",
//     password:"linkinpark08",
//     host:"localhost",
//     port:5432,
//     database:"postgres"
// })
const client=new Client({
    user:"ocqsxkbnykzdlf",
    password:"a8f1673a79de2471e27987c546aba11786668e9a54f59f6710067764f6fa6705",
    host:"ec2-3-222-150-253.compute-1.amazonaws.com",
    port:5432,
    database:"d143qmgarqp4lg",
    uri:"postgres://ocqsxkbnykzdlf:a8f1673a79de2471e27987c546aba11786668e9a54f59f6710067764f6fa6705@ec2-3-222-150-253.compute-1.amazonaws.com:5432/d143qmgarqp4lg",
    cli:"heroku pg:psql postgresql-adjacent-07896 --app contacts-appl",
})

app.get("/",(req,res)=>res.sendFile(`${__dirname}/index.html`))
start();
async function start()
{
    await connect()
}
async function connect(){
    try{
        await client.connect();
    }
    catch (e){
        console.error(e);
    }
}
app.post("/emp", async (req,res)=>{
    let result={}
    try{
        const reqJson=req.body;
        await create(reqJson.name,reqJson.email,reqJson.dob,reqJson.phone);
        result.success=true;
    }
    catch(e)
    {
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))

    }
    
})
app.delete("/emp", async(req,res)=>{
    let result={}
    try{
        const reqJson=req.body;
        await deleteDo(reqJson.name);
        result.success=true;
    }
    catch(e)
    {
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))

    }
})

app.get("/emp", async (req,res)=>{
    const rows=await output();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.listen(8080, ()=> console.log("Listening.."))

async function output(){
    try{
        await connect()
        const results= await client.query("select * from mails")
        return results.rows;
    }
    catch (e){
        return e;
    }
}
async function create(name,email,dob,phone){
    try{
        await connect()
        const results= await client.query("insert into mails values ($1,$2,$3,$4)",[name,[email],dob,[phone]])
        return results.rows;
    }
    catch (e){
        return e;
    }
}
async function deleteDo(name){
    try{
        await connect()
        const results= await client.query("delete from mails where name=$1",[name])
        return results.rows;
    }
    catch (e){
        return e;
    }
}

// execute()

// async function execute(){
//     try{
//         await client.connect()
//         console.log("Connected")
//         await client.query("insert into mails values ($1,$2,$3,$4)",["Karan","notyahoog@gmail","01/12/1994","{8299000010}"])
//         // await client.query("delete from mails where name='T'")
//         const results= await client.query("select * from mails")
//         console.table(results.rows)
//     }
//     catch (e){
//         console.log("Error");
//         console.log(e);
//     }
//     finally{
//         await client.end()
//         console.log("Connection ended")
//     }
// }
