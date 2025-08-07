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

    async findByEmail(email){
        const query=`select * from students where email_id = $1`;
        const values=[email];

        const result=await pool.query(query,values);
        // console.log("Find BY Email",result);
        return result.rows[0];
    }

    async updateProfileImage(studentId, imageUrl) {
    const query = `UPDATE students SET profileimageurl = $1 WHERE id = $2 RETURNING *`;
    const values = [imageUrl, studentId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
   
}