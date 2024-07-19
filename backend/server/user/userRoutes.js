const express = require('express')
const authController = require('./controllers/authController')

const route = express.Router()

route.post('/login',authController.loginPost)
route.post('/logout',authController.logout)
route.post('/checkuser',authController.checkEmail)
route.post('/signup',authController.signup)

module.exports = route