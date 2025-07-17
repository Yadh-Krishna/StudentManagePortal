const app=require('./src/app.js');
const pool=require('./src/infrastructure/database/config/database.js');

const port=process.env.PORT;

async function dbConnection(){
    try{
        await pool.query('select now()');
        console.log("Database Connected");
    }catch(error){
        console.error("Database connection failed",error.message);
        process.exit(1);
    }
}

async function startServer(){
    try{
        await dbConnection();
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        })

    }catch(error){
        console.error("Server failed to start",error.message);
        process.exit(1);
    }
}

startServer();

