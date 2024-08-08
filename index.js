import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";


const students={
    "sai kumar":[["MHS","Nagireddypalli",2500,1000],[0,1000]],
    "naveen":[["MHS","Timapurm",3000,1500],[0,1500]],
    "hemanth":[["MHS","Timapurm",3000,500],[0,500]],
    "prathap":[["MHS","Roddam",2000,1500],[0,1500]],
    "lakshmi":[["MHS","Nagireddypalli",2500,2000],[0,2000]],
    "punith":[["MHS","Guvalapalli",3000,2000],[0,2000]],
    "pavan":[["MHS","Kurlapalli",2500,1000],[0,1000]],
    "thanzil":[["MHS","Roddam",2000,2000],[0,2000]],
    "om kumar":[["MHS","Roddam",2000,0],[0]],
    "eswar":[["MHS","Pedakodipalli",3000,2000],[0,2000]]
};





const admin={"Admin":"Sai"};


const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var data;
var a;
var pending;
var password;
var name;
var data1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/views'));
//app.set('view engine','ejs');

app.get("/", (req, res) => {
    res.render("/views/login.ejs");
    console.log(res.body["Id_feedback"]);
    console.log(res.body["password_feedback"]);
});



//console.log(res.body["Id_feedback"]);
//console.log(res.body["password_feedback"]);



app.post("/submit",(req,res,next)=>{
    name=req.body["Id_feedback"];
    password=req.body["password_feedback"]
    console.log(name);
    console.log(password);
    if(name in admin){
        if(admin[name]===password){
            res.render("admin.ejs",
                {
                    student:students
                }
            );
            next();
            //res.sendFile(__dirname + '/admin.ejs');
        }
        else{
            res.render("login.ejs");
            //res.sendFile(__dirname + '/login.ejs');
        }
    }
    else if(name in students){
        data=students[name];
        if(password===data[0][0]){
            pending=data[0][2]-data[0][3]
            res.render("student.ejs",
            {
                total:data[0][2],
                pending:pending,
                paid:data[0][3],
                series:data[1]  
            }
        );
        //res.sendFile(__dirname+'/student.ejs');
        }
        else{
            res.render("login.ejs");
            //res.sendFile(__dirname+'/admin.ejs');
        }
    }
    else{
        res.render("login.ejs");
        //res.sendFile(__dirname+'/admin.ejs');
    }
    
});



app.post("/go",(req,res,next)=>{
    var name1=req.body["name"];
    var amount=req.body["amount"];
    data1=students[name1];
    data1[1].push(amount);
    data1[0][3]+=1000;
    students[name]=data;
    res.render("admin.ejs",
        {
            student:students
        }
    );
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
