import bcrypt from "bcrypt";
import connection from "../service/db.js";
import path from "path";


const __dirname = path.resolve();



export const register_user_html = async (req, res) => {
    try {
        return res.sendFile(__dirname + '/public/html/register.html');
    } catch (error) {
        return res.send(error);
    }
}



export const register_user = async (req, res) => {
    try {

        const { username, useremail, password } = req.body;
        if (!username) return res.status(400).json({ status: 400, message: "username is required" });
        if (!useremail) return res.status(400).json({ status: 400, message: "useremail is required" });
        if (!password) return res.status(400).json({ status: 400, message: "password is required" });

        connection.query(`select * from users where useremail = '${useremail}'`, async (err, existing_user) => {
            if (err) return res.status(404).json({ message: "not found", err });

            if (existing_user.length > 0) return res.status(400).json("user already registered");

            const bcrypt_password = await bcrypt.hash(password, 10);

            connection.query(`insert into users (username,useremail,password) values ("${username}","${useremail}","${bcrypt_password}")`, (err, data) => {
                if (err) return res.status(400).json({ status: 400, message: err });
                return res.status(201).json({ status: 200, message: "User registered successfully." });
            });
        })
    } catch (error) {
        return res.send(error);
    }
}


export const login_html = async (req, res) => {
    try {
        return res.sendFile(__dirname + '/public/html/login.html');
    } catch (error) {
        return res.send(error);
    }
}


export const loginUser = async (req, res) => {
    try {
        const { useremail, password } = req.body;
        // console.log(useremail,password);
        req.session.email=useremail;
        // console.log(req.session.useremail);
        if (!useremail) return res.status(400).json({ status: 400, message: "Email is required." });
        if (!password) return res.status(400).json({ status: 400, message: "Password is required." });
        connection.query(`select * from users where useremail = '${useremail}'`, async (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: "User not found" });
            if (data.length) {
                const decPass = await bcrypt.compare(password, data[0].password);
                if (decPass) {
                    return res.status(200).json({ status: 200, message: "Logged In Succesfull." });
                } else {
                    return res.status(400).json({ status: 400, message: "Incorrect credentials" });
                }
            }
        })

    } catch (error) {
        return res.status(400).json({ status: 400, message: "technical error" });
    }
}



export const candidates_html = async (req, res) => {
        try {
            return res.sendFile(__dirname + '/public/html/candidates.html');
        } catch (error) {
            return res.send(error);
        }
    }



export const register_candidates = async (req, res) => {
    try {
        const { candidate_name } = req.body;
        console.log(candidate_name);
        if (!candidate_name) return res.status(400).json({ status: 400, message: "candidate_name is required" });

        connection.query(`insert into candidates (candidate_name) values ('${candidate_name}')`,  (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: `${candidate_name} already exist` });
            if(data) res.status(201).json({ status: 201, message: "candidate registration success" });

        })
    } catch (error) {
        return res.status(400).json({ status: 400, message: "invalid" });
    }
}


export const get_all_users = async (req, res) => {
    try {
        connection.query(`select * from users`, (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: "no data available" });
            if (data) {
                return res.status(201).json({ status: 201, data });
            }
        })
    } catch (error) {
        return res.status(400).json({ status: 400, message: "catching error" });
    }
}




export const get_candidates = async (req, res) => {
    try {
        connection.query(`select * from candidates`, async (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: "unexpected error occured" });
            if (data) return res.status(200).json(data);
        });
    } catch (error) {
        returnres.send(error);
    }
}


export const voting_html = async(req,res) => {
    try {
        const useremail = req.session.email;
        console.log(useremail);
        if(!useremail) {
            return res.send('login first');
        }
        return res.sendFile(__dirname + '/public/html/home.html', {useremail});
    } catch (error) {
        return res.send(error);
    }
}


export const voting = async (req, res) => {
    try {
        const {candidate_name}=req.body;
        const useremail = req.session.email;
        console.log(useremail, candidate_name);
        connection.query(`select isvoted from users where useremail='${useremail}'`,(err,data)=>{
            if(err) return res.status(400).json({status:400,message:"could not fetch data"});
            console.log(data);
            if(data[0].isvoted) {
                return res.status(200).json({status:200,message:"You are already voted."})
            }else{
                connection.query(`select candidateId from candidates where candidate_name="${candidate_name}"`,(err,data)=>{
                    if(err) return res.status(400).json({status: 400, message: "error"});
                    if(data.length>0){
                        connection.query(`update users set isvoted=true ,candidateId=${data[0].candidateId} where useremail='${useremail}'`,(err,data)=>{
                            if(err) return res.json(err);
                            if(data){
                                return res.status(200).json({status:200,message:"you have voted successfully."})
                            }else{
                                return res.status(400).json({status:400,message:"Error while voting."})
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        return res.send(error);
    }
}