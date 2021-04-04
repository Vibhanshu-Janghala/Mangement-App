const express = require('express');
const router = express.Router();
const createAcc = require("./config/newUser");
const accessCheck = require("./config/authVerify");
const loginHandler = require("./config/authGen");
const announcementHandler = require("./config/announcement_controller");
const todoHandler = require("./config/todolist_controller");

// LOGIN RELATED ROUTES
router.get('/', function(req, res) {
    res.send('home page');
});
//route for verifying auth
router.post("/api/accessVerify",accessCheck)

// route for creating New Account
router.post("/api/createAccount",createAcc);

// route for Login
router.post("/api/login",loginHandler);

// APP FUNCTIONALITY ROUTES

// route for announcement
router.use("/announcement",announcementHandler)

// route for todoList
router.use("./todoList",todoHandler)
module.exports = router;