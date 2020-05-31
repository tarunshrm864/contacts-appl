const {Client}=require('pg')
const express= require('express')
const cors=require('cors');
app.use(cors());
const app=express();
app.use(express.json())

const client=new Client({
    user:"postgres",
    password:"linkinpark08",
    port:5432,
    database:"postgres"
})
// const client=new Client({
//     connectionString: process.env.
// })

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

app.listen(process.env.PORT, ()=> console.log("Listening.."))

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
