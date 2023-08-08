import bcrypt from "bcrypt";
import connection from "../service/db.js";
import path from "path";

const __dirname = path.resolve();



export const register_user_html = async(req,res) => {
    try {
        return res.sendFile(__dirname + '/public/html/register.html');
    } catch (error) {
        return res.send(error);
    }
}



export const register_user = async (req, res) => {
    try {

        const { username, useremail, password } = req.body;
        if (!username) return res.status(400).json({status:400,message:"username is required"});
        if (!useremail) return res.status(400).json({status:400,message:"useremail is required"});
        if (!password) return res.status(400).json({status:400,message:"password is required"});

        connection.query(`select * from users where useremail = '${useremail}'`, async (err, existing_user) => {
            if (err) return res.status(404).json({ message: "not found", err });

            if (existing_user.length > 0) return res.status(400).json("user already registered");

            const bcrypt_password = await bcrypt.hash(password, 10);

            connection.query(`insert into users (username,useremail,password) values ("${username}","${useremail}","${bcrypt_password}")`, (err,data)=>{
                if(err) return res.status(400).json({ status: 400, message: err });
                return res.status(201).json({status:200, message: "User registered successfully."});
            });
        })
    } catch (error) {
        return res.send(error);
    }
}