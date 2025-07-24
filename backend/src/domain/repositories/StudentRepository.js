import pool from '../../infrastructure/database/config/database.js';

export class StudentRepository{
    async saveToDb(student){ 
        const query=`insert into students(
        first_name,last_name,email_id,
        password,profileimageurl,phone,dob,address)
        values($1,$2,$3,$4,$5,$6,$7,$8) 
        returning *;`;

        const values=[student.first_name,
            student.last_name,student.email_id,
        student.password,student.profileimageurl,student.phone,student.dob,student.address];

        const result = await pool.query(query,values);
        return result.rows[0];
    }
}