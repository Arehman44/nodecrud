const router = require("express").Router();
const Student = require("../models/Student");

router.post("/add", async(req,res)=>{
    const addStudent = new Student(req.body);
    try{
        const saveStudent = await addStudent.save();
        res.status(201).json({
            "msg":"Student Added Successfully",
            "data":saveStudent
        })
    }catch(err){
                res.status(500).json(err);
    }
})

//get Student
router.get("/getall", async(req,res)=>{
    try{
        const getstudent = await Student.find();
        res.status(200).json(getstudent);
    }catch(err){
                res.status(404).json(err);
    }
})

//student find by id

router.get("/getstud/:id", async(req,res)=>{
    try{
        const _id = req.params.id
        const getstud = await Student.findById(_id);
        res.status(200).json(getstud);
    }catch(err){
                res.status(404).json(err);
    }
})

//we will handle patch req of indiv
router.put("/update/:id",async(req,res)=>{
        try{
            const _id = req.params.id;
            const updateStud = await Student.findByIdAndUpdate(_id,req.body,{new:true});
            res.status(200).json(updateStud);
        }catch(err){
            res.status(500).json(err);
        }
    });


    //we will handle Delete req of indiv
    router.delete("/delete/:id",async(req,res)=>{
        try{
		  const _id = req.params.id;
          const deleteStud = await Student.findByIdAndDelete(req.params.id);
          res.send(deleteStud);
        }catch(e){
            res.status(500).send(e);
        }
        });

module.exports = router;