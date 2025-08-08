import pool from '../../infrastructure/database/config/database.js';

export class AdminRepository{   
    async findByEmail(email){
        const query=`select * from admin where email = $1`;
        const values=[email];

        const result=await pool.query(query,values);
        // console.log("Find BY Email",result);
        return result.rows[0];
    }

     async getDashboardStats(search = '') {
    
    let totalStudentsQuery = `SELECT COUNT(*) FROM students`;
    let studentListQuery = `SELECT * FROM students`;
    
    
    const searchParams = [];
    if (search) {
        const searchConditions = [
            `first_name ILIKE $1`,
            `last_name ILIKE $1`,
            `email_id ILIKE $1`,
            `phone ILIKE $1`
        ].join(' OR ');
        
        totalStudentsQuery += ` WHERE ${searchConditions}`;
        studentListQuery += ` WHERE ${searchConditions}`;
        searchParams.push(`%${search}%`);
    }

    const [countResult, studentListResult] = await Promise.all([
        pool.query(totalStudentsQuery, searchParams),
        pool.query(studentListQuery, searchParams)
    ]);

    const count = parseInt(countResult.rows[0].count, 10);
    const students = studentListResult.rows;

    return {
        totalStudents: count,
        students
    };
}

async createUser(data) {
    const {
      first_name,
      last_name,
      email_id,
      phone,
      password,
      dob,
      address
    //   gender,
    //   image_url = "https://yourcdn.com/default-pic.jpg"
    } = data;

    const insertQuery = `
      INSERT INTO students (first_name, last_name, email_id, phone, password,dob,address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      first_name,
      last_name,
      email_id,
      phone,
      password,
      dob,
      address      
    ];

    const result = await pool.query(insertQuery, values);
    return result.rows[0];
  }
}