import dotenv from 'dotenv';
dotenv.config();
export default class Server{
        constructor(app,pool){
        this.pool=pool;
        this.app=app;
        this.port=process.env.PORT;
    }

    async dbConnection(){
    try{
        await this.pool.query('select now()');
        console.log("Database Connected");
    }catch(error){
        console.error("Database connection failed",error.message);
        process.exit(1);
    }
}

async startServer(){
    try{
        await this.dbConnection();
        this.app.listen(this.port,()=>{
            console.log(`Server is running on port ${this.port}`);
        })

    }catch(error){
        console.error("Server failed to start",error.message);
        process.exit(1);
    }
}
}