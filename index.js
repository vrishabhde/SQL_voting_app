import express from "express";
import cors from "cors";
import morgan from "morgan";
import connection from "./service/db.js";
import router from "./routes/user_routes.js";


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",router);

connection.connect((err) => {
if(err) throw err;
console.log("db connected")
})


app.listen(2001,() =>{ console.log("working on port 2001")})

