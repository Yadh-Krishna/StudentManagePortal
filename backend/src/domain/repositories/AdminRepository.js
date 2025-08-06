import pool from '../../infrastructure/database/config/database.js';

export class AdminRepository{   
    async findByEmail(email){
        const query=`select * from admin where email = $1`;
        const values=[email];

        const result=await pool.query(query,values);
        // console.log("Find BY Email",result);
        return result.rows[0];
    }
}