const express = require('express');
const { signUp, login, logout, authCheck } = require('../controllers/auth.controllers');
const restrictToLogin = require('../middleware/restrictToLogin');
const router = express.Router();


router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout" , logout)


router.get("/authCheck", restrictToLogin, authCheck)


module.exports = router