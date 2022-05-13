const express = require("express");
const cors = require("cors");
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const studentRoute = require("./routes/student");

const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());

//all api route

app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);
app.use("/api/student",studentRoute);


//handle the error
app.use("/",(req,res)=>{
    res.status(404).json({
        msg:"Bad Request"
    })
})
//connect with MongoDb

mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connection Successfull");
}).catch((err)=>{
    console.log(err);
})

const PORT = process.env.PORT || 9000;
app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`);
})