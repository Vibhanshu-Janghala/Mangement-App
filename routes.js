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

// route for creating New UserAccount
router.post("/api/createAccount",createAcc);

// generate tokens for new Account
router.post("/api/login",loginHandler);

//route for verifying auth
router.all("/api/accessVerify",accessCheck)


// APP FUNCTIONALITY ROUTES

// route for announcement
router.use("/announcement",announcementHandler)

// route for todoList
router.use("./todoList",todoHandler)

module.exports = router;