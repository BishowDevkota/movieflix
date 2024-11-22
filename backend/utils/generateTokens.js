const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
    const SECRET_KEY = process.env.SECRET_KEY || "defaultSecretKey"; // Fallback if SECRET_KEY is not defined
    const isProduction = process.env.NODE_ENV === "production";

    // Generate JWT token with 1-day expiration
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1d" });

    // Set token as an HTTP-only cookie
    res.cookie("netflix-token", token, {
        httpOnly: true,          // Only accessible by the server
        sameSite: isProduction ? "none" : "lax",  // None if using cross-site cookies with HTTPS
        secure: false,    // Cookie is sent only over HTTPS in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    return token;
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzJhYzZjYTQ0NTNmZGIxMGQzYmM0MTUiLCJpYXQiOjE3MzA4NTY2NTAsImV4cCI6MTczMDk0MzA1MH0.vc-6Isk8MFAQK_ytlRCf0vuKc3XQ0u3XNBQdIApnplc

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzJhY2M3ZDkxZjg4ZTZmYTJkMjM3ZTciLCJpYXQiOjE3MzA4NTgxMDksImV4cCI6MTczMDk0NDUwOX0.tyael8YS3wo7lzCsU9K802J91Vy5c1H75cghcdpzxGM


module.exports=generateTokenAndSetCookie