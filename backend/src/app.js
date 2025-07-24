import express from 'express'
import rateLimit from'express-rate-limit';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './application/routes/user/userRoutes.js'
import adminRoutes from './application/routes/admin/adminRoutes.js'

const app=express();

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static('uploads'));

app.get('/', (req, res) => {
    res.json({ message: 'Student Management Portal API' });
});

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);



export default app;
