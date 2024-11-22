const jwt = require("jsonwebtoken");
const User = require("../models/users.models"); // Correct import path
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY)

const restrictToLogin = async (req, res, next) => {
    if (!SECRET_KEY) {
        console.error("SECRET_KEY is not defined");
        return res.status(500).json({ success: false, message: "Internal server error - Secret key missing" });
    }

    try {
        const token = req.cookies["netflix-token"];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid or expired token" });
        }

        const user = await User.findById(decoded.userId).select("-password"); // Adjust to match token payload
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Internal server error on restrictToLogin:", error);
        res.status(500).json({ success: false, message: "Internal server error on restrictToLogin" });
    }
};

module.exports = restrictToLogin;
