const mongoose=require("mongoose");



const dbConnection=async(URI)=>{
    mongoose.connect(URI)
    .then((result)=>console.log("Database connected"))
    .catch((err)=>console.log(err));
}

module.exports=dbConnection