import express from "express";
import { candidates_html, get_all_users, get_candidates, loginUser, login_html, register_candidates, register_user, register_user_html, voting, voting_html } from "../controllers/user_controller.js";
import { CronJob } from "cron";
import connection from "../service/db.js";

const router = express.Router();


router.get("/register_user", register_user_html);
router.post("/register_user", register_user);

router.get("/login", login_html);
router.post('/login', loginUser);

// router.get("/home", home_html);
router.get("/voting", voting_html);
router.post("/voting", voting);

router.get("/register_candidates", candidates_html);
router.post("/register_candidates", register_candidates);

router.get("/get_candidates", get_candidates);
router.get("/get_all_users", get_all_users);


let job = new CronJob('* * * * * *', async(req,res) => {
    try {
        connection.query(`select * from users where useremail = 'admin@123'`, (err, data) => {
            if (err) return res.send({status:400, message:"unexpected error occured"});

            if (data.length) {
                console.log("already exist");
                
            } else {
                connection.query(`insert into users (username,useremail,password,isadmin,isvoted) values ('admin','admin@123','admin',true, false)`, (err, data) => {
                    if(err){
                        console.log("getting error");
                    };
                    
                    if(data) {
                        console.log("admin created");

                    }
                })
            }
        })
        job.stop();
    } catch (error) {
        return res.send(error)
    }
})
job.start();


export default router;  