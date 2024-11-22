const express = require("express");
const dbConnection = require("./config/dbConnection");
const app=express();
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movies.route");
const tvRoutes= require("./routes/tv.routes");
const searchRoutes= require("./routes/search.routes");
const restrictToLogin = require("./middleware/restrictToLogin");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 
require('dotenv').config();  


console.log(process.env.SECRET_KEY);
app.use(express.json());  
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:5000", // Replace with your frontend URL
    credentials: true // Allow cookies and authorization headers
}));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",  movieRoutes);
app.use("/api/v1/tv", tvRoutes );  
app.use("/api/v1/search", restrictToLogin , searchRoutes);
dbConnection("mongodb://localhost:27017/netflixClone");
 
app.listen(8080, () => { 
    console.log("Server is running on port 8080 ");
})









